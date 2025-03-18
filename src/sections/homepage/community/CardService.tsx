import ImageV2 from '@/components/image/ImageV2'
import Link from 'next/link'

type CardServiceProps = {
  flag: string
  title: string
  header?: string
  subtitle: string
  list_des: {description: string}[]
  href?: string
}

export const ArrowIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      className='size-8'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.0001 27.3334C21.3639 27.3334 27.3334 21.3639 27.3334 14.0001C27.3334 6.63629 21.3639 0.666748 14.0001 0.666748C6.63629 0.666748 0.666748 6.63629 0.666748 14.0001C0.666748 21.3639 6.63629 27.3334 14.0001 27.3334ZM16.0405 9.29297L20.0405 13.293C20.431 13.6835 20.431 14.3167 20.0405 14.7072L16.0405 18.7072C15.65 19.0977 15.0168 19.0977 14.6263 18.7072C14.2358 18.3167 14.2358 17.6835 14.6263 17.293L16.9192 15.0001H8.66674C8.11446 15.0001 7.66674 14.5524 7.66674 14.0001C7.66674 13.4478 8.11446 13.0001 8.66674 13.0001H16.9192L14.6263 10.7072C14.2358 10.3167 14.2358 9.6835 14.6263 9.29297C15.0168 8.90245 15.65 8.90245 16.0405 9.29297Z'
        fill='#38B6FF'
      />
    </svg>
  )
}

const StartIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.25rem'
      height='1.25rem'
      viewBox='0 0 20 21'
      fill='none'
    >
      <rect
        x='2'
        y='2.31055'
        width='16'
        height='16'
        rx='8'
        fill='#D9F1FF'
      />
      <path
        d='M9.07214 5.61902C9.4082 4.78294 10.5918 4.78294 10.9279 5.61902L11.6667 7.4572C11.8056 7.80278 12.125 8.04253 12.4957 8.07936L14.4709 8.27564C15.3248 8.36049 15.6822 9.41078 15.0574 9.99892L13.4711 11.4919C13.2173 11.7309 13.1062 12.0848 13.178 12.426L13.6255 14.5534C13.8077 15.4198 12.8571 16.0782 12.1101 15.603L10.5368 14.602C10.2093 14.3937 9.79074 14.3937 9.46322 14.602L7.88989 15.603C7.14286 16.0782 6.19227 15.4198 6.37453 14.5534L6.82205 12.426C6.89382 12.0848 6.78272 11.7309 6.52885 11.4919L4.94263 9.99892C4.31777 9.41078 4.67522 8.36049 5.52913 8.27564L7.50434 8.07936C7.87497 8.04253 8.19442 7.80278 8.33332 7.4572L9.07214 5.61902Z'
        fill='#38B6FF'
      />
    </svg>
  )
}

const FbIcon = () => {
  return (
    <ImageV2
      alt=''
      width={40}
      height={40}
      src='/homepage/icon-fb.webp'
      className='size-6 xsm:size-8'
    />
  )
}

