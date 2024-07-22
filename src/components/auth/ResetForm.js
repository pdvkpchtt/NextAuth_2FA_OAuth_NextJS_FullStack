"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextHead from "@/shared/text/TextHead";
import { ButtonPrimary } from "@/shared/ui/Button";
import Card from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { reset } from "@/server/auth/reset";
import TextHref from "@/shared/text/TextHref";

import { ResetPasswordSchema } from "@/schema";

const ResetForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { email: "" },
  });

  const [result, setResult] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleReset = async (values) => {
    const res = await reset(values);
    setResult(res);
  };

  const submitForm = (values) => {
    setResult(null);

    startTransition(() => {
      handleReset(values);
    });
  };

  return (
    <>
      <p className="font-bold text-[32px] transition text-[#5875e8] duration-[250ms] leading-[38.4px] tracking-[-0.023em] select-none">
        SwiftHire
      </p>

      <Card style="max-w-[400px] w-full flex flex-col gap-[20px]" padding={10}>
        <TextHead
          text="Восстановление пароля"
          style={"font-medium text-[18px] text-center select-none"}
        />

        <FormError message={result?.error} />
        <FormSuccess message={result?.success} />

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

          <ButtonPrimary
            type="submit"
            text="Сбросить пароль"
            borderRadius={10}
            style="mt-[20px]"
            loader={isPending}
          />
        </form>

        <TextHref
          onClick={() => router.push("/auth/login")}
          text="К авторизации"
          style="text-[12px] leading-[14px] font-medium text-center"
        />
      </Card>
    </>
  );
};

export default ResetForm;
