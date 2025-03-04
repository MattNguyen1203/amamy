'use client'
import Image from 'next/image'
import SectionServiceFeature from './SectionServiceFeature'
import CoreValueCard from './CoreValueCard'

const QuantitySection = () => {
  return (
    <div className='relative mb-[15rem]'>
      <div className='w-full flex xsm:flex-col '>
        <div className='w-[27.5rem] h-[62.9375rem] bg-background-elevation5 shadow-[0px_14px_24px_#0004500a] xsm:hidden'>
          <div className='h-[535px] top-[12.5rem] left-[5.9375rem] relative w-[18.5625rem]'>
            <div className='flex flex-col items-start gap-[1.06rem] relative '>
              <p className='text-[2.875rem] not-italic font-bold leading-[120%]'>
                Lorem ipsum dolor sit amet
              </p>
              <p className='text-[1rem] not-italic font-medium leading-[150%] w-[18.24512rem]'>
                Lorem ipsum dolor sit amet
              </p>
            </div>
          </div>
        </div>
        <div className='hidden xsm:block'>
          <div className='flex flex-col items-start gap-[.5rem] relative mx-[1rem]'>
            <p className='text-[1.25rem] not-italic font-bold leading-[120%]'>
              Lorem ipsum dolor sit amet
            </p>
            <p className='text-[0.875rem] not-italic font-medium leading-[150%]'>
              Lorem ipsum dolor sit amet
            </p>
          </div>
        </div>

        <div className=' flex-1 flex gap-[2.5rem] pt-[7.315rem] bg-[#C1E8FF] pl-[6rem] relative xsm:bg-transparent xsm:pt-[1rem] xsm:pl-[1rem] xsm:w-screen xsm:overflow-x-scroll'>
          <Image
            src={'/homepage/icon/Isolation_Mode.png'}
            alt='background-image'
            className='absolute inset-0 left-[20] z-[-1] bottom-0 w-[89.4375rem] h-[35.50475rem] flex-shrink-0 xsm:w-0 xsm:h-fit'
            width={1000}
            height={1000}
          />

          <div className='rounded-[1.25rem] w-[29.25rem] flex flex-col h-[34.5625rem] rounded-br-[var(--8,] rounded-tr-[0.5rem)] rounded-bl-[0.5rem)] [box-shadow:0px_4px_23.7px_0px_rgba(0,_0,_0,_0.00)] group xsm:w-[17.5rem] xsm:h-[13.875rem] xsm:min-w-max'>
            <CoreValueCard
              imageSrc="/about/about2.webp"
              imageAlt="Amamy delivery driver with package"
              label="Giá trị cốt lõi"
              title="Mang lại những gì tốt nhất cho khách hàng"
              description="Ở Amamy, mỗi một quyết định về giá cả, chính sách đều được đặt câu hỏi về sự cần thiết và liệu đã mang lại lợi ích tối đa cho khách hàng. Chúng tôi đặt khách hàng làm trung tâm và hiểu rằng sự tin cậy và hài lòng của khách hàng chính là chìa khóa để Amamy thành công."
            />
          </div>
          
          <div className='rounded-[1.25rem] w-[29.25rem] flex flex-col h-[34.5625rem] rounded-br-[var(--8,] rounded-tr-[0.5rem)] rounded-bl-[0.5rem)] [box-shadow:0px_4px_23.7px_0px_rgba(0,_0,_0,_0.00)] group xsm:w-[17.5rem] xsm:h-[13.875rem] xsm:min-w-max'>
            <CoreValueCard
              imageSrc="/about/about1.webp"
              imageAlt="Amamy delivery driver with package"
              label="Tầm nhìn - Sứ mệnh"
              title="Tiên phong áp dụng công nghệ tối ưu hóa trải nghiệm khách hàng"
              description="Amamy mong muốn đứng đầu ngành dịch vụ vận chuyển quốc tế cho người Việt tại nước ngoài. Amamy hướng đến những yếu tố dẫn đầu trong ngành mang tính công nghệ tối ưu hóa trải nghiệm khách hàng. Với những ví dụ cụ thể như tính năng thông báo mã đơn hàng tự động qua email và hệ thống tracking theo dõi hàng hóa trực tiếp trên website."
            />
          </div>
        </div>
      </div>
      <div className='absolute bottom-[-15rem] rounded-[20px] bg-white'>
        <SectionServiceFeature />
      </div>
    </div>
  )
}

export default QuantitySection
