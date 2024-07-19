"use client";

import ArrowLeftIcon from "../icons/ArrowLeftIcon";

export const ButtonPrimary = ({
  type = "button",
  text = "empty",
  style = "",
  borderRadius = 12,
  onClick = () => {},
  children,
}) => {
  const clickHandler = () => {
    onClick();
  };

  return (
    <button
      type={type}
      className={`${style} font-medium outline-none w-full text-[14px] leading-[18px] tracking-[-0.015em] p-[12px] text-center select-none text-white items-center flex justify-center transition duration-[250ms] bg-[#5875e8] cursor-pointer hover:bg-[#3A56C5] active:bg-[#2C429C]`}
      style={{ borderRadius }}
      onClick={() => clickHandler()}
    >
      {children && <div className="mr-[8px]">{children}</div>}

      <>{text}</>
    </button>
  );
};

export const ButtonOpacity = ({
  children,
  style = "",
  borderRadius = 20,
  padding = 12,
  onClick = () => {},
}) => {
  return (
    <button
      style={{ borderRadius, padding }}
      className={`${style}  group items-center flex flex-row max-w-[260px] [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const BackButton = ({ onClick = () => {}, style = "", children }) => {
  return (
    <button
      className={`${style} group rounded-[16px] px-[12px] py-[8px] text-center text-[#5875e8] items-center flex justify-center
       cursor-pointer w-fit select-none transition duration-[250ms] bg-[#74899B] bg-opacity-[8%]`}
      onClick={onClick}
    >
      <ArrowLeftIcon />
    </button>
  );
};
