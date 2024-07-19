const AuthLayout = ({ children }) => {
  return (
    <div className="h-full flex items-center justify-center flex-col gap-[20px] p-[16px] [@media(pointer:coarse)]:p-[8px]">
      {children}
    </div>
  );
};

export default AuthLayout;
