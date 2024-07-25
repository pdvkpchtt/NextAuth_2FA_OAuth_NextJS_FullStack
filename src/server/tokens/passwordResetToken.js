"use server";

import { prisma } from "../db";

export const getPasswordResetTokenByEmail = async (email) => {
  try {
    const passwordResetToken = await prisma.PasswordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token) => {
  try {
    const passwordResetToken = await prisma.PasswordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const deletePasswordResetToken = async (tokenId) => {
  try {
    await prisma.PasswordResetToken.delete({
      where: { id: tokenId },
    });
  } catch {
    return null;
  }
};

export const createPasswordResetToken = async (email, token, expires) => {
  try {
    const passwordResetToken = await prisma.PasswordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};
