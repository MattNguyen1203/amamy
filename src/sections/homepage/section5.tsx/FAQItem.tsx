'use client'

import ImageV2 from '@/components/image/ImageV2'
import Plus from '@/components/svg/Plus'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {useEffect, useRef, useState} from 'react'

const FAQItem = ({
  content,
  detail,
  length,
  index,
}: {
  content: string
  detail: string
  length: number
  index: number
}) => {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [heightQ, setHeightQ] = useState(0)
  const [heightA, setHeightA] = useState(0)
  const refQuestion = useRef<HTMLDivElement>(null)
  const refAnswer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeightQ(refQuestion.current?.offsetHeight || 0)
    setHeightA(refAnswer.current?.offsetHeight || 0)

    // add listener for change window size
    const handleResize = () => {
      setHeightQ(refQuestion.current?.offsetHeight || 0)
      setHeightA(refAnswer.current?.offsetHeight || 0)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      className={cn(
        'FAQItem w-full p-[1rem] xsm:pt-0 xsm:pb-[0.75rem] relative transition-all duration-100 overflow-hidden',
      )}
      style={{
        height: open
          ? `${isMobile ? heightQ + heightA + 24 : heightQ + heightA + 40}px`
          : `${
              isMobile
                ? index + 1 === length
                  ? heightQ + 24
                  : heightQ + 12
                : heightQ + 32
            }px`,
      }}
    >
      <div
        ref={refQuestion}
        className='flex space-x-2 items-start w-full'
      >
        <div className='flex-center size-[4.125rem] xsm:size-12 bg-white rounded-full shadow-[0px_4px_19.3px_0px_rgba(0,39,97,0.06)]'>
          {!isMobile ? (
            <ImageV2
              alt=''
              width={40}
              height={40}
              src='/homepage/icon/Question.svg'
              className='size-10 object-contain xsm:size-8'
            />
          ) : (
            <ImageV2
              alt=''
              width={40}
              height={40}
              src='/homepage/icon/QuestionMb.svg'
              className='size-10 object-contain xsm:size-8'
            />
          )}
        </div>
        <div
          onClick={() => setOpen(!open)}
          className='cursor-pointer xsm:flex-1 relative flex items-center space-x-3 p-5 pl-6 xsm:p-4 bg-white rounded-[1.25rem] w-full rounded-tl-none shadow-[0px_2px_7.3px_0px_rgba(0,39,97,0.06)]'
        >
          <p className='flex-1 text-[1.25rem] xsm:text-pc-sub12s font-semibold leading-[1.4] tracking-[-0.05rem] text-black'>
            {content}
          </p>
          <Plus
            className={cn(
              'size-6 stroke-black/80 cursor-pointer',
              open && 'transform rotate-45',
            )}
          />
          <Polygon className='absolute top-0 -left-6' />
        </div>
      </div>
      <div
        ref={refAnswer}
        className={cn(
          'flex space-x-2 items-end w-full mt-2 xsm:mt-[0.75rem] transition-all left-0 duration-500 relative',
          !open && 'left-[5rem]',
        )}
      >
        <div className='relative flex xsm:flex-1 items-center space-x-3 p-5 pl-6 bg-white rounded-[1.25rem] w-full rounded-br-none shadow-[0px_4px_19.3px_0px_rgba(0,39,97,0.06)]'>
          <div
            dangerouslySetInnerHTML={{__html: detail}}
            className='flex-1 text-pc-sub16 xsm:text-mb-12 text-black'
          ></div>
          <Polygon className='absolute bottom-0 -right-4 transform rotate-180' />
        </div>
        <div
          className={cn(
            'flex-center size-[4.125rem] xsm:size-12 bg-white rounded-full transform transition-all duration-500 rotate-0 xsm:shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)]',
            !open && '-rotate-180',
          )}
        >
          <ImageV2
            alt=''
            width={40}
            height={40}
            src='/homepage/icon/Mess.svg'
            className='size-10 object-contain xsm:size-8'
          />
        </div>
      </div>
    </div>
  )
}

export default FAQItem

const Polygon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='22'
      height='16'
      viewBox='0 0 22 16'
      fill='none'
      className={props.className}
      {...props}
    >
      <path
        d='M11 16L22 0H0L11 16Z'
        fill='white'
      />
    </svg>
  )
}
