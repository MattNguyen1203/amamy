'use client'
import React, {useState, useEffect} from 'react'
import ImageV2 from '../image/ImageV2'
import Link from 'next/link'
import ButtonCreateOrder from '../button/btn-create-order'

type Props = {}

const Header = (props: Props) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div
        className={`py-[0.625rem] px-[6rem] flex justify-between items-center fixed h-[72px] w-full z-[1000] transition-colors duration-300 xsm:hidden ${
          isScrolled ? 'bg-white text-black' : 'text-white'
        }`}
      >
        {/* <ImageV2 alt='logo' src={'/homepage/replace/logo.svg'} width={1000} height={1000} className='w-[6.89394rem] h-[1.836rem]' /> */}
        {!isScrolled ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='6.89394rem'
            height='1.836rem'
            viewBox='0 0 111 30'
            fill='none'
          >
            <path
              d='M106.516 7.36202H110.916L102.407 29.5558H98.0722L100.854 22.1794L94.5781 7.36202H98.9781L102.86 17.1325H102.893L106.516 7.36202Z'
              fill='white'
            />
            <path
              d='M88.5888 7.10283C92.0182 7.10283 94.1534 9.14103 94.1534 13.9615V23.1496H89.9152V14.9968C89.9152 12.4733 89.1388 10.8881 87.1653 10.8881C85.3859 10.8881 83.9301 12.4086 83.9301 15.2556V23.1496H79.6919V14.9968C79.6919 12.4733 78.8831 10.8881 76.9096 10.8881C75.0008 10.8881 73.5773 12.4086 73.5773 15.2556V23.1496H69.3391V7.36165H73.5773V9.46456H73.6096C74.839 7.91164 76.5537 7.10283 78.3331 7.10283C80.4036 7.10283 82.0536 7.87929 83.0242 9.62632H83.0889C84.383 7.97635 86.3241 7.10283 88.5888 7.10283Z'
              fill='white'
            />
            <path
              d='M62.2719 7.36165H66.4777V23.1496H62.466V21.2408H62.369C61.3014 22.632 59.6837 23.4085 57.6455 23.4085C53.278 23.4085 50.1074 20.1732 50.1074 15.288C50.1074 10.4998 53.3103 7.10283 57.5485 7.10283C59.4249 7.10283 61.0425 7.78223 62.1749 9.14104H62.2719V7.36165ZM58.422 19.6232C60.622 19.6232 62.4337 17.9085 62.4337 15.3203C62.4337 12.7969 60.7514 10.8881 58.4543 10.8881C56.1897 10.8881 54.3779 12.6027 54.3779 15.3203C54.3779 17.8762 56.0603 19.6232 58.422 19.6232Z'
              fill='white'
            />
            <path
              d='M42.6801 7.10283C46.1095 7.10283 48.2447 9.14103 48.2447 13.9615V23.1496H44.0066V14.9968C44.0066 12.4733 43.2301 10.8881 41.2566 10.8881C39.4772 10.8881 38.0214 12.4086 38.0214 15.2556V23.1496H33.7832V14.9968C33.7832 12.4733 32.9744 10.8881 31.0009 10.8881C29.0921 10.8881 27.6686 12.4086 27.6686 15.2556V23.1496H23.4304V7.36165H27.6686V9.46456H27.7009C28.9303 7.91164 30.645 7.10283 32.4244 7.10283C34.4949 7.10283 36.1449 7.87929 37.1155 9.62632H37.1802C38.4743 7.97635 40.4154 7.10283 42.6801 7.10283Z'
              fill='white'
            />
            <path
              d='M17.3074 23.1498L15.7545 18.5558H6.92225L5.36933 23.1498H0.613525L9.12221 0.179617H13.4898L22.0632 23.1498H17.3074ZM8.2487 14.6735H14.428L11.3545 5.64718H11.2898L8.2487 14.6735Z'
              fill='white'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='111'
            height='30'
            viewBox='0 0 111 30'
            fill='none'
          >
            <path
              d='M106.516 7.36201H110.916L102.407 29.5558H98.0717L100.854 22.1794L94.5776 7.36201H98.9776L102.86 17.1324H102.892L106.516 7.36201Z'
              fill='#38B6FF'
            />
            <path
              d='M88.5886 7.10283C92.0179 7.10283 94.1532 9.14103 94.1532 13.9615V23.1496H89.915V14.9968C89.915 12.4733 89.1385 10.8881 87.165 10.8881C85.3857 10.8881 83.9298 12.4086 83.9298 15.2556V23.1496H79.6916V14.9968C79.6916 12.4733 78.8828 10.8881 76.9093 10.8881C75.0005 10.8881 73.577 12.4086 73.577 15.2556V23.1496H69.3389V7.36165H73.577V9.46456H73.6094C74.8388 7.91164 76.5535 7.10283 78.3328 7.10283C80.4034 7.10283 82.0534 7.87929 83.0239 9.62632H83.0886C84.3827 7.97634 86.3239 7.10283 88.5886 7.10283Z'
              fill='#38B6FF'
            />
            <path
              d='M62.2719 7.36165H66.4777V23.1496H62.466V21.2408H62.369C61.3014 22.632 59.6837 23.4084 57.6455 23.4084C53.278 23.4084 50.1074 20.1732 50.1074 15.288C50.1074 10.4998 53.3103 7.10283 57.5485 7.10283C59.4249 7.10283 61.0425 7.78223 62.1749 9.14103H62.2719V7.36165ZM58.422 19.6232C60.622 19.6232 62.4337 17.9085 62.4337 15.3203C62.4337 12.7969 60.7514 10.8881 58.4543 10.8881C56.1897 10.8881 54.3779 12.6027 54.3779 15.3203C54.3779 17.8762 56.0603 19.6232 58.422 19.6232Z'
              fill='#38B6FF'
            />
            <path
              d='M42.6799 7.10283C46.1092 7.10283 48.2445 9.14103 48.2445 13.9615V23.1496H44.0063V14.9968C44.0063 12.4733 43.2299 10.8881 41.2564 10.8881C39.477 10.8881 38.0211 12.4086 38.0211 15.2556V23.1496H33.783V14.9968C33.783 12.4733 32.9741 10.8881 31.0006 10.8881C29.0919 10.8881 27.6683 12.4086 27.6683 15.2556V23.1496H23.4302V7.36165H27.6683V9.46456H27.7007C28.9301 7.91164 30.6448 7.10283 32.4241 7.10283C34.4947 7.10283 36.1447 7.87929 37.1153 9.62632H37.18C38.4741 7.97634 40.4152 7.10283 42.6799 7.10283Z'
              fill='#38B6FF'
            />
            <path
              d='M17.3071 23.1498L15.7542 18.5558H6.922L5.36909 23.1498H0.613281L9.12197 0.179611H13.4895L22.0629 23.1498H17.3071ZM8.24845 14.6735H14.4278L11.3543 5.64717H11.2896L8.24845 14.6735Z'
              fill='#38B6FF'
            />
          </svg>
        )}
        <div className='flex justify-between gap-8 items-center'>
          {headerRouterList.map((item) => (
            <Link
              key={item.id}
              className='text-[1rem] not-italic font-semibold leading-[150%]'
              href={item.link}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className='flex items-center min-w-[16.425rem] gap-[1rem] h-full'>
          <div className='w-[2.5rem] h-full flex'>
            {!isScrolled ? (
              <ImageV2
                alt='Search'
                src={'/homepage/icon/searchIcon.svg'}
                width={1000}
                height={1000}
                className='w-[1.28175rem] my-auto h-[1.28175rem] gap-2'
              />
            ) : (
              <svg
                className='w-[1.28175rem] my-auto h-[1.28175rem] gap-2'
                xmlns='http://www.w3.org/2000/svg'
                width='19'
                height='19'
                viewBox='0 0 19 19'
                fill='none'
              >
                <path
                  d='M9.05602 16.2694C13.0388 16.2694 16.2676 13.0407 16.2676 9.05785C16.2676 5.07503 13.0388 1.84631 9.05602 1.84631C5.0732 1.84631 1.84448 5.07503 1.84448 9.05785C1.84448 13.0407 5.0732 16.2694 9.05602 16.2694Z'
                  stroke='#091E36'
                  stroke-width='1.92308'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M14.3445 14.3463L17.2291 17.2309'
                  stroke='#091E36'
                  stroke-width='1.92308'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            )}
          </div>
          <ButtonCreateOrder>
            <span className={`${'text-white'}`}>Tạo đơn hàng</span>
          </ButtonCreateOrder>
        </div>
      </div>
      <div className='h-[3.5rem] items-center justify-between hidden xsm:flex'>
        <div className=' w-[5.625rem]'></div>
        <div className='w-[5.625rem]'>
          <svg
            className='w-[1.28175rem] my-auto h-[1.28175rem] gap-2'
            xmlns='http://www.w3.org/2000/svg'
            width='19'
            height='19'
            viewBox='0 0 19 19'
            fill='none'
          >
            <path
              d='M9.05602 16.2694C13.0388 16.2694 16.2676 13.0407 16.2676 9.05785C16.2676 5.07503 13.0388 1.84631 9.05602 1.84631C5.0732 1.84631 1.84448 5.07503 1.84448 9.05785C1.84448 13.0407 5.0732 16.2694 9.05602 16.2694Z'
              stroke='#091E36'
              stroke-width='1.92308'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M14.3445 14.3463L17.2291 17.2309'
              stroke='#091E36'
              stroke-width='1.92308'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </div>
      </div>
    </>
  )
}

export default Header

const headerRouterList = [
  {
    id: 1,
    name: 'Theo dõi vận đơn',
    link: '/',
  },
  {
    id: 2,
    name: 'Về Amamy',
    link: '/',
  },
  {
    id: 3,
    name: 'Dịch vụ',
    link: '/',
  },
  {
    id: 4,
    name: 'Hữu ích cho gửi hàng',
    link: '/',
  },
]
