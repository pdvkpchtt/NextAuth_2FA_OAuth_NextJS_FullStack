"use client";

import { FcGoogle } from "react-icons/fc";
import { FaYandex } from "react-icons/fa";

import { ButtonOpacity } from "@/shared/ui/Button";

import { VkIcon } from "@/shared/icons/VkIcon";

const Social = () => {
  return (
    <div className="flex flex-row gap-[12px]">
      <ButtonOpacity
        padding={8}
        borderRadius={10}
        style="w-full flex justify-center"
      >
        <FcGoogle size={22} />
      </ButtonOpacity>
      <ButtonOpacity
        padding={8}
        borderRadius={10}
        style="w-full flex justify-center"
      >
        <FaYandex size={20} color="#ff3700" />
      </ButtonOpacity>
      <ButtonOpacity
        padding={8}
        borderRadius={10}
        style="w-full flex justify-center"
      >
        <VkIcon size={26.4} />
      </ButtonOpacity>
    </div>
  );
};

export default Social;
