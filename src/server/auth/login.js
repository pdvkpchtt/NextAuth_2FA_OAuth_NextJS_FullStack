"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schema";
import { getUserByEmail } from "../user/getUser";
import { generateVerificationToken } from "../tokens/generateVerificationToken";
import { sendVerificationMail } from "../mails/sendVerificationMail";
import { generateTwoFactorToken } from "../tokens/generateTwoFactorToken";
import { sendTwoFactorMail } from "../mails/sendTwoFactorMail";
import {
  deleteTwoFactorToken,
  getTwoFactorTokenByEmail,
} from "../tokens/twoFactorToken";
import { getTwoFactorConfirmationByUserId } from "../twofactor/getTwoFactorConfirmationByUserId";
import { deleteTwoFactorConfirmation } from "../twofactor/deleteTwoFactorConfirmation";
import { createTwoFactorConfirmation } from "../twofactor/createTwoFactorConfirmation";

export const login = async (values, code = null) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Что-то пошло не так" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email.toLowerCase());
  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: "Пользователя с такой почтой не существует" };
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationMail(
      verificationToken.email.toLowerCase(),
      verificationToken.token
    );

    return {
      success: `Письмо отправлено на почту ${email.toLowerCase()}`,
    };
  }

  if (existingUser.isTwoFactorConfirmation && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken || twoFactorToken.token !== code)
        return { error: "Неверный код" };

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) return { error: "Время работы кода завершено" };

      await deleteTwoFactorToken(twoFactorToken.id);

      const exsistingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (exsistingConfirmation)
        await deleteTwoFactorConfirmation(exsistingConfirmation.id);

      await createTwoFactorConfirmation(existingUser.id);
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorMail(twoFactorToken.email, twoFactorToken.token);

      return {
        twoFactor: true,
        success: `Письмо отправлено на почту ${email.toLowerCase()}`,
      };
    }
  }

  try {
    await signIn("credentials", {
      email: email.toLowerCase(),
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return { error: "Неверная почта или пароль" };
        default:
          return { error: "Что-то пошло не так" };
      }
    }

    throw error;
  }
};
