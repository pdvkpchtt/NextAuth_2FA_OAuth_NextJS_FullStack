"use server";

import bcrypt from "bcryptjs";

import { prisma } from "../db";
import { PasswordSchema } from "@/schema";
import { getUserByEmail } from "../user/getUser";
import {
  deletePasswordResetToken,
  getPasswordResetTokenByToken,
} from "../tokens/passwordResetToken";

export const newPassword = async (values, token) => {
  if (!token) return { error: "Ошибка! Отсутсвует токен" };

  const validatedFields = PasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Минимальная длинна пароля - 6 символов" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { error: "Неверный токен" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Токен устарел" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser)
    return { error: "Пользователя с такой почтой не существует" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await deletePasswordResetToken(existingToken.id);

  return { success: "Пароль успешно изменен" };
};
