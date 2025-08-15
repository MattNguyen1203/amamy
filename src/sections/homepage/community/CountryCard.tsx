'use client'
import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import Link from 'next/link'

const ArrowRightCircle = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1.75rem'
    height='1.75rem'
    viewBox='0 0 28 28'
    fill='none'
    className='size-[1.66669rem]'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M14 27.3334C21.3638 27.3334 27.3333 21.3639 27.3333 14.0001C27.3333 6.63629 21.3638 0.666748 14 0.666748C6.63616 0.666748 0.666626 6.63629 0.666626 14.0001C0.666626 21.3639 6.63616 27.3334 14 27.3334ZM16.0404 9.29297L20.0404 13.293C20.4309 13.6835 20.4309 14.3167 20.0404 14.7072L16.0404 18.7072C15.6499 19.0977 15.0167 19.0977 14.6262 18.7072C14.2357 18.3167 14.2357 17.6835 14.6262 17.293L16.9191 15.0001H8.66662C8.11434 15.0001 7.66662 14.5524 7.66662 14.0001C7.66662 13.4478 8.11434 13.0001 8.66662 13.0001H16.9191L14.6262 10.7072C14.2357 10.3167 14.2357 9.6835 14.6262 9.29297C15.0167 8.90245 15.6499 8.90245 16.0404 9.29297Z'
      fill='#BFD0E3'
      fillOpacity='0.6'
    />
  </svg>
)

const ArrowRightCircleHover = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1.75rem'
    height='1.75rem'
    viewBox='0 0 28 28'
    fill='none'
    className='size-[1.66669rem]'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M14 27.3334C21.3638 27.3334 27.3333 21.3639 27.3333 14.0001C27.3333 6.63629 21.3638 0.666748 14 0.666748C6.63616 0.666748 0.666626 6.63629 0.666626 14.0001C0.666626 21.3639 6.63616 27.3334 14 27.3334ZM16.0404 9.29297L20.0404 13.293C20.4309 13.6835 20.4309 14.3167 20.0404 14.7072L16.0404 18.7072C15.6499 19.0977 15.0167 19.0977 14.6262 18.7072C14.2357 18.3167 14.2357 17.6835 14.6262 17.293L16.9191 15.0001H8.66662C8.11434 15.0001 7.66662 14.5524 7.66662 14.0001C7.66662 13.4478 8.11434 13.0001 8.66662 13.0001H16.9191L14.6262 10.7072C14.2357 10.3167 14.2357 9.6835 14.6262 9.29297C15.0167 8.90245 15.6499 8.90245 16.0404 9.29297Z'
      fill='white'
    />
  </svg>
)

interface CountryCardProps {
  name: string
  icon: string
  href?: string
  className?: string
}

const CountryCard: React.FC<CountryCardProps> = ({
  name,
  icon,
  href,
  className,
}) => {
  return (
    <Link
      href={href || ''}
      className={cn(
        'relative w-[16.625rem] h-[11.25rem] overflow-hidden border-[1px] border-solid border-[#F2F2F2] bg-[#FFF] group cursor-pointer',
        className,
      )}
    >
      <ImageV2
        alt=''
        src={icon}
        width={300}
        height={300}
        className='w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out'
      />
      <div className='size-full relative z-10 p-5 pb-2 flex flex-col justify-between'>
        <p className='text-pc-heading20b text-black group-hover:text-white transition-all duration-500 ease-in-out '>
          {name}
        </p>
        <ArrowRightCircle />

        <div className='country-card h-12 px-4 w-full bg-Blue-Primary flex items-center justify-between absolute bottom-0 left-0 transform -translate-x-[101%] group-hover:translate-x-0  transition-all duration-700 ease-in-out'>
          <p className='text-pc-sub14s text-white'>TÌM HIỂM THÊM</p>
          <ArrowRightCircleHover />
        </div>
      </div>
    </Link>
  )
}

export default CountryCard
