'use client'

import React, {useState} from 'react'
import ICAngleRight from '@/components/icon/ICAngleRight'
import ContactContainer from './ContactContainer'
import FaqContainer from './FaqContainer'
import ServiceContainer from './ServiceContainer'

const faqs = [
  {
    question: 'Bảng giá gửi hàng qua Pháp?',
    answer: `2kg: 9,99euro/kg
    2,1kg-5kg: 9,49euro/kg
    5,1kg-10kg: 9,29euro/kg
    10,1kg-20kg: 8,79euro/kg
    20,1kg-200kg: 8,29euro/kg`,
  },
  {
    question: 'Thời gian vận chuyển trung bình là bao lâu?',
    answer: `Bạn có thể nhập mã vận đơn vào công cụ “Theo dõi đơn hàng” trên website để kiểm tra trạng thái đơn hàng của mình theo thời gian thực.`,
  },
  {
    question: 'Thời gian vận chuyển trung bình là bao lâu?',
    answer: `Bạn có thể nhập mã vận đơn vào công cụ “Theo dõi đơn hàng” trên website để kiểm tra trạng thái đơn hàng của mình theo thời gian thực.`,
  },
  {
    question: 'Thời gian vận chuyển trung bình là bao lâu?',
    answer: `Bạn có thể nhập mã vận đơn vào công cụ “Theo dõi đơn hàng” trên website để kiểm tra trạng thái đơn hàng của mình theo thời gian thực.`,
  },
  {
    question: 'Thời gian vận chuyển trung bình là bao lâu?',
    answer: `Bạn có thể nhập mã vận đơn vào công cụ “Theo dõi đơn hàng” trên website để kiểm tra trạng thái đơn hàng của mình theo thời gian thực.`,
  },
  {
    question: 'Thời gian vận chuyển trung bình là bao lâu?',
    answer: `Bạn có thể nhập mã vận đơn vào công cụ “Theo dõi đơn hàng” trên website để kiểm tra trạng thái đơn hàng của mình theo thời gian thực.`,
  },
]

const services = [
  {
    service: 'Từ Việt sang Mỹ',
    description: '',
  },
  {
    service: 'Từ Việt sang Úc',
    description: '',
  },
  {
    service: 'Từ Việt sang Canada',
    description: '',
  },
  {
    service: 'Từ Việt sang Séc',
    description: '',
  },
  {
    service: 'Từ Việt sang Châu Âu',
    description: '',
  },
  {
    service: 'Từ Việt sang Hàn Quốc',
    description: '',
  },
  {
    service: 'Từ Việt sang Đức',
    description: '',
  },
  {
    service: 'Từ Việt sang Nhật Bản',
    description: '',
  },
]

const FAQ = () => {
  const [open, setOpen] = useState(false)

  return (
    <section className='my-12 size-full px-[5.75rem] xsm:px-4'>
      <div className='w-full pb-8'>
        {/* Heading */}
        <h3 className='text-start text-[2.75rem] font-bold leading-[1.3] tracking-[-0.055rem] xsm:text-center xsm:text-[1.5rem] xsm:leading-[1.25rem]'>
          Câu hỏi thường gặp
        </h3>
      </div>

      <div className='grid grid-cols-12 items-stretch gap-8 xsm:my-6'>
        {/* FAQs */}
        <div className='col-span-8 flex h-full flex-col space-y-5 xsm:col-span-12'>
          {faqs.map((item, index) => (
            <div key={index}>
              <FaqContainer
                question={item.question}
                answer={item.answer}
              ></FaqContainer>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className='col-span-4 xsm:col-span-12'>
          {/* Desktop */}
          <div className='h-fit rounded-[1.5rem] border border-white bg-[#F4FBFF] px-10 py-8 xsm:hidden'>
            {services.map((item, index) => (
              <div
                key={index}
                className='border-b border-[#E3DBD8] last:border-b-0'
              >
                <ServiceContainer
                  service={item.service}
                  description={item.description}
                />
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className='h-fit w-full rounded-[1.5rem] border border-white bg-[#F4FBFF] sm:hidden xsm:px-6 xsm:py-2'>
            <button
              className='group flex w-full items-center justify-between py-5 hover:text-Blue-Primary'
              onClick={() => setOpen(!open)}
            >
              <p className='text-start text-[1.25rem] font-bold leading-[100%]'>
                Dịch vụ gửi hàng
              </p>
              <span>
                <ICAngleRight
                  className={`fill-black stroke-black ${open ? 'rotate-90' : ''} group-hover:fill-Blue-Primary group-hover:stroke-Blue-Primary`}
                />
              </span>
            </button>

            {open && (
              <div>
                {services.map((item, index) => (
                  <div
                    key={index}
                    className='border-b border-[#E3DBD8] last:border-b-0'
                  >
                    <ServiceContainer
                      service={item.service}
                      description={item.description}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact */}
          <div className='mt-5 rounded-[1.5rem] bg-[#F4FBFF]'>
            <ContactContainer />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
