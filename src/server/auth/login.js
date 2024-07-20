"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schema";
import { getUserByEmail } from "../user/getUser";
import { generateVerificationToken } from "./generateVerificationToken";
import { sendVerificationMail } from "./sendVerificationMail";

export const login = async (values) => {
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
      success: "Письмо отправлено почту",
    };
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
          return { error: "Проверьте данные для входа" };
        default:
          return { error: "Что-то пошло не так" };
      }
    }

    throw error;
  }
};
