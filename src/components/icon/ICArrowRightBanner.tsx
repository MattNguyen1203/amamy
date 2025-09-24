const ICArrowRightBanner = ({className}: {className?: string}) => {
  return (
    <div>
      <svg
        width='24'
        height='25'
        viewBox='0 0 24 25'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path
          d='M12.7502 17.7498L18 12.5M18 12.5L12.7502 7.25027M18 12.5H6'
          stroke='#38B6FF'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  )
}

export default ICArrowRightBanner
