import React from "react";
import {
  Tailwind,
  Button,
  Text,
  Column,
  Body,
  Html,
  Img,
  Row,
  Head,
} from "@react-email/components";

const MailTwoFactor = ({ token = "" }) => {
  return (
    <Tailwind>
      <Head>
        <title>Двухфакторная аутентификация</title>
      </Head>
      <Body className="w-full bg-transparent flex flex-col items-center justify-center rounded">
        <Body className="w-[560px] bg-[#f6f6f8] pb-[32px] text-center rounded-[20px] mx-auto">
          <Text
            className={`text-[#5875e8] text-[32px] font-bold leading-[38.4px] tracking-[-0.023em] p-0`}
            // style={{letterSpacing: 24}}
          >
            SwifHire
          </Text>
          <Text className="text-[24px] text-[#2c2c2c] font-semibold leading-[24px] mt-[32px] mb-[24px]">
            Код для подтверждения двухфакторной аутентификации
          </Text>

          <Text
            className={`text-[#5875e8] text-[32px] cursor-pointer font-semibold leading-[24px] tracking-[24px] ml-[24px] p-0`}
          >
            {token}
          </Text>

          <Text className="text-[14px] text-[#8f8f8f] font-normal leading-[19px] mt-[40px]">
            Если сообщение отправлено по ошибке, то не отвечайте на него
          </Text>
        </Body>
      </Body>
    </Tailwind>
  );
};

export default MailTwoFactor;
