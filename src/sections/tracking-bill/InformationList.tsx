import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import {IProgress} from '@/sections/tracking-bill/OrderInformation'

const InformationItem = ({day, title, desc}: IProgress) => {
  return (
    <div className='text-pc-14 xsm:text-mb-12'>
      <div className='flex items-center'>
        <p className='text-black/60 xsm:font-medium'>{day}</p>
        <div className='size-2 rounded-full bg-[#38B6FF] ml-4 mr-3' />
        <p className='font-semibold text-black'>{title}</p>
      </div>
      <div
        className='mt-2 *:text-black *:text-pc-14 [&_strong]:text-pc-sub14s'
        dangerouslySetInnerHTML={{__html: desc}}
      ></div>
    </div>
  )
}

type InformationListProps = {
  data: IProgress[]
}

const InformationList = ({data}: InformationListProps) => {
  return (
    <div className='flex flex-col space-y-10 xsm:space-y-6'>
      {Array.isArray(data) &&
        data?.map((item: IProgress, index: number) => (
          <div
            key={index}
            className='flex items-start relative'
          >
            <div
              className={cn(
                'w-[0.125rem] h-[calc(100%+2.5rem)] xsm:h-[calc(100%+1.5rem)] absolute top-[1rem] left-[0.675rem] xsm:left-[0.575rem] bg-[#DCDFE4]',
                index === data.length - 1 && 'hidden',
              )}
            ></div>
            <ImageV2
              src={
                index === 0
                  ? '/tracking-bill/icon-tick-1.svg'
                  : '/tracking-bill/icon-tick-2.svg'
              }
              width={40}
              height={40}
              alt=''
              className='mr-6 xsm:mr-3 size-6 xsm:size-5 object-contain relative z-10'
            />
            <InformationItem
              key={index}
              {...item}
            />
          </div>
        ))}
    </div>
  )
}

export default InformationList
