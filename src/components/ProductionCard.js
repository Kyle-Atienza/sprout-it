export const ProductionCard = ({
  onClick,
  className,
  batchNumber,
  startedAt,
  daysLeft,
  countDays = true,
  batch,
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

  const getMaterialSubstrate = (batch) => {
    if (
      batch.materials.every((material) => {
        return material.material.name === "Dayami";
      }) ||
      batch.materials.every((material) => {
        return material.material.name === "Kusot";
      })
    ) {
      return "Mixed";
    } else if (
      batch.materials.some((material) => {
        return material.material.name === "Dayami";
      })
    ) {
      return "Dayami";
    } else if (
      batch.materials.some((material) => {
        return material.material.name === "Kusot";
      })
    ) {
      return "Kusot";
    }
  };

  const getDaysCount = (batch) => {
    const phase = batch.activePhase;
    const currentDate = new Date();

    if (phase === "pre") {
      const baseDate = new Date(batch.createdAt);
      const timeDiff = currentDate.getTime() - baseDate.getTime();
      const dayDiff = timeDiff / (1000 * 3600 * 24) + 1;
      return Math.floor(dayDiff);
    } else if (phase === "post") {
      return 0;
    } else {
      const baseDate = new Date(batch[batch.activePhase].startedAt);
      const timeDiff = currentDate.getTime() - baseDate.getTime();
      const dayDiff = timeDiff / (1000 * 3600 * 24) + 1;
      return Math.floor(dayDiff);
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
            {"Batch " + batch.name}
          </h5>
          {/* <p className='open-paragraph-sm'>{description}</p> */}
          <p>Started At: {new Date(batch.createdAt).toDateString().slice(4)}</p>
          <p>Substrate: {batch ? getMaterialSubstrate(batch) : "no"}</p>
        </div>
        {countDays ? (
          <div
            className="h-auto w-1/4 flex flex-col justify-center items-center rounded-r-lg"
            style={{ background: getBgByDays(getDaysCount(batch)) }}
          >
            <p className="poppins-heading-6">{getDaysCount(batch)}</p>
            <p className="open-button text">
              {getDaysCount(batch) > 1 ? "days" : "day"}
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
};
