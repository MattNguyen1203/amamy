'use client'

import ImageV2 from '@/components/image/ImageV2'
import Plus from '@/components/svg/Plus'
import {cn} from '@/lib/utils'
import {useEffect, useRef, useState} from 'react'

const FAQItem = ({content, detail}: {content: string; detail: string}) => {
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
        'w-full relative transition-all duration-100 overflow-hidden',
      )}
      style={{height: open ? `${heightQ + heightA + 8}px` : `${heightQ}px`}}
    >
      <div
        ref={refQuestion}
        className='flex space-x-2 items-start w-full'
      >
        <div className='flex-center size-[4.125rem] xsm:size-12 bg-white rounded-full'>
          <ImageV2
            alt=''
            width={40}
            height={40}
            src='/homepage/icon/Question.svg'
            className='size-10 object-contain xsm:size-8'
          />
        </div>
        <div
          onClick={() => setOpen(!open)}
          className='cursor-pointer relative flex items-center space-x-3 p-5 pl-6 xsm:p-4 bg-white rounded-[1.25rem] w-full rounded-tl-none'
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
          'flex space-x-2 items-end w-full mt-2 transition-all left-0 duration-500 relative',
          !open && 'left-[5rem]',
        )}
      >
        <div className='relative flex items-center space-x-3 p-5 pl-6 bg-white rounded-[1.25rem] w-full rounded-br-none'>
          <div
            dangerouslySetInnerHTML={{__html: detail}}
            className='flex-1 text-pc-sub16 xsm:text-mb-12 text-black'
          ></div>
          <Polygon className='absolute bottom-0 -right-4 transform rotate-180' />
        </div>
        <div
          className={cn(
            'flex-center size-[4.125rem] xsm:size-12 bg-white rounded-full transform transition-all duration-500 rotate-0',
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
