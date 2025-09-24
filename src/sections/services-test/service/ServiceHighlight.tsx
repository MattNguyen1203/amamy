import ICArrowCircle from '@/components/icon/ICArrowCircle'
import Image from 'next/image'
import Link from 'next/link'

const ServiceHighlight = ({
  icon,
  label,
  desc,
  link,
}: {
  icon: string
  label: string
  desc: string
  link: string
}) => {
  return (
    <div
      className='flex flex-col min-h-[19.9375rem] w-fit rounded-[1.5rem] xsm:rounded-[0.8955rem] p-[0_1.75rem_0_1.81rem] flex-1 xsm:flex-shrink-0 xsm:mr-[0.75rem] xsm:first:ml-[1rem] xsm:min-h-[11.903rem] xsm:p-[0_0.67rem_0_1.08rem] xsm:w-[17.5rem] xsm:min-w-auto xsm:max-w-[17.5rem]'
      style={{
        background: 'linear-gradient(247deg, #73C1FF 2.69%, #38B6FF 100%)',
      }}
    >
      <div className='flex items-start justify-between mt-[0.75rem] xsm:mt-[0.45rem]'>
        {/* Content Container */}
        <div className='flex flex-col gap-y-[0.81rem] text-white mt-[1.12rem] flex-1 xsm:mt-[0.67rem]'>
          <p className='min-w-[13rem] text-[1.5rem] font-bold leading-[150%] tracking-[-0.045rem] mr-[1.75rem] xsm:text-[0.8955rem] xsm:min-w-full'>
            {label}
          </p>
          <p className='max-w-[13rem] text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] xsm:text-[0.52238rem] xsm:leading-[0.78356rem] xsm:tracking-[-0.01569rem] '>
            {desc}
          </p>
        </div>
        {/* Image Container */}
        <div className='w-[12.125rem] xsm:w-[7.23881rem]'>
          <Image
            src={icon}
            alt={label || 'Service highlight icon'}
            width={173}
            height={173}
            className='w-full h-auto'
          />
        </div>
      </div>

      <Link
        href={link || '#'}
        className='mt-auto mb-[1.37rem] flex h-[3.125rem] items-center justify-between rounded-[1.25rem] bg-white px-[0.94rem] py-[0.54rem]'
      >
        <p className='text-[1.375rem] font-bold leading-[2.0625rem] tracking-[-0.04125rem] text-Blue-Primary xsm:text-[0.82088rem] xsm:leading-[1.23131rem] xsm:tracking-[-0.02463rem]'>
          Đóng gói chuẩn quốc tế
        </p>
        <ICArrowCircle className='size-[2rem] rotate-90 fill-Blue-Primary xsm:size-[1.194rem]' />
      </Link>
    </div>
  )
}

export default ServiceHighlight
