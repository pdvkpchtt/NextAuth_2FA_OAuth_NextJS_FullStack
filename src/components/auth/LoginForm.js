"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Input } from "@/shared/ui/Input";
import { ButtonPrimary } from "@/shared/ui/Button";
import TextHead from "@/shared/text/TextHead";
import TextSecondary from "@/shared/text/TextSecondary";
import Card from "@/shared/ui/Card";
import Social from "./Social";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";

import { LoginSchema } from "@/schema";

import { login } from "@/server/auth/login";

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [result, setResult] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleLogin = async (values) => {
    const res = await login(values);
    setResult(res);
  };

  const submitForm = (values) => {
    setResult(null);

    startTransition(() => {
      handleLogin(values);
    });
  };

  return (
    <>
      <p className="font-bold text-[32px] transition text-[#5875e8] duration-[250ms] leading-[38.4px] tracking-[-0.023em] select-none">
        SwiftHire
      </p>

      <Card style="max-w-[400px] w-full flex flex-col gap-[20px]" padding={10}>
        <TextHead
          text="Авторизация"
          style={"font-medium text-[18px] text-center select-none"}
        />

        <FormError message={result?.error || null} />
        <FormSuccess message={result?.success || null} />

        <form
          className="flex flex-col gap-[12px]"
          onSubmit={handleSubmit(submitForm)}
        >
          <Input
            disabled={isPending}
            type={"email"}
            name="email"
            label="E-mail"
            borderRadius={10}
            placeholder="swifthire@gmail.com"
            error={errors?.email}
            caption={errors?.email && errors?.email?.message}
            register={register("email")}
          />
          <Input
            disabled={isPending}
            type={"password"}
            name="password"
            label="Пароль"
            borderRadius={10}
            placeholder="••••••••••••"
            error={errors?.password}
            caption={errors?.password && errors?.password?.message}
            register={register("password")}
          />

          <ButtonPrimary
            type="submit"
            text="Войти"
            borderRadius={10}
            style="mt-[20px]"
            loader={isPending}
          />
        </form>

        <TextSecondary
          text={`Или`}
          style={"text-center text-[12px] font-medium leading-[14px]"}
        />

        <Social />

        <p
          className={`break-words select-none text-center text-[#8f8f8f] text-[12px] leading-[14px] font-medium`}
        >
          Нет аккаунта?{" "}
          <button
            onClick={() => router.push("/auth/register")}
            className="transition duration-[250ms] text-[#5875e8] cursor-pointer hover:text-[#3A56C5] active:text-[#2C429C]"
          >
            Зарегестрироваться
          </button>
        </p>
      </Card>
    </>
  );
};

export default LoginForm;
