import { EyeOutlined } from "@ant-design/icons";
import { useRef } from "react";

export const TextField = ({
  value,
  name,
  id,
  placeholder,
  type,
  onChange,
  className,
  defaultValue,
  password = false,
}) => {
  const inputRef = useRef();

  const togglePasswordVisibility = () => {
    if (inputRef.current.type === "password") {
      inputRef.current.type = "text";
    } else {
      inputRef.current.type = "password";
    }
  };

  return (
    <div className='inline'>
      <input
        ref={inputRef}
        type={type}
        value={value}
        defaultValue={defaultValue}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm my-2 focus:ring-primary-500 focus:border-primary-400 ${className}`}
      />
      {password ? (
        <EyeOutlined
          className='absolute mt-6 -ml-10'
          onClick={togglePasswordVisibility}
        />
      ) : null}
    </div>
  );
};

{
}
