const TextHead = ({ style = "", text = "" }) => {
  return <h1 className={`${style} break-words`}>{text}</h1>;
};

export default TextHead;
