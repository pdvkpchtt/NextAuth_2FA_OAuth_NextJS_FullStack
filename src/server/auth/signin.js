"use server";

import bcrypt from "bcryptjs";
import * as CompanyEmailValidator from "company-email-validator";

import { prisma } from "../db";

import { RegisterSchema } from "@/schema";
import { getUserByEmail } from "../user/getUser";

export const signin = async (values) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Что-то пошло не так" };
  }

  const { email, name, secondname, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email.toLowerCase());

  if (existingUser) return { error: "E-mail занят" };

  await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      name,
      secondname,
      password: hashedPassword,
      // если это бизнес почта
      role: CompanyEmailValidator.isCompanyEmail(email.toLowerCase())
        ? "COMPANY"
        : "USER",
    },
  });

  // TODO: Send verif mail

  return { success: "Письмо отправлено почту" };
};
