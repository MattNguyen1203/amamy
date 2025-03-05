import Image from 'next/image'
interface Prop {
  year: string
  title: string
  className?: string
}
export default function EventCard({year, title, className}: Prop) {
  return (
    <div className={className}>
      <div className='w-full h-full'>
        <div className='relative rounded-3xl w-full h-full p-8 aspect-square overflow-hidden'>
          <Image
            src='/about/timeline-card.svg'
            alt='Event background'
            fill
            className='object-cover z-0 w-full h-full'
          />
          <div className='relative z-10 p-[1rem] flex flex-col h-full'>
            <div className='flex items-start space-x-3'>
              {/* Logo A */}
              <div className='w-[5.25rem] h-[4.5rem]'>
                <Image
                  src='/about/timeline-logo.svg'
                  alt='timeline logo'
                  width={84}
                  height={72}
                  className='w-[5.25rem] h-[4.5rem]'
                />
              </div>

              <div className='text-white'>
                <div className='text-white font-montserrat font-semibold text-[1.25rem] leading-[1.75rem] tracking-[-0.04em]'>
                  cột mốc năm
                </div>

                <div className='font-montserrat font-bold text-[2.5rem] leading-[3.25rem] tracking-[-0.03em]'>
                  {year}
                </div>
              </div>
            </div>

            {/* Bottom text */}
            <div className='mt-auto'>
              <div className='text-white font-montserrat font-bold text-[2rem] leading-[2.6rem] tracking-[-0.03em]'>
                {title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
