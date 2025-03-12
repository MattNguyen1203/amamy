export default function ICX({className}: {className?: string}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16'
        stroke='black'
        strokeOpacity='0.6'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
