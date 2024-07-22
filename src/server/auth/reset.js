"use server";

import { prisma } from "../db";
import { getUserByEmail } from "../user/getUser";
import { ResetPasswordSchema } from "@/schema";

export const reset = async (values) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Неверный формат почты" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email.toLowerCase());
  if (!existingUser)
    return { error: "Пользователя с такой почтой не существует" };

  return { success: `Письмо отправлено на почту ${email.toLowerCase()}` };
};
