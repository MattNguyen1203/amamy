'use client'

import CardGradient from '@/components/card-gradient/CardGradient'
import ImageV2 from '@/components/image/ImageV2'
import Search from '@/components/svg/Search'
import {cn} from '@/lib/utils'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/sections/homepage/banner/tabs-custom'
import AIButton from '@/sections/service/section2/AIButton'
import {IBoxChatAI} from '@/utils/type'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

const TrackingOrder = ({boxChatAI}: {boxChatAI: IBoxChatAI}) => {
  const [value, setValue] = useState('search-order')
  const [inputSearch, setInputSearch] = useState('')

  const router = useRouter()
  const handleTrackingOrder = () => {
    // handle tracking order
    // setSearchValue(inputSearch)
    // Chuyển hướng đến trang theo dõi vận đơn
    router.push(`/theo-doi-van-don?code=${inputSearch}`)
  }

  const messageItems = [
    {
      isUser: true,
      message: boxChatAI.customer_chat,
    },
    {
      isUser: false,
      message: boxChatAI.ai_chat,
    },
  ]

  return (
    <Tabs
      onValueChange={setValue}
      defaultValue='search-order'
      className='w-[38.1875rem] xsm:w-full xsm:shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] xsm:rounded-[1.25rem]'
    >
      <TabsList className='relative xsm:w-full'>
        <TabsTrigger
          className='relative z-10 xsm:flex-1 text-pc-tab-title xsm:text-[0.75rem] xsm:font-semibold xsm:leading-[1.33] xsm:tracking-[-0.0225rem] text-[rgba(0,0,0,0.60)] opacity-[0.5] data-[state=active]:opacity-[1] data-[state=active]:text-black'
          value='search-order'
        >
          Theo dõi bưu kiện
        </TabsTrigger>
        <TabsTrigger
          className='relative z-10 xsm:flex-1 text-pc-tab-title xsm:text-[0.75rem] xsm:font-semibold xsm:leading-[1.33] xsm:tracking-[-0.0225rem] text-[rgba(0,0,0,0.60)] opacity-[0.5] data-[state=active]:opacity-[1] data-[state=active]:text-black'
          value='estimate-price'
        >
          Dự tính giá vận chuyển
        </TabsTrigger>
        <ImageV2
          alt=''
          width={300}
          height={200}
          src='/homepage/tabs.webp'
          className={cn(
            'w-auto h-[5.6875rem] xsm:h-[4.625rem] object-cover absolute top-0 xsm:top-0.5',
            value === 'search-order'
              ? 'left-[1.4rem] xsm:left-[2.4rem] transform -scale-x-100'
              : 'right-[4rem] xsm:right-[2.3rem]',
          )}
        />
      </TabsList>
      <TabsContent
        value='search-order'
        className='relative z-10 sm:shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] '
      >
        <input
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleTrackingOrder()
            }
          }}
          type='text'
          placeholder='Nhập mã vận đơn'
          className='w-full p-4 xsm:p-3 border border-[#CFD0D5] outline-none rounded-[1.25rem] text-pc-sub14m xsm:text-mb-13M text-black placeholder:text-black/30'
        />
        <button
          onClick={handleTrackingOrder}
          className='mt-4 xsm:mt-2 h-12 xsm:h-10 flex-center w-full space-x-3 p-3 bg-Blue-Primary rounded-[1.25rem]'
        >
          <span className='text-pc-sub16m xsm:text-pc-sub14m text-white'>
            Tra cứu đơn hàng
          </span>
          <Search className='size-[1.125rem] xsm:size-[0.9375rem]' />
        </button>
      </TabsContent>
      <TabsContent
        value='estimate-price'
        className='relative z-10 sm:shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] overflow-hidden'
      >
        <CardGradient>
          <div className='p-[0.625rem_1.0625rem] bg-white rounded-[1.25rem] border border-Blue-100 space-y-[0.625rem]'>
            {messageItems.map((item, index) => (
              <MessageItem
                key={index}
                {...item}
              />
            ))}
          </div>
        </CardGradient>
        <AIButton href={boxChatAI.link_chat_ai} />
      </TabsContent>
    </Tabs>
  )
}
export default TrackingOrder

type MessageItemProps = {
  isUser?: boolean
  message?: string
}
const MessageItem = ({isUser = false, message}: MessageItemProps) => {
  return (
    <div className={cn('flex flex-col', isUser ? 'items-start' : 'items-end')}>
      <span className='text-xs leading-normal tracking-[-0.0225rem] text-[#667085] mb-1'>
        {isUser ? 'Câu hỏi khách hàng' : 'Chat AI Amamy'}
      </span>
      <p
        className={cn(
          'inline-block font-medium p-3 rounded-[1.25rem] text-sm leading-4 tracking-[-0.00875rem]',
          isUser
            ? 'text-white bg-Blue-Primary rounded-tl-[0.25rem]'
            : 'bg-Blue-50 text-black/[0.92] rounded-tr-[0.25rem]',
        )}
      >
        {message}
      </p>
    </div>
  )
}
