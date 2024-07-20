import bcrypt from "bcryptjs";

import Google from "next-auth/providers/google";
import Yandex from "next-auth/providers/yandex";
import Vk from "next-auth/providers/vk";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schema";
import { getUserByEmail } from "@/server/user/getUser";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          // если нет пароля, то юзер залогинился чере гугл, яндекс, вк и тд
          if (!user || !user.password) return null;

          // сравниваем пароли
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatch) return user;
        }

        return null;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Yandex,
    // Vk,
  ],
};
