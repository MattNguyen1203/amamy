'use client'

import useStore from '@/app/(store)/store'
import ImageV2 from '@/components/image/ImageV2'
import Search from '@/components/svg/Search'
import SendMessage from '@/components/svg/SendMessage'
import {cn} from '@/lib/utils'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/sections/homepage/banner/tabs-custom'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

const TrackingOrder = () => {
  const {setSearchValue} = useStore((state) => state)
  const [value, setValue] = useState('search-order')
  const [inputAI, setInputAI] = useState('')
  const [inputSearch, setInputSearch] = useState('')
  const {setChatBotMessage} = useStore((state) => state)

  // toggle chat bot
  const handleChatAI = () => {
    setChatBotMessage(inputAI)
    setInputAI('')
  }

  const router = useRouter()
  const handleTrackingOrder = () => {
    // handle tracking order
    setSearchValue(inputSearch)
    // Chuyển hướng đến trang theo dõi vận đơn
    router.push('/theo-doi-van-don')
  }

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
        className='relative z-10 sm:shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] '
      >
        <p className='text-pc-sub12s text-black/80 uppercase xsm:text-pc-sub10m xsm:!font-semibold'>
          Trò chuyện với trợ lý AI Amamy
        </p>
        <div className='flex items-center mt-4 xsm:mt-3 rounded-[1.25rem] bg-Blue-Primary'>
          <div className='flex-1 h-full flex items-center space-x-[0.625rem] xsm:space-x-2 p-[0.625rem] rounded-[1.25rem] bg-white border border-Blue-100'>
            <ImageV2
              alt=''
              width={40}
              height={40}
              src='/homepage/icon/star-ai.svg'
              className='size-9 xsm:size-5 object-cover'
            />
            <input
              value={inputAI}
              disabled
              onChange={(e) => setInputAI(e.target.value)}
              type='text'
              placeholder='VD: Gửi 10kg hàng từ Việt Nam đến Mỹ'
              className='disabled:bg-transparent flex-1 border-none outline-none text-pc-sub14m xsm:text-mb-13M text-black placeholder:text-black/30'
            />
          </div>
          <button
            onClick={handleChatAI}
            className='flex-center p-4 pr-[1.3125rem] xsm:p-3 xsm:pl-[0.375rem]'
          >
            <SendMessage className='size-6 xsm:size-5' />
          </button>
        </div>
        <p className='mt-2 text-pc-sub12m xsm:text-pc-sub10m text-black/80'>
          Hãy nhập thông tin vận chuyển vào box chat để nhận báo giá từ trợ lý
          AI.
        </p>
      </TabsContent>
    </Tabs>
  )
}
export default TrackingOrder
