'use client'

import ICPhoneCall from '@/components/icon/ICPhoneCall'
import { IImage } from '@/utils/type'
import Image from 'next/image'
import { useRef } from 'react'

export interface IReason {
  reasonsData: {
    title: string
    description: string
    services: IService[]
  }
}

export interface IService {
  thumbnail: IImage
  title: string
  content: string
}

const Reason = ({ reasonsData }: IReason) => {
  const containerGalleryRef = useRef<HTMLDivElement>(null)
  const contentGalleryRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   // Only run on client side to prevent hydration mismatch
  //   if (typeof window === 'undefined') return
  //   if (!containerGalleryRef.current || !contentGalleryRef.current || !isMobile)
  //     return

  //   const draggable = Draggable.create(contentGalleryRef.current, {
  //     type: 'x',
  //     bounds: containerGalleryRef.current,
  //     inertia: true,
  //     cursor: 'grab',
  //     activeCursor: 'grabbing',
  //   })

  //   return () => {
  //     draggable[0].kill()
  //   }
  // }, [isMobile])

  // useGSAP(() => {
  //   // Only run on client side to prevent hydration mismatch
  //   if (typeof window === 'undefined') return
  //   gsap.from('.fade-in-reason', {
  //     scrollTrigger: {
  //       trigger: '.fade-in-reason',
  //       start: 'top bottom',
  //     },
  //     opacity: 0,
  //     y: 50,
  //     duration: 1,
  //     stagger: 0.2,
  //   })
  // }, [])

  return (
    <div className='flex w-full gap-[3.125rem] bg-[#F9FDFF] px-[6rem] py-[5rem] xsm:flex-col xsm:gap-[1.5rem] xsm:px-0 xsm:py-[2.5rem]'>
      {/* left */}
      <div className='xsm:px-[1rem] flex h-[24.5625rem] w-[23.125rem] shrink-0 flex-col items-start justify-between xsm:h-full xsm:w-full'>
        <div className='flex flex-col items-start gap-[1.25rem] self-stretch xsm:gap-[0.625rem]'>
          <p className='self-stretch font-montserrat text-[2.625rem] font-bold not-italic leading-[3.4125rem] tracking-[-0.105rem] text-[rgba(0,0,0,0.92)] xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[-0.05rem]'>
            {reasonsData?.title}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: reasonsData?.description || '' }}
            className='w-[18.24513rem] font-montserrat text-[1rem] font-medium not-italic leading-[1.5rem] tracking-[-0.03rem] text-[rgba(0,0,0,0.80)] xsm:w-full xsm:text-[0.8125rem] xsm:leading-[1.21875rem] xsm:tracking-[-0.02438rem]'
          ></div>
        </div>

        <button className='flex items-center justify-center gap-[0.5rem] rounded-[1.75rem] bg-Blue-Primary py-[0.75rem] pl-[0.75rem] pr-[1.5rem] xsm:hidden'>
          <span className='flex size-[2.25rem] items-center justify-center rounded-[72.58063rem] bg-white'>
            <ICPhoneCall className='size-[1.45163rem] fill-Blue-Primary' />
          </span>
          <p className='font-montserrat text-[1.375rem] font-semibold not-italic leading-[1.7875rem] tracking-[-0.04125rem] text-white'>
            0926.777.966
          </p>
        </button>
      </div>

      {/* right */}
      <div ref={containerGalleryRef}>
        <div
          ref={contentGalleryRef}
          className='grid grid-cols-3 gap-x-[1.75rem] xsm:flex xsm:flex-row xsm:overflow-x-auto hidden_scroll xsm:gap-x-[1rem]'
        >
          {reasonsData?.services?.map((item, index) => (
            <div
              key={index}
              className='flex w-full flex-col gap-[1.5rem] xsm:w-[13.9375rem] xsm:shrink-0 xsm:first:ml-[1rem] xsm:last:mr-[1rem]'
            >
              <div className='relative aspect-[310.67/393.35] w-full overflow-hidden rounded-[2.5rem] xsm:aspect-[223/282] xsm:rounded-[1.25rem]'>
                <Image
                  src={item.thumbnail.url || ''}
                  alt={item.thumbnail.alt || item.title || 'Service image'}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='object-cover'
                />
              </div>

              <div className='flex flex-col gap-[0.625rem] self-stretch xsm:gap-[0.5rem]'>
                <p className='font-montserrat text-[1.5rem] font-bold not-italic leading-[1.95rem] tracking-[-0.045rem] text-Blue-Primary xsm:text-[1.125rem] xsm:leading-[1.35rem]'>
                  {item.title}
                </p>
                <p className='font-montserrat text-[1rem] font-medium not-italic leading-[1.5rem] tracking-[-0.03rem] text-[rgba(0,0,0,0.80)] xsm:text-[0.875rem] xsm:leading-[1.3125rem] xsm:tracking-[-0.02625rem]'>
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* hotline mb */}
      <button className='hidden w-fit items-center justify-center gap-[0.5rem] rounded-[1.75rem] xsm:ml-4 bg-Blue-Primary py-[0.75rem] pl-[0.75rem] pr-[1.5rem] xsm:flex xsm:rounded-[1.375rem] xsm:py-[0.5rem] xsm:pl-[0.5rem] xsm:pr-[1.5rem]'>
        <span className='flex size-[2rem] items-center justify-center rounded-[64.51613rem] bg-white'>
          <ICPhoneCall className='size-[1.00806rem]' />
        </span>

        <p className='font-montserrat text-[1.375rem] font-semibold not-italic leading-[1.7875rem] tracking-[-0.04125rem] text-white'>
          0926.777.966
        </p>
      </button>
    </div>
  )
}

export default Reason
