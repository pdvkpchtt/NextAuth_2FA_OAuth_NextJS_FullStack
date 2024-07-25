"use server";

import crypto from "crypto";
import {
  createTwoFactorToken,
  deleteTwoFactorToken,
  getTwoFactorTokenByEmail,
} from "./twoFactorToken";

export const generateTwoFactorToken = async (email) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) await deleteTwoFactorToken(existingToken.id);

  const twoFactorToken = await createTwoFactorToken(email, token, expires);

  return twoFactorToken;
};
