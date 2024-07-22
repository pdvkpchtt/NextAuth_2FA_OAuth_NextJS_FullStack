const TextSecondary = ({ style = "", text = "" }) => {
  return <p className={`${style} break-words text-[#8f8f8f]`}>{text}</p>;
};

export default TextSecondary;
