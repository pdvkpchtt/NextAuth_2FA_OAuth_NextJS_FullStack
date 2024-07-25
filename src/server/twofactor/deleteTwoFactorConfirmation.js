"use server";

import { prisma } from "../db";

export const deleteTwoFactorConfirmation = async (id) => {
  await prisma.TwoFactorConfirmation.delete({
    where: {
      id,
    },
  });
};
