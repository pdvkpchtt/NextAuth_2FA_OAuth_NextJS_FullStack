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

import { RegisterSchema } from "@/schema";

import { signin } from "@/server/auth/signin";

const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", name: "", secondname: "" },
  });

  const [result, setResult] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleLogin = async (values) => {
    const res = await signin(values);
    setResult(res);

    if (!res?.error) reset();
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
        <div className="flex flex-col gap-[5px]">
          <TextHead
            text="Регистрация"
            style={"font-medium text-[18px] text-center select-none"}
          />
          <TextSecondary
            text={`*при вводе корпоративной почты вы будете зарегестрирированы как компания`}
            style={
              "text-center text-[12px] select-none font-medium leading-[14px]"
            }
          />
        </div>

        <FormError message={result?.error || null} />
        <FormSuccess message={result?.success || null} />

        <form
          className="flex flex-col gap-[12px]"
          onSubmit={handleSubmit(submitForm)}
        >
          {/* <label className="flex flex-row cursor-pointer items-center w-fit">
            <input type="checkbox" />
            <TextSecondary
              text="Мы компания"
              style="font-medium text-[12px] select-none leading-[14px]"
            />
          </label> */}

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
            type={"secondname"}
            name="secondname"
            label="Имя"
            borderRadius={10}
            placeholder="Кабиров"
            error={errors?.secondname}
            caption={errors?.secondname && errors?.secondname?.message}
            register={register("secondname")}
          />
          <Input
            disabled={isPending}
            type={"name"}
            name="name"
            label="Имя"
            borderRadius={10}
            placeholder="Данил"
            error={errors?.name}
            caption={errors?.name && errors?.name?.message}
            register={register("name")}
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
            text="Создать аккаунт"
            borderRadius={10}
            style="mt-[20px]"
            loader={isPending}
          />
        </form>

        <TextSecondary
          text={`Или`}
          style={
            "text-center text-[12px] select-none font-medium leading-[14px]"
          }
        />

        <Social />

        <p
          className={`break-words select-none text-center text-[#8f8f8f] text-[12px] leading-[14px] font-medium`}
        >
          Есть аккаунт?{" "}
          <button
            onClick={() => router.push("/auth/login")}
            className="transition duration-[250ms] text-[#5875e8] cursor-pointer hover:text-[#3A56C5] active:text-[#2C429C]"
          >
            К авторизации
          </button>
        </p>
      </Card>
    </>
  );
};

export default RegisterForm;
