"use server";

import { prisma } from "../db";

export const getTwoFactorTokenByEmail = async (email) => {
  try {
    const verififcationToken = await prisma.TwoFactorToken.findFirst({
      where: { email },
    });

    return verififcationToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token) => {
  try {
    const verififcationToken = await prisma.TwoFactorToken.findUnique({
      where: { token },
    });

    return verififcationToken;
  } catch {
    return null;
  }
};

export const deleteTwoFactorToken = async (tokenId) => {
  try {
    await prisma.TwoFactorToken.delete({
      where: { id: tokenId },
    });
  } catch {
    return null;
  }
};

export const createTwoFactorToken = async (email, token, expires) => {
  try {
    const verififcationToken = await prisma.TwoFactorToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return verififcationToken;
  } catch {
    return null;
  }
};
