"use server";

import bcrypt from "bcryptjs";
// import * as CompanyEmailValidator from "company-email-validator";

import { prisma } from "../db";

import { RegisterSchema } from "@/schema";
import { getUserByEmail } from "../user/getUser";
import { generateVerificationToken } from "../tokens/generateVerificationToken";
import { sendVerificationMail } from "../mails/sendVerificationMail";

export const signin = async (values) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Что-то пошло не так" };
  }

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email.toLowerCase());

  if (existingUser) return { error: "E-mail занят" };

  await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      name,
      password: hashedPassword,
      // если это бизнес почта
      // role: CompanyEmailValidator.isCompanyEmail(email.toLowerCase())
      //   ? "COMPANY"
      //   : "USER",
    },
  });

  const verificationToken = await generateVerificationToken(
    email.toLowerCase()
  );

  await sendVerificationMail(
    verificationToken.email.toLowerCase(),
    verificationToken.token
  );

  return {
    success: `Письмо отправлено на почту ${email.toLowerCase()}`,
  };
};
