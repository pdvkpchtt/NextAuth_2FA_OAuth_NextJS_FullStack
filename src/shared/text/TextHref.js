const TextHref = ({ onClick = () => {}, style = "", text = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`${style} transition duration-[250ms] text-[#5875e8] cursor-pointer hover:text-[#3A56C5] active:text-[#2C429C]`}
    >
      {text}
    </button>
  );
};

export default TextHref;
