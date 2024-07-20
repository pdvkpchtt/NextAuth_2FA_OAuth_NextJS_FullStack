"use server";

import { prisma } from "../db";
import { getUserByEmail } from "../user/getUser";
import {
  deleteVerificationToken,
  getVerificationTokenByToken,
} from "./verificationToken";

export const newVerification = async (token) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: "Токен не существует" };

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
