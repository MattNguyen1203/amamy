'use client'
import ICArrowCircle from '@/components/icon/ICArrowCircle'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {useRef, useState} from 'react'

const FaqContainer = ({
  question,
  answer,
  initOpen,
}: {
  question: string
  answer: string
  initOpen: boolean
}) => {
  const [open, setOpen] = useState(initOpen || false)
  const answerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (!answerRef.current) {
      return
    }

    if (open) {
      gsap.fromTo(
        answerRef.current,
        {height: 0, opacity: 0},
        {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power1.out',
        },
      )
    } else {
      gsap.to(answerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power1.in',
      })
    }
  }, [open])

  return (
    <div className='size-full rounded-[1.25rem] xsm:w-full shadow-[0px_4.4px_20px_-1px_#1310220D]'>
      <button
        className='flex w-full justify-between rounded-[1.25rem] items-center border border-[#E3DBD8] p-7 xsm:p-5'
        onClick={() => setOpen(!open)}
      >
        <p className='text-start text-[1.125rem] font-semibold leading-[1.75rem] xsm:max-w-[16.875rem] xsm:text-sm xsm:font-medium'>
          {question}
        </p>
        <span>
          <ICArrowCircle
            className={`size-8 transition-all duration-300 xsm:size-5 ${
              open ? 'fill-Blue-Primary' : 'rotate-180 fill-[#CCCCCC]'
            }`}
          />
        </span>
      </button>

      <div
        ref={answerRef}
        className='overflow-hidden'
      >
        <div
          className='px-[1.875rem] py-[1.25rem] text-[1rem] leading-[1.875rem] text-[#727272] xsm:px-[0.796rem] xsm:py-[0.603rem] xsm:text-sm'
          dangerouslySetInnerHTML={{__html: answer}}
        />
      </div>
    </div>
  )
}

export default FaqContainer
