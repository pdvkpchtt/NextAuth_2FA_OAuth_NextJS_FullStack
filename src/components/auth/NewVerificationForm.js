"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import TextHead from "@/shared/text/TextHead";
import Card from "@/shared/ui/Card";
import CustomLoader from "@/shared/ui/CustomLoader";
import TextSecondary from "@/shared/text/TextSecondary";
import { newVerification } from "@/server/auth/newVerification";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import TextHref from "@/shared/text/TextHref";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [result, setResult] = useState(null);

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!!result) result;

    if (!token) {
      setResult({ error: "Ошибка! Отсутсвует токен" });
      return;
    }

    newVerification(token)
      .then((data) => setResult(data))
      .catch((error) => setResult({ error: "Что-то пошло не так" }));
  }, [token, result]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <p className="font-bold text-[32px] transition text-[#5875e8] duration-[250ms] leading-[38.4px] tracking-[-0.023em] select-none">
        SwiftHire
      </p>

      <Card style="max-w-[400px] w-full flex flex-col gap-[20px]" padding={10}>
        <TextHead
          text="Подтверждение почты"
          style={"font-medium text-[18px] text-center select-none"}
        />

        <FormError message={result?.error} />
        <FormSuccess message={result?.success} />

        {!result ? (
          <>
            <div className="mx-auto">
              <CustomLoader diameter={40} />
            </div>

            <TextSecondary
              text={`Дождитесь завершения операции`}
              style={
                "text-center text-[12px] select-none font-medium leading-[14px]"
              }
            />
          </>
        ) : (
          <TextHref
            onClick={() => router.push("/auth/login")}
            style="text-[12px] leading-[14px] font-medium"
            text="К авторизации"
          />
        )}
      </Card>
    </>
  );
};

export default NewVerificationForm;
