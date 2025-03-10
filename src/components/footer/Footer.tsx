const Footer = () => {
  return (
    <div className='flex  px-24 pt-20 pb-[1rem] flex-col items-end gap-[3.4375rem] self-stretch bg-[#0F181D] text-white xsm:pt-[2rem] xsm:px-[1rem]'>
      <div className='flex w-full justify-between xsm:flex-col'>
        <div className='flex gap-[1.5rem] flex-col'>
          <h2 className='font-[Montserrat] text-[2rem] not-italic font-bold leading-[130%]  max-w-[35.875rem] xsm:text-[1.25rem] xsm:text-center '>
            Khách hàng là trung tâm, và sự tin cậy, hài lòng của họ là chìa khóa
            thành công của Amamy.
          </h2>
          <div className='flex gap-[1.5rem] xsm:hidden'>
            {IconWrap(<FacebookSvg />)}
            {IconWrap(<ZaloSvg />)}
            {IconWrap(<TiktokSvg />)}
          </div>
        </div>
        <div className='w-[37.4375rem] text-[var(--greyscaletext-0)] gap-[0.77rem] flex flex-col xsm:mt-[1.5rem] xsm:w-full'>
          <p className='text-[1.25rem] not-italic font-bold leading-[120%] xsm:text-center'>
            Đăng ký nhận ưu đãi
          </p>
          <div className='relative w-full'>
            <input
              placeholder='Email của bạn'
              type='text'
              className='flex w-full h-14 pl-5 pr-3 py-3 items-center gap-2.5 self-stretch
                 text-[#6A6A6A] text-[0.875rem] not-italic font-medium leading-[150%] rounded-[20px]'
            />
            <i className='absolute right-3 top-1/2 -translate-y-1/2'>
              <ArrowRightCircle />
            </i>
          </div>
        </div>
      </div>
      <div className='bg-[rgba(255,_255,_255,_0.20)] my-[3.44rem] h-[1px] w-full'>
        <p className='opacity-0'>1</p>
      </div>
      <div className='flex justify-between w-full mb-[6.25rem]'>
        <div className='flex gap-[1.5rem] flex-col'>
          <h3 className='text-[1.25rem] not-italic font-bold leading-[120%]'>
            Liên hệ với chúng tôi
          </h3>
          <div className='flex flex-col gap-[1rem]'>
            <Address
              icon={LocationIcon()}
              content='Trụ sở 1: Schertlinstraße 17, 81379 München, Germany'
            />
            <Address
              icon={LocationIcon()}
              content='Trụ sở 2: Hanoi, VietNam'
            />
            <Address
              icon={LocationIcon()}
              content='Trụ sở 3: Ho Chi Minh, VietNam'
            />
            <Address
              icon={LocationIcon()}
              content='Liên hệ hotline: 039.575.3374'
            />
            <Address
              icon={LocationIcon()}
              content='Email: amamy.de@gmail.com'
            />
          </div>
        </div>
        <div className='max-w-[35.875rem] flex-1 flex justify-between'>
          <div>
            <h3 className='text-[1.25rem] mb-[1.5rem] not-italic font-bold leading-[120%]'>
              Dịch vụ
            </h3>
            <div className='flex flex-col gap-[0.75rem]'>
              <p className='text-[1rem] not-italic font-medium leading-[150%] opacity-80'>
                Theo dõi bưu kiện
              </p>
              <p className='text-[1rem] not-italic font-medium leading-[150%] opacity-80'>
                Tính giá vận chuyển
              </p>
              <p className='text-[1rem] not-italic font-medium leading-[150%] opacity-80'>
                Quản trị hệ thống CNTT
              </p>
              <p className='text-[1rem] not-italic font-medium leading-[150%] opacity-80'>
                Hữu ích cho gửi hàng
              </p>
              <p className='text-[1rem] not-italic font-medium leading-[150%] opacity-80'>
                Dịch vụ khác
              </p>
            </div>
          </div>
          <div>
            <h3 className='text-[1.25rem] mb-[1.5rem] not-italic font-bold leading-[120%]'>
              Giải pháp
            </h3>
            <div className='flex flex-col gap-[0.75rem]'>
              <p className='text-[1rem] not-italic font-medium leading-[150%] opacity-80'>
                Về Amamy
              </p>
              <p className='text-[1rem] not-italic font-medium leading-[150%] opacity-80'>
                Retail
              </p>
              <p className='text-[1rem] not-italic font-medium leading-[150%] opacity-80'>
                ETO
              </p>
              <p className='text-[1rem] not-italic font-medium leading-[150%] opacity-80'>
                Edu
              </p>
              <p className='text-[1rem] not-italic font-medium leading-[150%] opacity-80'>
                Media
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-[88rem] p-6 justify-between relative items-center gap-2.5 stroke-[0.93px] opacity-20'>
        <div className='border-t-[1px] borderR border-l absolute top-0 right-0 left-0 rounded-t-[20px] h-3/4 w-full'></div>
        <p className='text-[#D6D6D6] text-[0.75rem] not-italic font-semibold leading-[normal] tracking-[-0.015rem] uppercase'>
          Tất cả quyền được bảo lưu. Bản quyền © 2024 Ltd.
        </p>
        <div className='flex gap-[2.2rem]'>
          <p className='text-[#D6D6D6] text-[0.75rem] not-italic font-semibold leading-[normal] tracking-[-0.015rem] uppercase'>
            Chính sách bảo mật
          </p>
          <p className='text-[#D6D6D6] text-[0.75rem] not-italic font-semibold leading-[normal] tracking-[-0.015rem] uppercase'>
            Điều khoản & Điều kiện
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer

const Address = ({icon, content}: {icon: any; content: string}) => {
  return (
    <div className='flex gap-[0.5rem] items-center'>
      {icon}
      <p>{content}</p>
    </div>
  )
}

const LocationIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        opacity='0.4'
        d='M17.1834 7.04183C16.3084 3.19183 12.9501 1.4585 10.0001 1.4585C10.0001 1.4585 10.0001 1.4585 9.99175 1.4585C7.05008 1.4585 3.68341 3.1835 2.80841 7.0335C1.83341 11.3335 4.46675 14.9752 6.85008 17.2668C7.73341 18.1168 8.86675 18.5418 10.0001 18.5418C11.1334 18.5418 12.2667 18.1168 13.1417 17.2668C15.5251 14.9752 18.1584 11.3418 17.1834 7.04183Z'
        fill='white'
      />
      <path
        d='M10 11.2168C11.4497 11.2168 12.625 10.0415 12.625 8.5918C12.625 7.14205 11.4497 5.9668 10 5.9668C8.55025 5.9668 7.375 7.14205 7.375 8.5918C7.375 10.0415 8.55025 11.2168 10 11.2168Z'
        fill='white'
      />
    </svg>
  )
}

const IconWrap = (icon: any) => {
  return (
    <div
      className='flex w-[3rem] h-[3rem] p-3 flex-col items-center gap-[-2.5rem] rounded-[var(--12)] border-[1px] border-solid
    border-[rgba(255,255,255,0.21)] bg-[rgba(140,_140,_140,_0.17)]'
    >
      {icon}
    </div>
  )
}

const FacebookSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M4.38226 0C1.95468 0 0 1.95468 0 4.38225V19.6177C0 22.0453 1.95468 24 4.38226 24H12.6398V14.6175H10.1588V11.2395H12.6398V8.35349C12.6398 6.0861 14.1057 4.00425 17.4825 4.00425C18.8497 4.00425 19.8608 4.1355 19.8608 4.1355L19.7813 7.29001C19.7813 7.29001 18.7501 7.28027 17.625 7.28027C16.4073 7.28027 16.212 7.84134 16.212 8.77277V11.2395H19.878L19.7183 14.6175H16.212V24H19.6177C22.0453 24 24 22.0453 24 19.6178V4.38227C24 1.9547 22.0453 2.4e-05 19.6177 2.4e-05H4.38223L4.38226 0Z'
        fill='white'
        fillOpacity='0.9'
      />
    </svg>
  )
}

const ZaloSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='26'
      height='26'
      viewBox='0 0 26 26'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M26 13C26 20.1797 20.1797 26 13 26C10.6321 26 8.41213 25.3669 6.5 24.2608L1.08333 24.9167L1.73917 19.5C0.633063 17.5879 0 15.3679 0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13ZM20.3726 16.5294C18.9245 16.5294 17.7453 15.3503 17.7453 13.9021C17.7453 12.454 18.9245 11.2748 20.3726 11.2748C21.8208 11.2748 22.9999 12.454 22.9999 13.9021C22.9999 15.3503 21.8208 16.5294 20.3726 16.5294ZM20.3726 12.3257C19.5039 12.3257 18.7963 13.0334 18.7963 13.9021C18.7963 14.7709 19.5039 15.4785 20.3726 15.4785C21.2414 15.4785 21.949 14.7709 21.949 13.9021C21.949 13.0334 21.2414 12.3257 20.3726 12.3257ZM15.993 16.529H16.6936V10.2235H15.6427V16.1787C15.6427 16.3721 15.7996 16.529 15.993 16.529ZM13.5427 11.45V11.8136C13.102 11.4801 12.5597 11.2748 11.9663 11.2748C10.5181 11.2748 9.33901 12.454 9.33901 13.9021C9.33901 15.3503 10.5181 16.5294 11.9663 16.5294C12.5597 16.5294 13.102 16.3242 13.5427 15.9907V16.1791C13.5427 16.3725 13.6996 16.5294 13.893 16.5294H14.5936V11.45H13.5427ZM11.9663 15.4785C11.0975 15.4785 10.3899 14.7709 10.3899 13.9021C10.3899 13.0334 11.0975 12.3257 11.9663 12.3257C12.8351 12.3257 13.5427 13.0334 13.5427 13.9021C13.5427 14.7709 12.8351 15.4785 11.9663 15.4785ZM3.90806 10.2235H9.51298V10.3986C9.51298 10.5997 9.43381 10.7763 9.31961 10.9241H9.33783L5.4347 15.4781H9.16268V16.1787C9.16268 16.3721 9.00574 16.529 8.81237 16.529H3.55775V16.3539C3.55775 16.1528 3.63692 15.9762 3.75112 15.8284H3.73291L7.63603 11.2744H3.90806V10.2235Z'
        fill='white'
        fillOpacity='0.9'
      />
    </svg>
  )
}

const TiktokSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4 0C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H20C22.2091 24 24 22.2091 24 20V4C24 1.79086 22.2091 0 20 0H4ZM19 10.7124V7.97144C18.5705 7.89714 17.9639 7.73938 17.3176 7.37399C16.6275 6.98214 16.1359 6.49156 15.8031 6.06917C15.5191 5.70988 15.3563 5.27122 15.338 4.81422C15.3329 4.6982 15.328 4.58166 15.3232 4.46512C15.3184 4.34858 15.3135 4.23204 15.3084 4.11601H12.5675V14.8894C12.5706 14.9383 12.5716 14.9871 12.5716 15.036C12.5716 16.3398 11.51 17.4014 10.2062 17.4014C8.9024 17.4014 7.84084 16.3408 7.84084 15.036C7.84084 13.7312 8.9024 12.6706 10.2062 12.6706C10.4841 12.6706 10.7507 12.7185 10.9991 12.807V10.1037C10.7406 10.062 10.4759 10.0406 10.2062 10.0406C7.45204 10.0406 5.21186 12.2828 5.21186 15.036C5.21186 17.7891 7.45204 20.0303 10.2062 20.0303C12.9604 20.0303 15.2006 17.7891 15.2006 15.036C15.2006 14.923 15.1965 14.8111 15.1894 14.7011L15.2006 14.7184V9.17448C15.6392 9.52358 16.3089 9.97447 17.2087 10.3042C17.8977 10.5567 18.5206 10.6656 19 10.7124Z'
        fill='white'
        fillOpacity='0.9'
      />
    </svg>
  )
}

const ArrowRightCircle = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14 27.611C21.3638 27.611 27.3333 21.6415 27.3333 14.2777C27.3333 6.91387 21.3638 0.944336 14 0.944336C6.63616 0.944336 0.666626 6.91387 0.666626 14.2777C0.666626 21.6415 6.63616 27.611 14 27.611ZM16.0404 9.57056L20.0404 13.5706C20.4309 13.9611 20.4309 14.5943 20.0404 14.9848L16.0404 18.9848C15.6499 19.3753 15.0167 19.3753 14.6262 18.9848C14.2357 18.5943 14.2357 17.9611 14.6262 17.5706L16.9191 15.2777H8.66662C8.11434 15.2777 7.66662 14.83 7.66662 14.2777C7.66662 13.7254 8.11434 13.2777 8.66662 13.2777H16.9191L14.6262 10.9848C14.2357 10.5943 14.2357 9.96109 14.6262 9.57056C15.0167 9.18004 15.6499 9.18004 16.0404 9.57056Z'
        fill='#38B6FF'
      />
    </svg>
  )
}