const CardService = ({
  flag,
  list_des,
  subtitle,
  title,
  href,
  header,
}: CardServiceProps) => {
  return (
    <Link
      href={href || ''}
      className='overflow-hidden group w-[20rem] h-[23.0625rem] flex flex-col rounded-[1.25rem] bg-white shadow-[0px_4px_23.7px_0px_rgba(0,0,0,0.00)]'
    >
      <ImageV2
        src={flag}
        className='w-[3.7285rem] h-[2.36144rem] mt-6 ml-6 xsm:w-[3.125rem] xsm:h-[2rem]'
        alt=''
        width={100}
        height={60}
      />

      <div className='mx-6 flex-1 overflow-hidden'>
        <div className='h-[200%] group-hover:transform group-hover:-translate-y-1/2 transition-all duration-300'>
          <div className='h-1/2'>
            {header ? (
              <div className='mt-[1.75rem] text-black'>
                <h2 className='text-[1rem] font-semibold leading-[1.3] tracking-[-0.02rem]'>
                  {header}
                </h2>
                <p className='text-[1.25rem] font-bold leading-[1.3] tracking-[-0.025rem]'>
                  {title}
                </p>
              </div>
            ) : (
              <h2 className='text-[2.875rem] not-italic font-bold leading-[120%] mt-[1.75rem] xsm:text-[1.75rem]'>
                {title}
              </h2>
            )}
            <p className='text-[0.875rem] not-italic font-semibold leading-[150%] mt-2'>
              {subtitle}
            </p>
          </div>
          <div className='h-1/2 flex flex-col space-y-1'>
            {list_des.map((item, index) => (
              <div
                key={index}
                className='flex  gap-[0.25rem] '
              >
                <div className='flex-shrink-0 w-[1.25rem] h-[1.25rem]'>
                  <StartIcon />
                </div>
                <p className='font-montserrat text-[0.875rem] not-italic font-medium leading-[150%]'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='w-full h-[8rem] flex flex-col space-y-5 justify-between transform translate-y-[4.8rem] group-hover:translate-y-0 transition-all duration-300'>
        <div className='flex items-center space-x-3 w-full px-4'>
          <ArrowIcon />
          <p className='text-[0.875rem] not-italic font-semibold leading-[140%]'>
            Tham gia cộng đồng ngay
          </p>
        </div>

        <div className='bg-[#60C5FF] text-white flex-col flex flex-1 w-full px-6 justify-center'>
          <div className='flex gap-[0.38rem] items-center'>
            <FbIcon />
            <p className='text-[0.75rem] font-extrabold leading-[110%] uppercase'>
              Tham gia Group
            </p>
          </div>
          <p className='mt-[0.375rem] text-[0.875rem] font-semibold leading-[140%]'>
            Amamy gửi hàng an toàn
          </p>
        </div>
      </div>
    </Link>
  )
}

export const CardServiceMB = ({
  flag,
  list_des,
  subtitle,
  title,
  href,
  header,
}: CardServiceProps) => {
  return (
    <Link
      href={href || ''}
      className='overflow-hidden group w-[17.5rem] flex flex-col rounded-[1.25rem] bg-white shadow-[0px_4px_23.7px_0px_rgba(0,0,0,0.00)]'
    >
      <ImageV2
        src={flag}
        className='w-[3.7285rem] h-[2.36144rem] rounded-[0.5rem] border border-[rgba(210,233,232,0.82)] shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] mt-6 ml-6 xsm:mt-3 xsm:ml-3 xsm:w-[3.125rem] xsm:h-[2rem]'
        alt=''
        width={100}
        height={60}
      />
      <div className='mt-3 px-3'>
        {header ? (
          <div className='text-black'>
            <h2 className='text-pc-sub12s'>{header}</h2>
            <p className='text-pc-sub16b'>{title}</p>
          </div>
        ) : (
          <h2 className='text-pc-h6 text-black'>{title}</h2>
        )}
        <p className='text-pc-sub12s text-black/80'>{subtitle}</p>
      </div>
      <div className='flex flex-col mt-3 px-3 space-y-1'>
        {list_des.map((item, index) => (
          <div
            key={index}
            className='flex space-x-1'
          >
            <div className='flex-shrink-0 w-[1.25rem] h-[1.25rem]'>
              <StartIcon />
            </div>
            <p className='text-pc-sub10m text-black/80'>{item.description}</p>
          </div>
        ))}
      </div>

      <div className='bg-[#60C5FF] gap-[0.38rem] items-center mt-3 text-white flex flex-1 w-full p-3'>
        <FbIcon />
        <div className=''>
          <p className='text-[0.625rem] font-extrabold leading-[110%] uppercase tracking-[-0.0125rem]'>
            Tham gia Group
          </p>
          <p className='text-pc-sub12s'>Amamy gửi hàng an toàn</p>
        </div>
      </div>
    </Link>
  )
}

export default CardService
