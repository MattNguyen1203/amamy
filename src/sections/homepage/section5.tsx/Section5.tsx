import {IFaq, IFaqs} from '@/utils/type'
import Image from 'next/image'

type Props = {
  faq: IFaq
  faqs: IFaqs[]
}

const Section5 = ({faq, faqs}: Props) => {
  return (
    <section
      className='flex relative flex-row w-[100rem]  xsm:w-[100vw] p-24 items-start justify-between overflow-hidden gap-2.5 self-stretch 
    rounded-tl-[3rem] rounded-br-[0rem] rounded-tr-[3rem] rounded-bl-[0rem] bg-[#ffffff91] xsm:flex-col xsm:p-[1rem]'
    >
      <h2 className='text-[2.875rem] not-italic font-bold leading-[120%] max-w-[26.625rem] xsm:text-[1.375rem] xsm:mb-[1rem] xsm:mt-[2.5rem]'>
        {faq.title}
      </h2>
      <Image
        src={'/homepage/icon/section-4-background.png'}
        alt=''
        width={1000}
        height={1000}
        className=' w-[66.25794rem] h-[33.91225rem] 
        rotate-[2.828deg] absolute left-[-6rem] -bottom-[2rem] overflow-hidden xsm:hidden'
      />
      <div className='flex flex-col gap-[1.5rem] static '>
        {Array.isArray(faqs) &&
          faqs?.map((item, index) => (
            <ItemContent
              key={index}
              index={index}
              content={item.question}
              detail={item.answer}
            />
          ))}
      </div>
    </section>
  )
}

export default Section5

const ItemContent = ({
  content,
  detail,
  index,
}: {
  content: string
  detail: string
  index: number
}) => {
  return (
    <div className='flex flex-col'>
      {/* Checkbox ẩn để toggle hiển thị nội dung */}
      <input
        type='checkbox'
        id={`toggle-detail${index}`}
        className='hidden peer'
      />

      {/* Div trên - Click để mở div dưới */}
      <label
        htmlFor={`toggle-detail${index}`}
        className='flex items-start gap-[0.4rem] h-full cursor-pointer'
      >
        <i className='rounded-full bg-[#FFF] h-full w-auto p-[0.8125rem]'>
          <QuestionIcon />
        </i>
        <div className='bg-[#FFF] relative w-[46.25rem] xsm:w-[17.9375rem] rounded-tl-[0rem] rounded-br-[1.25rem] rounded-tr-[1.25rem] rounded-bl-[1.25rem] pl-6 pr-5 py-5 items-start gap-6 h-full'>
          <i className='absolute top-0 left-0 w-fit z-[0] -translate-x-1/2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='22'
              height='16'
              viewBox='0 0 22 16'
              fill='none'
            >
              <path
                d='M11 16L22 0H0L11 16Z'
                fill='white'
              />
            </svg>
          </i>
          <p className='xsm:text-[0.75rem] xsm:font-semibold'>{content}</p>
        </div>
      </label>

      {/* Div dưới - Hiển thị khi checkbox được check */}
      <div className='max-h-0 overflow-hidden opacity-0 transition-all duration-300 peer-checked:max-h-[500px] peer-checked:opacity-100'>
        <div className='flex items-start gap-[0.4rem] h-full mt-[0.5rem]'>
          <div className='bg-[#FFF] relative w-[46.25rem]  xsm:w-[17.9375rem] rounded-tl-[1.25rem] rounded-tr-[1.25rem] rounded-bl-[1.25rem] pl-6 pr-5 py-5 items-start gap-6 h-full'>
            <i className='absolute bottom-0 right-0 w-fit rotate-180 z-[0] translate-x-1/2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='22'
                height='16'
                viewBox='0 0 22 16'
                fill='none'
              >
                <path
                  d='M11 16L22 0H0L11 16Z'
                  fill='white'
                />
              </svg>
            </i>
            <p dangerouslySetInnerHTML={{__html: detail}}></p>
          </div>
          <i className='rounded-full bg-[#FFF] h-full w-auto p-[0.8125rem]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='40'
              height='40'
              viewBox='0 0 40 40'
              fill='none'
            >
              <path
                d='M5.00005 19.1667C4.99431 21.3665 5.50827 23.5365 6.50005 25.5C7.67599 27.853 9.4838 29.832 11.721 31.2155C13.9581 32.599 16.5363 33.3324 19.1667 33.3334C21.3665 33.3391 23.5365 32.8252 25.5 31.8334L35 35L31.8334 25.5C32.8252 23.5365 33.3391 21.3665 33.3334 19.1667C33.3324 16.5363 32.599 13.9581 31.2155 11.721C29.832 9.4838 27.853 7.67599 25.5 6.50005C23.5365 5.50827 21.3665 4.99431 19.1667 5.00005H18.3334C14.8595 5.1917 11.5783 6.65798 9.11815 9.11815C6.65798 11.5783 5.1917 14.8595 5.00005 18.3334V19.1667Z'
                fill='#38B6FF'
              />
            </svg>
          </i>
        </div>
      </div>
    </div>
  )
}

const QuestionIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'
    >
      <path
        d='M20.0001 34.6252C19.4463 34.6252 18.9049 34.461 18.4444 34.1533C17.9839 33.8456 17.625 33.4083 17.4131 32.8966C17.2011 32.385 17.1457 31.8219 17.2537 31.2787C17.3618 30.7355 17.6285 30.2366 18.0201 29.845C18.4117 29.4534 18.9106 29.1867 19.4538 29.0786C19.997 28.9706 20.56 29.026 21.0717 29.238C21.5834 29.4499 22.0207 29.8088 22.3284 30.2693C22.6361 30.7298 22.8003 31.2712 22.8003 31.825C22.8003 32.5677 22.5053 33.2799 21.9802 33.8051C21.455 34.3302 20.7428 34.6252 20.0001 34.6252ZM21.8668 23.2165V23.4254C21.8668 23.9206 21.6701 24.3954 21.32 24.7455C20.9699 25.0956 20.4951 25.2923 20 25.2923C19.5049 25.2923 19.0301 25.0956 18.68 24.7455C18.3299 24.3954 18.1332 23.9206 18.1332 23.4254V21.5586C18.1332 21.0635 18.3299 20.5887 18.68 20.2386C19.0301 19.8885 19.5049 19.6919 20 19.6918C20.9231 19.6918 21.8254 19.4181 22.5929 18.9053C23.3604 18.3925 23.9585 17.6636 24.3118 16.8108C24.665 15.958 24.7574 15.0196 24.5774 14.1143C24.3973 13.209 23.9528 12.3774 23.3001 11.7247C22.6474 11.072 21.8158 10.6275 20.9105 10.4475C20.0052 10.2674 19.0668 10.3598 18.214 10.713C17.3612 11.0663 16.6323 11.6645 16.1195 12.432C15.6067 13.1994 15.333 14.1018 15.333 15.0248C15.333 15.5199 15.1363 15.9947 14.7862 16.3448C14.4361 16.6949 13.9613 16.8916 13.4662 16.8916C12.9711 16.8916 12.4962 16.6949 12.1461 16.3448C11.796 15.9947 11.5994 15.5199 11.5994 15.0248C11.5996 13.4434 12.0461 11.8943 12.8877 10.5554C13.7292 9.21656 14.9315 8.14242 16.3564 7.45654C17.7813 6.77066 19.3708 6.50089 20.9422 6.67825C22.5136 6.85562 24.003 7.47291 25.2391 8.45914C26.4753 9.44537 27.408 10.7605 27.9299 12.2532C28.4518 13.746 28.5418 15.3557 28.1895 16.8974C27.8372 18.439 27.057 19.8499 25.9385 20.9677C24.82 22.0856 23.4086 22.8651 21.8668 23.2165Z'
        fill='#38B6FF'
      />
    </svg>
  )
}
