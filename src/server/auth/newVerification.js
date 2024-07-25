"use server";

import { prisma } from "../db";
import { getUserByEmail } from "../user/getUser";
import {
  deleteVerificationToken,
  getVerificationTokenByToken,
} from "./../tokens/verificationToken";

export const newVerification = async (token) => {
  if (!token) return { error: "Ошибка! Отсутсвует токен" };

  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: "Неверный токен" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Токен устарел" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser)
    return { error: "Пользователя с такой почтой не существует" };

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email.toLowerCase(),
    },
  });

  await deleteVerificationToken(existingToken.id);

  return { success: "Почта успешно подтверждена" };
};
