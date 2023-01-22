export const SecondaryButton = ({
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
      type='button'
      className={`py-2 px-6 rounded-full poppins-button bg-transparent text-primary-500 hover:text-light-100 border-primary-400 hover:border-primary-500 border-2 hover:bg-primary-500 shadow transition-all disabled:opacity-50 ${className} disabled:opacity-50`}
      onClick={onClick}
      data-bs-toggle={toggle}
      data-bs-target={target}
    >
      {name}
    </button>
  </>
);
