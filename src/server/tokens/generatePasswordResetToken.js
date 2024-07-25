import { v4 as uuidv4 } from "uuid";

import {
  createPasswordResetToken,
  deletePasswordResetToken,
  getPasswordResetTokenByEmail,
} from "./passwordResetToken";

export const generatePasswordResetToken = async (email) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) await deletePasswordResetToken(existingToken.id);

  const verificationToken = await createPasswordResetToken(
    email,
    token,
    expires
  );

  return verificationToken;
};
