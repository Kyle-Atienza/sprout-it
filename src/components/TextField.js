export const TextField = ({
  value,
  name,
  id,
  placeholder,
  type,
  onChange,
  className,
}) => (
  <>
    <input
      type={type}
      value={value}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      className={`p-4 bg-light-200 rounded-full border-1 border-light-200 open-paragrap-sm my-2 ${className}`}
    />
  </>
);
