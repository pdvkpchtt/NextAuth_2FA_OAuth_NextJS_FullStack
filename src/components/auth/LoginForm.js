"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { DigitsCodeInput, Input } from "@/shared/ui/Input";
import { ButtonPrimary } from "@/shared/ui/Button";
import TextHead from "@/shared/text/TextHead";
import TextSecondary from "@/shared/text/TextSecondary";
import Card from "@/shared/ui/Card";
import Social from "./Social";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import TextHref from "@/shared/text/TextHref";

import { LoginSchema } from "@/schema";

import { login } from "@/server/auth/login";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Проверьте способ авторизации"
      : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleLogin = async (values) => {
    const res = await login(values, code);

    if (res?.twoFactor) setShowTwoFactor(true);
    if (showTwoFactor && res?.error) {
      setShowTwoFactor(false);
      setCode("");
    }
    setResult(res);
  };

  const submitForm = (values) => {
    setResult(null);

    console.log(values, code);

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
          text={!showTwoFactor ? "Авторизация" : "Введите код из письма"}
          style={"font-medium text-[18px] text-center select-none"}
        />

        <FormError message={result?.error || urlError} />
        <FormSuccess message={result?.success} />

        <form
          className="flex flex-col gap-[12px]"
          onSubmit={handleSubmit(submitForm)}
        >
          {!showTwoFactor && (
            <>
              <Input
                disabled={isPending}
                type={"email"}
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
                label="Пароль"
                borderRadius={10}
                placeholder="••••••••••••"
                error={errors?.password}
                caption={errors?.password && errors?.password?.message}
                register={register("password")}
              />
            </>
          )}
          {showTwoFactor && (
            <DigitsCodeInput
              code={code}
              setCode={setCode}
              disabled={isPending}
            />
          )}
          <ButtonPrimary
            type="submit"
            text={!showTwoFactor ? "Войти" : "Подтвердить"}
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

        <div className="space-y-[10px]">
          <p
            className={`break-words select-none text-center text-[#8f8f8f] text-[12px] leading-[14px] font-medium`}
          >
            Нет аккаунта?{" "}
            <TextHref
              onClick={() => router.push("/auth/register")}
              text="Зарегестрироваться"
            />
          </p>

          <TextHref
            onClick={() => router.push("/auth/reset")}
            text="Забыли пароль?"
            style="text-[12px] leading-[14px] font-medium text-center w-full"
          />
        </div>
      </Card>
    </>
  );
};

export default LoginForm;
