import React, {useState} from 'react'
import ICArrowCircle from '@/components/icon/ICArrowCircle'

const FaqContainer = ({
  question,
  answer,
}: {
  question: string
  answer: string
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='size-full rounded-[1.25rem] shadow-[0px_4.4px_20px_-1px_#1310220D]'>
      <button
        className='flex w-full justify-between rounded-[1.25rem] border border-[#E3DBD8] p-7 xsm:p-5'
        onClick={() => setOpen(!open)}
      >
        <p className='text-start text-[1.125rem] font-semibold leading-[1.75rem] xsm:max-w-[16.875rem] xsm:text-sm xsm:font-medium'>
          {question}
        </p>
        <span>
          <ICArrowCircle
            className={`size-8 xsm:size-5 ${open ? 'fill-Blue-Primary' : 'rotate-180 fill-[#CCCCCC]'}`}
          />
        </span>
      </button>

      {open && (
        <div className='whitespace-pre-line px-[1.875rem] py-[1.25rem] text-[1rem] leading-[1.875rem] text-[#727272] xsm:px-[0.796rem] xsm:py-[0.603rem] xsm:text-sm'>
          {answer}
        </div>
      )}
    </div>
  )
}

export default FaqContainer
