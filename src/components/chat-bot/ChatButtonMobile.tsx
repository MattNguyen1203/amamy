'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/header/sheet-custom'
import ImageV2 from '@/components/image/ImageV2'
import Plus from '@/components/svg/Plus'
import {cn} from '@/lib/utils'
import {useState} from 'react'

const ChatButtonMobile = () => {
  const [openContact, setOpenContact] = useState(false)

  return (
    <div className='fixed right-4 bottom-[3.125rem] z-50 flex flex-col space-y-2 sm:hidden'>
      <div className='relative size-12 flex-center'>
        <div
          className={cn(
            'absolute opacity-100 -top-[6.75rem] left-0 size-12 flex-center border border-white/80 bg-Blue-Primary rounded-full shadow-[0px_2px_10px_0px_rgba(0,34,85,0.04)] cursor-pointer transition-all duration-500 ease-in-out',
            !openContact && 'top-0 opacity-0',
          )}
        >
          <ImageV2
            alt=''
            width={50}
            height={50}
            src='/homepage/icon/zalo.svg'
            className='size-6 object-cover'
          />
        </div>
        <div
          className={cn(
            'absolute opacity-100 -top-[3.125rem] left-0 size-12 flex-center border border-white/80 bg-Blue-Primary rounded-full shadow-[0px_2px_10px_0px_rgba(0,34,85,0.04)] cursor-pointer transition-all duration-500 ease-in-out',
            !openContact && 'top-0 opacity-0',
          )}
        >
          <ImageV2
            alt=''
            width={50}
            height={50}
            src='/homepage/icon/messenger.svg'
            className='size-6 object-cover'
          />
        </div>
        <div
          onClick={() => setOpenContact(false)}
          className={cn(
            'relative z-10 flex-center size-8 rounded-full shadow-[0px_2px_10px_0px_rgba(0,34,85,0.04)] cursor-pointer bg-background-elevation30',
            !openContact && '!hidden',
          )}
        >
          <Plus className='stroke-black size-6 transform rotate-45' />
        </div>
        <div
          className={cn(
            'relative z-10 size-12 flex-center border border-white/80 bg-Blue-Primary rounded-full shadow-[0px_2px_10px_0px_rgba(0,34,85,0.04)] cursor-pointer',
            openContact && '!hidden',
          )}
          onClick={() => setOpenContact(true)}
        >
          <ImageV2
            alt=''
            width={50}
            height={50}
            src='/homepage/icon/contact.svg'
            className='size-6 object-cover'
          />
        </div>
      </div>
      <Sheet>
        <SheetTrigger>
          <div className='size-12 flex-center bg-white rounded-full shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] cursor-pointer'>
            <ImageV2
              alt=''
              width={50}
              height={50}
              src='/homepage/icon/star-ai.svg'
              className='size-6 object-cover'
            />
          </div>
        </SheetTrigger>
        <SheetContent className='w-full overflow-auto p-0 bg-[#FAFAFA]'>
          <SheetTitle className='hidden' />
          <div className='px-3 py-4 sticky top-0 w-full flex items-center space-x-3 bg-Blue-Primary'>
            <ImageV2
              alt=''
              width={40}
              height={40}
              src='/homepage/icon/star-ai-w.svg'
              className='size-6 object-contain'
            />
            <p className='flex-1 text-white text-[1rem] font-semibold leading-none tracking-[0.01rem]'>
              Trợ lý AI Amamy
            </p>
            <SheetClose>
              <Plus
                className={cn(
                  'size-6 stroke-white bg-white/15 rounded-full p-1 transition-all duration-300 cursor-pointer transform rotate-45',
                )}
              />
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
export default ChatButtonMobile
