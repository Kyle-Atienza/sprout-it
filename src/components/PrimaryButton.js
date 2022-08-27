export const PrimaryButton = ({
  name,
  onClick,
  className,
  toggle,
  target,
  disabled,
}) => (
  <>
    <button
      disabled={disabled ? true : false}
      type="button"
      className={`py-4 px-6 rounded-full poppins-button bg-primary-400 text-light-100 hover:bg-primary-500 shadow transition-all ${className} disabled:opacity-50`}
      onClick={onClick}
      data-bs-toggle={toggle}
      data-bs-target={target}
    >
      {name}
    </button>
  </>
);
