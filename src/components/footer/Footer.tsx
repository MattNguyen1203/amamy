import ReceivingIncentivesFrom from '@/components/footer/ReceivingIncentivesFrom'
import ImageV2 from '@/components/image/ImageV2'
import fetchData from '@/fetch/fetchData'
import Link from 'next/link'

/* eslint-disable @typescript-eslint/no-explicit-any */
const Footer = async () => {
  const dataFooter = await fetchData({
    api: 'options?fields=footer_site',
    option: {
      next: {revalidate: 10},
    },
  })
  const {
    title,
    social,
    contact_us,
    service,
    solution,
    privacy_policy,
    terms_conditions,
  } = dataFooter.data.footer_site

  return (
    <div className='flex px-24 pt-20 pb-[1rem] flex-col sm:items-end sm:gap-[3.4375rem] sm:self-stretch bg-[#0F181D] text-white xsm:pt-[2rem] xsm:px-0 xsm:pb-0'>
      <div className='xsm:px-[1rem] flex w-full justify-between xsm:flex-col'>
        <div className='flex gap-[1.5rem] flex-col'>
          <h2 className='font-montserrat text-[2rem] not-italic font-bold xsm:font-semibold leading-[130%] xsm:tracking-[-0.025rem] max-w-[35.875rem] xsm:text-[1.25rem] xsm:text-center '>
            {title}
          </h2>
          <div className='flex gap-[1.5rem] xsm:hidden'>
            {social.map((item: any, index: number) => (
              <Link
                target='_blank'
                href={item.link}
                key={index}
                className='flex-center size-12 rounded-[1.25rem] border border-white/20 bg-[#8C8C8C2B]'
              >
                <ImageV2
                  alt=''
                  src={item.icon}
                  width={40}
                  height={40}
                  className='size-6 object-contain'
                />
              </Link>
            ))}
          </div>
        </div>
        <ReceivingIncentivesFrom />
      </div>
      <div className='xsm:hidden xsm:px-[1rem] bg-[rgba(255,_255,_255,_0.20)] sm:my-[3.44rem] h-[1px] w-full'>
        <p className='opacity-0'>1</p>
      </div>
      <div className='xsm:p-[1rem] xsm:mt-[2rem] xsm:mb-0 xsm:pb-[2rem] xsm:bg-[rgba(255,255,255,0.03)] xsm:rounded-t-[1.25rem] flex xsm:flex-col sm:justify-between w-full mb-[6.25rem]'>
        <div className='flex gap-[1.5rem] xsm:gap-[1rem] flex-col'>
          <h3 className='text-[1.25rem] not-italic font-bold leading-[120%] xsm:text-pc-sub14s'>
            Liên hệ với chúng tôi
          </h3>
          <div className='flex flex-col gap-[1rem]'>
            {contact_us.map((item: any, index: number) => (
              <Address
                key={index}
                icon={item.icon}
                title={item.title}
                link={item.link}
              />
            ))}
          </div>
        </div>
        <div className='max-w-[35.875rem] xsm:space-y-[2.5rem] flex-1 flex xsm:flex-col sm:justify-between xsm:mt-[2.5rem]'>
          <div>
            <h3 className='text-[1.25rem] mb-[1.5rem] xsm:mb-[0.75rem] not-italic font-bold leading-[120%] xsm:text-pc-sub14s'>
              Dịch vụ
            </h3>
            <div className='sm:flex sm:flex-col gap-[0.75rem] xsm:grid xsm:grid-cols-2 xsm:gap-[1rem]'>
              {service.map((item: any, index: number) => (
                <Link
                  href={item.link.url}
                  target={item.link.target}
                  key={index}
                  className='text-[1rem] not-italic font-medium leading-[150%] opacity-80 xsm:text-pc-sub14m'
                >
                  {item.link.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className='text-[1.25rem] mb-[1.5rem] xsm:mb-[0.75rem] not-italic font-bold leading-[120%] xsm:text-pc-sub14s'>
              Giải pháp
            </h3>
            <div className='sm:flex sm:flex-col sm:gap-[0.75rem] xsm:grid xsm:grid-cols-2 gap-[1rem]'>
              {solution.map((item: any, index: number) => (
                <Link
                  href={item.link.url}
                  target={item.link.target}
                  key={index}
                  className='text-[1rem] not-italic font-medium leading-[150%] opacity-80 xsm:text-pc-sub14m'
                >
                  {item.link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='xsm:px-[1rem] xsm:bg-[rgba(255,255,255,0.03)]'>
        <div className='xsm:p-[1rem_1.5rem_1.5rem_1.5rem] xsm:border-t-[1px] xsm:border-solid xsm:border-t-[rgba(241,249,255,0.20)] xsm:rounded-t-[1.25rem] xsm:space-y-[1rem] flex xsm:flex-col xsm:items-center w-[88rem] xsm:w-full p-6 justify-between sm:relative items-center gap-2.5 stroke-[0.93px] sm:opacity-20'>
          <div className='sm:hidden flex w-full justify-center space-x-[1rem]'>
            {social.map((item: any, index: number) => (
              <Link
                target='_blank'
                href={item.link}
                key={index}
                className='flex-center size-10 rounded-full border border-white/10'
              >
                <ImageV2
                  alt=''
                  src={item.icon}
                  width={40}
                  height={40}
                  className='size-5 object-contain'
                />
              </Link>
            ))}
          </div>
          <div className='xsm:hidden border-t-[1px] borderR border-l absolute top-0 right-0 left-0 rounded-t-[20px] h-3/4 w-full'></div>
          <p className='xsm:w-[13.1875rem] xsm:text-center text-[#D6D6D6] xsm:text-[#F8F8F8] xsm:text-pc-sub14s text-[0.75rem] not-italic font-semibold leading-[normal] tracking-[-0.015rem] uppercase'>
            Tất cả quyền được bảo lưu. Bản quyền © 2024 Ltd.
          </p>
          <div className='flex sm:gap-[2.2rem] xsm:gap-[2rem] relative z-10'>
            <Link
              href={privacy_policy.url}
              target={privacy_policy.target}
              className='xsm:text-[rgba(255,255,255,0.80)] text-[#D6D6D6] text-[0.75rem] not-italic font-semibold xsm:font-medium leading-[normal] xsm:leading-[1.8] xsm:tracking-[-0.0075rem] tracking-[-0.015rem] sm:uppercase'
            >
              {privacy_policy.title}
            </Link>
            <Link
              target={terms_conditions.target}
              href={terms_conditions.url}
              className='xsm:text-[rgba(255,255,255,0.80)] text-[#D6D6D6] text-[0.75rem] not-italic font-semibold xsm:font-medium leading-[normal] xsm:leading-[1.8] xsm:tracking-[-0.0075rem] tracking-[-0.015rem] sm:uppercase'
            >
              {terms_conditions.title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

const Address = ({
  icon,
  title,
  link,
}: {
  icon: string
  title: string
  link: string
}) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const phoneRegex = /^\+?[0-9]{7,15}$/
  let formatLink = link
  if (emailRegex.test(link)) {
    formatLink = `mailto:${link}`
  } else if (phoneRegex.test(link)) {
    formatLink = `tel:${link}`
  }

  return (
    <Link
      href={formatLink}
      className='flex space-x-2 items-center'
    >
      <ImageV2
        alt=''
        src={icon}
        width={80}
        height={80}
        className='size-5 object-contain'
      />
      <span className='xsm:text-pc-sub14m xsm:opacity-[0.8] xsm:text-white'>
        {title}
      </span>
    </Link>
  )
}
