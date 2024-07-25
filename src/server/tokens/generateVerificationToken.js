import { v4 as uuidv4 } from "uuid";

import {
  createVerificationToken,
  deleteVerificationToken,
  getVerificationTokenByEmail,
} from "./verificationToken";

export const generateVerificationToken = async (email) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) await deleteVerificationToken(existingToken.id);

  const verificationToken = await createVerificationToken(
    email,
    token,
    expires
  );

  return verificationToken;
};
