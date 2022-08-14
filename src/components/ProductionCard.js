export const ProductionCard = ({
  onClick,
  className,
  batchNumber,
  description,
  daysLeft,
}) => (
  <>
    <div
      className={`w-full h-auto my-4 rounded-lg bg-light-100 shadow transition-all flex ${className}`}
      onClick={onClick}
    >
      <div className='p-4 flex flex-col h-full w-3/4 text-left'>
        <h5 className='open-heading-6 font-semibold mb-2 text-primary-700'>
          {batchNumber}
        </h5>
        <p className='open-paragraph-sm'>{description}</p>
      </div>
      <div className='h-auto w-1/4 flex flex-col justify-center items-center bg-primary-300 rounded-r-lg'>
        <p className='poppins-heading-6'>{daysLeft}</p>
        <p className='open-button text'>days left</p>
      </div>
    </div>
  </>
);
