"use server";

import { LoginSchema } from "@/schema";

export const login = async (values) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Что-то пошло не так" };
  }

  return { success: "Письмо отправлено почту" };
};
