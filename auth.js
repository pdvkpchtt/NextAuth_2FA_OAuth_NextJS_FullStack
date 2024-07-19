import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import VkProvider from "next-auth/providers/vk";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google, YandexProvider, VkProvider],
});
