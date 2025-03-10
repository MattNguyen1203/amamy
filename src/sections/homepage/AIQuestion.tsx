type Props = {}

const AIQuestion = (props: Props) => {
  return (
    <div
      className='flex items-center textWhite p-[0.75rem] h-[3rem] bg-[var(--Blue-Primary,_#38B6FF)] 
    fixed bottom-0 right-[1.5rem] w-[22.56rem] z-50
 justify-between  gap-2.5 rounded-t-[1.25rem] xsm:hidden'
    >
      <div className='flex items-center gap-[0.75rem]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1.5rem'
          height='1.5rem'
          viewBox='0 0 11 11'
          fill='none'
        >
          <path
            d='M5.5 11C5.1 11 4.8 10.8 4.6 10.5L4 9.29999C3.5 8.29999 2.7 7.49999 1.7 6.99999L0.5 6.39999C0.2 6.19999 0 5.79999 0 5.49999C0 5.09999 0.2 4.79999 0.5 4.59999L1.7 3.99999C2.7 3.49999 3.5 2.69999 4 1.69999L4.6 0.499988C5 -0.100012 6 -0.100012 6.4 0.499988L7 1.69999C7.5 2.69999 8.3 3.49999 9.3 3.99999L10.5 4.59999C10.8 4.79999 11 5.09999 11 5.49999C11 5.89999 10.8 6.19999 10.5 6.39999L9.4 6.99999C8.4 7.49999 7.6 8.29999 7.1 9.29999L6.5 10.5C6.2 10.8 5.9 11 5.5 11Z'
            fill='white'
          />
        </svg>
        <span className='font-[SVN-Gilroy] text-[1rem] not-italic font-semibold leading-4'>
          Trợ lý AI Amamy
        </span>
      </div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1.5rem'
        height='1.5rem'
        viewBox='0 0 24 24'
        fill='none'
      >
        <path
          d='M17.6568 12H12M12 12H6.34314M12 12V6.34313M12 12V17.6569'
          stroke='white'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  )
}

export default AIQuestion
