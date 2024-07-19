import TextSecondary from "../text/TextSecondary";
import CircularProggressBar from "./CircularProggressBar";

export const Input = ({
  label = "",
  caption = "",
  placeholder = "",
  value = undefined,
  error = false,
  borderRadius = 8,
  maxLength,
  onChange = () => {},
  type = "text",
  name = "",
  register,
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
        className={`px-[12px] p-[12px] text-[#2c2c2c] dark:text-white text-[14px] bg-[#f6f6f8] dark:bg-[#2c2c2c] placeholder:text-[#bfbfbf] placeholder:select-none dark:placeholder:text-[#8f8f8f] transition duration-[250ms] outline-none placeholder:font-normal leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]`}
        style={{
          borderRadius,
        }}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        maxLength={maxLength}
        {...register}
      />

      {caption && (
        <p className="text-[12px] leading-[14px] mt-[3px] text-[#F0BB31]">
          {caption}
        </p>
      )}
    </div>
  );
};
