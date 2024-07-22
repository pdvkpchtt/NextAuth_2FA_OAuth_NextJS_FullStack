import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Неверный формат почты" }),
  password: z.string().min(1, { message: "Введите пароль" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Неверный формат почты" }),
  password: z.string().min(6, { message: "Минимум 6 символов" }),
  name: z.string().min(1, { message: "Введите имя" }),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "Неверный формат почты" }),
});

export const PasswordSchema = z.object({
  password: z.string().min(6, { message: "Минимум 6 символов" }),
});
