import CX from '@/lib/CX'
// import PrenyAI from '@/lib/preni'
import Image from 'next/image'
import Link from 'next/link'

type ContactButtonProps = {
  data?: {
    zalo: string
    messenger: string
  }
}

const ContactButton = ({data}: ContactButtonProps) => {
  return (
    <div className='fixed flex flex-col space-y-8 xsm:space-y-6 bottom-6 right-10 z-30 xsm:bottom-6 xsm:right-6'>
      <div className='relative'>
        <div className='absolute-center size-fit -z-10'>
          <div className='size-10 xsm:size-8 animate-ping bg-white rounded-full z-0'></div>
        </div>
        <Link
          href={data?.messenger || 'http://m.me/'}
          target='_blank'
          className='size-[3.125rem] xsm:size-10 bg-[#38B6FF] rounded-full shadow-lg flex-center'
        >
          <Image
            width={40}
            height={40}
            src='/header/messenger.svg'
            alt='zalo'
            className='size-7 xsm:size-[1.375rem] object-contain'
          />
        </Link>
      </div>
      <div className='relative'>
        <div className='absolute-center size-fit -z-10'>
          <div className='size-10 xsm:size-8 animate-ping bg-white rounded-full z-0'></div>
        </div>
        <Link
          href={`https://zalo.me/${data?.zalo || ''}`}
          target='_blank'
          className='size-[3.125rem] xsm:size-10 bg-[#38B6FF] rounded-full shadow-lg flex-center'
        >
          <Image
            width={40}
            height={40}
            src='/header/zalo.svg'
            alt='zalo'
            className='size-7 xsm:size-[1.375rem] object-contain'
          />
        </Link>
      </div>
      <div className='relative'>
        <div className='absolute-center size-fit -z-10'>
          <div className='size-8 xsm:size-8 animate-ping bg-white rounded-full z-0'></div>
        </div>
        <div className='size-[3.125rem] xsm:size-10 rounded-full shadow-lg flex-center bg-transparent'></div>
        {/* <PrenyAI /> */}
        <CX />
      </div>
    </div>
  )
}
export default ContactButton
