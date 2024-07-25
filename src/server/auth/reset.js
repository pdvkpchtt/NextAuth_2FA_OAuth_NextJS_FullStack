"use server";

import { getUserByEmail } from "../user/getUser";
import { ResetPasswordSchema } from "@/schema";
import { generatePasswordResetToken } from "../tokens/generatePasswordResetToken";
import { sendResetMail } from "../mails/sendResetMail";

export const reset = async (values) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Неверный формат почты" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email.toLowerCase());
  if (!existingUser)
    return { error: "Пользователя с такой почтой не существует" };

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendResetMail(
    passwordResetToken.email.toLowerCase(),
    passwordResetToken.token
  );

  return { success: `Письмо отправлено на почту ${email.toLowerCase()}` };
};
