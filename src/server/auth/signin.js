"use server";

import bcrypt from "bcryptjs";

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

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "E-mail занят" };

  await prisma.user.create({
    data: { email, name, secondname, password: hashedPassword },
  });

  // TODO: Send verif mail

  return { success: "Письмо отправлено почту" };
};
