"use server";

import { prisma } from "../db";

export const createTwoFactorConfirmation = async (userId) => {
  await prisma.TwoFactorConfirmation.create({
    data: {
      userId,
    },
  });
};
