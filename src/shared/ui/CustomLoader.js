"use client";

import { Oval } from "react-loader-spinner";

const CustomLoader = ({
  diameter = 50,
  strokeWidth = 5,
  strokeWidthSecondary = 5,
}) => {
  return (
    <Oval
      height={diameter}
      width={diameter}
      color="rgba(88, 117, 232, 1)"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="rgba(88, 117, 232, 0.3)"
      strokeWidth={strokeWidth}
      strokeWidthSecondary={strokeWidthSecondary}
    />
  );
};

export default CustomLoader;
