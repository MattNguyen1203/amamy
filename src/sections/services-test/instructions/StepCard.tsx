import React, {ReactNode} from 'react'

const StepCard = ({
  icon,
  stepNumber,
  label,
  desc,
}: {
  icon: ReactNode
  stepNumber: number
  label: string
  desc: string
}) => {
  return (
    <div className='flex min-h-[12.0625rem] w-full min-w-[19.54167rem] flex-col items-start gap-[1.5rem] rounded-[1.5rem] bg-[#F8F9FA] p-[1.5rem] xsm:min-h-0 xsm:gap-[1.25rem] xsm:p-[1.25rem]'>
      <div className='flex items-center gap-[0.875rem]'>
        {icon}
        <span className='flex flex-col gap-y-[0.25rem]'>
          <p className='text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-greyscale-text60 xsm:text-[0.8125rem] xsm:leading-[1.21875rem] xsm:tracking-[-0.02438rem]'>
            Bước {stepNumber}
          </p>
          <p className='text-[1.25rem] font-bold leading-[1.5rem] tracking-[-0.05rem] text-Blue-Primary xsm:text-[1rem] xsm:leading-[1.2rem] xsm:tracking-[-0.04rem]'>
            {label}
          </p>
        </span>
      </div>
      <p className='text-[rgba(0, 0, 0, 0.80)] text-[1rem] font-medium leading-[1.5rem] tracking-[-0.03rem] xsm:text-[0.875rem] xsm:leading-[1.3125rem] xsm:tracking-[-0.02625rem]'>
        {desc}
      </p>
    </div>
  )
}

export default StepCard
