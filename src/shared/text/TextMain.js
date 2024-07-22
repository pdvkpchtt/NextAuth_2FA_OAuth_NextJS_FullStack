const TextMain = ({ style = "", text = "" }) => {
  return <p className={`${style} break-words `}>{text}</p>;
};

export default TextMain;
