'use client'

import useStore from '@/app/(store)/store'
import fetchDataOrder from '@/fetch/fetchDataOrder'
import FAQ from '@/sections/tracking-bill/FAQ'
import OrderInformation, {
  OrderInformationProps,
} from '@/sections/tracking-bill/OrderInformation'
import SearchBill from '@/sections/tracking-bill/SearchBill'
import {useEffect, useState} from 'react'

type TrackingBillProps = {
  dataAcf?: {
    faq_order: {
      Title: string
      content: string
    }[]
  }
}

const TrackingBill = ({dataAcf}: TrackingBillProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const {searchValue, setSearchValue} = useStore((state) => state)
  const [issearchValue, setIsSearchValue] = useState<string>(searchValue)
  const [data, setData] = useState<OrderInformationProps['data']>(null)

  const handleSearch = async () => {
    if (isLoading) return
    setIsLoading(true)
    const data = await fetchDataOrder({
      api: 'get',
      method: 'POST',
      option: {
        body: JSON.stringify({
          ma_don: issearchValue,
        }),
      },
    })
    setIsLoading(false)
    if (data.ok) {
      setData(data?.order)
    } else {
      setData(null)
    }
    setSearched(true)
  }
  useEffect(() => {
    if (searchValue) {
      setIsSearchValue(searchValue)
      handleSearch()
      setTimeout(() => {
        setSearchValue('')
      }, 3000)
    }
  }, [searchValue])
  return (
    <div className='grid grid-cols-[min-content_auto] gap-6 w-full px-[6rem] pb-[4rem] xsm:px-4 xsm:gap-4 xsm:grid-cols-1'>
      <div className='w-[28.3125rem] xsm:w-full'>
        <SearchBill
          issearchValue={issearchValue}
          onSearch={handleSearch}
          setIsSearchValue={setIsSearchValue}
          isLoading={isLoading}
        />
      </div>
      <div className='row-span-2 col-start-2 xsm:col-start-1 xsm:row-span-1'>
        <OrderInformation
          data={data}
          searched={searched}
        />
      </div>
      <div className='w-[28.3125rem] xsm:w-full'>
        <FAQ dataFAQ={dataAcf?.faq_order} />
      </div>
    </div>
  )
}
export default TrackingBill
