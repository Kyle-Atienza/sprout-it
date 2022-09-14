export const ProductionCard = ({
  onClick,
  className,
  batchNumber,
  description,
  daysLeft,
  countDays = true,
}) => {
  const getBgByDays = (days) => {
    const week = days / 7;

    if (week < 1) {
      return "#71BF88";
    } else if (week < 2) {
      return "#A1C53D";
    } else if (week < 3) {
      return "#E1BC38";
    } else if (week < 4) {
      return "#F0925E";
    } else if (week > 4) {
      return "#FD8282";
    }
  };
  return (
    <>
      <div
        className={`w-full h-auto my-4 rounded-lg bg-light-100 shadow transition-all flex ${className}`}
        onClick={onClick}
      >
        <div className="p-4 flex flex-col h-full w-3/4 text-left">
          <h5 className="open-heading-6 font-semibold mb-2 text-primary-700">
            {batchNumber}
          </h5>
          <p className="open-paragraph-sm">{description}</p>
        </div>
        {countDays ? (
          <div
            className="h-auto w-1/4 flex flex-col justify-center items-center rounded-r-lg"
            style={{ background: getBgByDays(daysLeft) }}
          >
            <p className="open-button text">{daysLeft > 1 ? "days" : "day"}</p>
            <p className="poppins-heading-6">{daysLeft}</p>
          </div>
        ) : null}
      </div>
    </>
  );
};
