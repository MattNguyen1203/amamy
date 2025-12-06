// import PrenyAI from '@/lib/preni'
import Image from 'next/image'
import Link from 'next/link'

type ContactButtonProps = {
  data?: {
    zalo: string
    messenger: string
    whatsapp: string
  }
}

const ContactButton = ({data}: ContactButtonProps) => {
  return (
    <div className='fixed bottom-6 right-10 z-30 flex flex-col space-y-6 xsm:bottom-6 xsm:right-6 xsm:space-y-4'>
      <div className='relative'>
        <div className='-z-10 size-fit absolute-center'>
          <div className='z-0 size-10 animate-ping rounded-full bg-white xsm:size-8'></div>
        </div>
        <Link
          href={data?.messenger || 'http://m.me/'}
          target='_blank'
          className='size-[3.125rem] rounded-full bg-[#38B6FF] shadow-lg flex-center xsm:size-10'
        >
          <Image
            width={40}
            height={40}
            src='/header/messenger.svg'
            alt='zalo'
            className='size-7 object-contain xsm:size-[1.375rem]'
          />
        </Link>
      </div>
      <div className='relative'>
        <div className='-z-10 size-fit absolute-center'>
          <div className='z-0 size-10 animate-ping rounded-full bg-white xsm:size-8'></div>
        </div>
        <Link
          href={`https://zalo.me/${data?.zalo || ''}`}
          target='_blank'
          className='size-[3.125rem] rounded-full bg-[#38B6FF] shadow-lg flex-center xsm:size-10'
        >
          <Image
            width={40}
            height={40}
            src='/header/zalo.svg'
            alt='zalo'
            className='size-7 object-contain xsm:size-[1.375rem]'
          />
        </Link>
      </div>
      <div className='relative'>
        <div className='-z-10 size-fit absolute-center'>
          <div className='z-0 size-10 animate-ping rounded-full bg-white xsm:size-8'></div>
        </div>
        <Link
          href={`https://wa.me/${data?.whatsapp || ''}`}
          target='_blank'
          className='size-[3.125rem] rounded-full bg-[#38B6FF] shadow-lg flex-center xsm:size-10'
        >
          <Image
            width={40}
            height={40}
            src='/header/whatsapp-svgrepo-com.svg'
            alt='whatsapp'
            className='size-8 object-contain xsm:size-[1.375rem]'
          />
        </Link>
      </div>
    </div>
  )
}
export default ContactButton
