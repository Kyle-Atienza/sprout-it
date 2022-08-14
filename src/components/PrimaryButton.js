export const PrimaryButton = ({ name, onClick, className }) => (
  <>
    <button
      className={`py-4 px-6 rounded-full poppins-button bg-primary-400 text-light-100 hover:bg-primary-500 shadow transition-all ${className}`}
      onClick={onClick}
    >
      {name}
    </button>
  </>
);
