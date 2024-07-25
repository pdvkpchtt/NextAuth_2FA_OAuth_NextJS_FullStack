"use client";

import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaYandex } from "react-icons/fa";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { ButtonOpacity } from "@/shared/ui/Button";

import { VkIcon } from "@/shared/icons/VkIcon";

const Social = () => {
  const onClick = (provider) => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex flex-row gap-[12px]">
      <ButtonOpacity
        padding={8}
        borderRadius={10}
        style="w-full flex justify-center"
        onClick={() => onClick("google")}
      >
        <FcGoogle size={22} />
      </ButtonOpacity>
      <ButtonOpacity
        padding={8}
        borderRadius={10}
        style="w-full flex justify-center"
        onClick={() => onClick("yandex")}
      >
        <FaYandex size={20} color="#ff3700" />
      </ButtonOpacity>
      <ButtonOpacity
        padding={8}
        borderRadius={10}
        style="w-full flex justify-center"
        onClick={() => alert("Данная функция в разработке")}
        disabled
        title="В разработке"
      >
        <VkIcon size={22} />
      </ButtonOpacity>
    </div>
  );
};

export default Social;
