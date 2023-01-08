export const WeeklyTaskCard = ({
  onClick,
  className,
  task,
  batch,
  phase,
  day,
  image,
  next,
}) => {
  const mapDateDay = (day) => {
    switch (day) {
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      case 0:
        return "Sun";
      default:
        return "Sun";
    }
  };

  return (
    <>
      <div
        className={`flex flex-col-reverse md:flex-row w-full h-auto my-4 rounded-lg bg-light-100 shadow md:space-x-4 transition-all min-h-[8rem] ${className}`}
        onClick={onClick}
      >
        <div className="h-auto w-1/5 pl-4 hidden md:flex flex-col justify-center items-center rounded-l-lg">
          {image ? <img src={image} alt="Weekly task icon" /> : null}
        </div>
        <div className="py-4 px-4 md:px-0 flex flex-col h-full w-full md:w-3/5 text-left">
          <h5 className="open-paragraph font-semibold mb-2 text-primary-700">
            {task}
          </h5>
          <p className="open-paragraph-sm">
            Batch {batch} - {phase}
          </p>
        </div>
        <div className="h-auto w-full md:w-1/5 flex flex-col justify-center items-center bg-accent-400 rounded-t-lg md:rounded-r-lg md:rounded-tl-none">
          <p className="poppins-heading-6 m-4">{day}</p>
        </div>
      </div>
    </>
  );
};
