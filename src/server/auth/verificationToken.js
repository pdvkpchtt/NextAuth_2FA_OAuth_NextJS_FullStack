"use server";

import { prisma } from "../db";

export const getVerificationTokenByEmail = async (email) => {
  try {
    const verififcationToken = await prisma.VerificationToken.findFirst({
      where: { email },
    });

    return verififcationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token) => {
  try {
    const verififcationToken = await prisma.VerificationToken.findUnique({
      where: { token },
    });

    return verififcationToken;
  } catch {
    return null;
  }
};

export const deleteVerificationToken = async (tokenId) => {
  try {
    await prisma.VerificationToken.delete({
      where: { id: tokenId },
    });
  } catch {
    return null;
  }
};

export const createVerificationToken = async (email, token, expires) => {
  try {
    const verififcationToken = await prisma.VerificationToken.create({
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
