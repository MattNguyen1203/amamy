import ICPhone from '@/components/icon/ICPhone'
import Link from 'next/link'

const ContactContainer = ({number}: {number: string}) => {
  return (
    <Link
      href='tel:0926777966'
      className='flex flex-col items-center justify-center p-7 xsm:flex-row xsm:justify-between xsm:p-4'
    >
      <span className='xsm:hidden'>
        <p className='text-center text-[1.375rem] font-bold leading-[1.875rem] xsm:text-[1.313rem]'>
          Liên hệ tư vấn trực tiếp
        </p>
      </span>

      <span className='py-5 xsm:py-0'>
        <ICPhone className='xsm:size-14' />
      </span>

      <span>
        <p className='text-center text-base leading-[1.875rem] xsm:hidden'>
          Hotline
        </p>
        <Link href={`tel:${number}`} className='text-center text-[1.375rem] font-bold leading-[1.875rem] xsm:text-[2.25rem] xsm:text-Blue-Primary'>
          {number}
        </Link>
        <p className='text-center text-[1.375rem] font-bold leading-[1.875rem] sm:hidden xsm:text-[1.313rem]'>
          Liên hệ tư vấn trực tiếp
        </p>
      </span>
    </Link>
  )
}

export default ContactContainer
