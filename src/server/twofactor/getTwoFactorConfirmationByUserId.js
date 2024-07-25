"use server";

import { prisma } from "../db";

export const getTwoFactorConfirmationByUserId = async (userId) => {
  try {
    const twoFactorConfirmation = await prisma.TwoFactorConfirmation.findUnique(
      {
        where: {
          userId,
        },
      }
    );

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
