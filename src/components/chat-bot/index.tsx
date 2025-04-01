'use client'
import useStore from '@/app/(store)/store'
import MessageItem, {MessageItemProps} from '@/components/chat-bot/MessageItem'
import ImageV2 from '@/components/image/ImageV2'
import Plus from '@/components/svg/Plus'
import SendMessage from '@/components/svg/SendMessage'
import {cn} from '@/lib/utils'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useEffect, useRef, useState} from 'react'

type ChatBotProps = {
  dataMessage?: MessageItemProps[]
}

const ChatBot = ({dataMessage}: ChatBotProps) => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const {chatBotMessage} = useStore((state) => state)
  const boxRef = useRef(null)
  // nhận message từ section TrackingOrder ở homepage
  useEffect(() => {
    if (chatBotMessage) {
      setInput(chatBotMessage)
      setOpen(true)
      handleSendMessage()
    }
  }, [chatBotMessage])

  const handleSendMessage = () => {
    // handle send message
  }

  const handleToggle = () => {
    if (open) {
      // setOpen(false)
      // setChatBotMessage('')
    } else {
      // setOpen(true)
    }
  }
  useEffect(() => {
    if (!boxRef.current) return

    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(
      boxRef?.current,
      {opacity: 1, y: 0},
      {
        opacity: 0,
        y: '100%',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#footer-section',
          start: 'top bottom',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
          // markers: true,
        },
      },
    )
  }, [])
  return (
    <div
      ref={boxRef}
      className={cn(
        'xsm:hidden fixed z-50 bottom-0 right-6 w-[22.5625rem] rounded-t-[1.25rem] bg-Blue-Primary transition-all duration-500 ease-in-out',
        !open && '-bottom-[20.375rem]',
      )}
    >
      <div
        onClick={handleToggle}
        className='p-3 flex items-center space-x-3 cursor-pointer'
      >
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
        <Plus
          className={cn(
            'size-6 stroke-white bg-white/15 rounded-full p-1 transition-all duration-300 cursor-pointer',
            open && 'transform rotate-45',
          )}
        />
      </div>
      <div className='h-[20.375rem] bg-white rounded-t-[1.25rem] px-4 py-5 flex flex-col'>
        <div className='flex-1 overflow-auto flex flex-col space-y-3 hidden_scroll'>
          {Array.isArray(dataMessage) &&
            dataMessage.map((item, index) => (
              <MessageItem
                key={index}
                {...item}
              />
            ))}
        </div>
        <div className='flex mt-3 items-center rounded-[1.25rem] bg-Blue-Primary'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled
            type='text'
            placeholder='Nhập yêu cầu của bạn...'
            className='disabled:bg-transparent flex-1 p-4 border border-Blue-100 outline-none rounded-[1.25rem] text-pc-sub14m text-black placeholder:text-black/30'
          />
          <button
            onClick={handleSendMessage}
            className='flex-center pr-[0.875rem]'
          >
            <SendMessage className='size-6' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBot
