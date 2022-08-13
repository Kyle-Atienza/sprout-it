export const PrimaryButton = ({ name, className }) => (
  <>
    <button
      className={
        "p-4 rounded-full poppins-button bg-primary-400 text-light-100 hover:bg-primary-500 hover:shadow transition-all " +
        className
      }
    >
      {name}
    </button>
  </>
);
