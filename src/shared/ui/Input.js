import { useRef } from "react";

import TextSecondary from "../text/TextSecondary";
import CircularProggressBar from "./CircularProggressBar";

export const Input = ({
  label = "",
  caption = "",
  placeholder = "",
  value = undefined,
  borderRadius = 8,
  maxLength,
  onChange = () => {},
  type = "text",
  name = "",
  register = {},
  disabled = false,
}) => {
  return (
    <div className="flex flex-col min-w-[20px] w-full">
      {label && (
        <div className="flex flex-row justify-between items-center">
          <TextSecondary
            text={label}
            style="font-medium text-[12px] select-none leading-[14px] mb-[6px]"
          />
          {maxLength && value !== null ? (
            <div className="w-[16px] h-[16px] mr-[4px]">
              <CircularProggressBar
                progress={value?.length}
                maxWal={maxLength}
                trackColor={
                  value?.length === 0
                    ? "stroke-[#ececec] dark:stroke-[#202436]"
                    : "stroke-[#CDD6F8] dark:stroke-[#353D5C]"
                }
                indicatorColor={
                  value?.length === 0 ? "stroke-[#ececec]" : "stroke-[#758DEC]"
                }
                trackWidth={2.67}
                indicatorWidth={2.67}
                size={16}
              />
            </div>
          ) : null}
        </div>
      )}

      <input
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        value={value}
        className={`px-[12px] p-[12px] text-[#2c2c2c] dark:text-white text-[14px] bg-[#f6f6f8] dark:bg-[#2c2c2c] placeholder:text-[#bfbfbf] placeholder:select-none dark:placeholder:text-[#8f8f8f] transition duration-[250ms] placeholder:font-normal leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]`}
        style={{
          borderRadius,
        }}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        maxLength={maxLength}
        {...register}
      />

      {caption && (
        <p className="text-[12px] select-none leading-[14px] mt-[3px] text-[#F0BB31]">
          {caption}
        </p>
      )}
    </div>
  );
};

export const DigitsCodeInput = ({
  label = "",
  caption = "",
  borderRadius = 8,
  code = undefined,
  setCode = () => {},
  disabled = false,
}) => {
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  function handleInput(e, index) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    const newCode = [...code];

    newCode[index] = input.value;

    setCode(newCode.join(""));

    input.select();

    if (input.value === "") {
      if (previousInput) {
        previousInput.current.focus();
      }
    } else if (nextInput) {
      nextInput.current.select();
    }
  }

  function handleFocus(e) {
    e.target.select();
  }

  function handleKeyDown(e, index) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    if ((e.keyCode === 8 || e.keyCode === 46) && input.value === "") {
      e.preventDefault();
      setCode(
        (prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1)
      );
      if (previousInput) {
        previousInput.current.focus();
      }
    }
  }

  const handlePaste = (e) => {
    const pastedCode = e.clipboardData.getData("text");
    if (pastedCode.length === 6) {
      setCode(pastedCode);
      inputRefs.forEach((inputRef, index) => {
        inputRef.current.value = pastedCode.charAt(index);
      });
    }
  };

  return (
    <div className="flex flex-row gap-[10px] mx-auto">
      {[...Array(6)].map((_, key) => (
        <input
          key={key}
          ref={inputRefs[key]}
          type="text"
          maxLength={1}
          onChange={(e) => handleInput(e, key)}
          onFocus={handleFocus}
          onKeyDown={(e) => handleKeyDown(e, key)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`px-[12px] w-[42px] p-[12px] text-[#2c2c2c] dark:text-white font-medium text-center text-[14px] bg-[#f6f6f8] dark:bg-[#2c2c2c] transition duration-[250ms] leading-[18px] tracking-[-0.015em]`}
          style={{
            borderRadius,
          }}
        />
      ))}
    </div>
  );
};
