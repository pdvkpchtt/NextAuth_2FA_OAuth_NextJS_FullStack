import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/server/db";
import { getUserById } from "@/server/user/getUser";
import authConfig from "@/auth.config";
import { getTwoFactorConfirmationByUserId } from "./server/twofactor/getTwoFactorConfirmationByUserId";
import { deleteTwoFactorConfirmation } from "./server/twofactor/deleteTwoFactorConfirmation";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // позволить OAuth без верификации почты
      if (account?.provider !== "credentials") return true;

      // без верификации нельзя залогиниться + 2fa
      const existingUser = await getUserById(user.id);
      if (!existingUser || !existingUser.emailVerified) return false;
      if (existingUser.isTwoFactorConfirmation) {
        const isTwoFactorConfirmationRealyExist =
          await getTwoFactorConfirmationByUserId(existingUser.id);

        if (!isTwoFactorConfirmationRealyExist) return false;

        await deleteTwoFactorConfirmation(isTwoFactorConfirmationRealyExist.id);
      }

      return true;
    },
    async session({ token, session }) {
      // добавляем в сессию нужные поля
      if (token.sub && session.user) session.user.id = token.sub;
      if (token.role && session.user) session.user.role = token.role;
      if (token.username && session.user)
        session.user.username = token.username;

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.username = existingUser.username;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
