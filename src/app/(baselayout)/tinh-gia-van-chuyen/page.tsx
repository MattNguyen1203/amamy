import DeliveryFee from '@/app/(baselayout)/tinh-gia-van-chuyen/_components/DeliveryFee'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import fetchData from '@/fetch/fetchData'
import {CurrencyToUsdResType, DeliveryDirectionResType} from '@/utils/type'
import React from 'react'

export default async function page() {
  const [deliveryDirectionData, currencyToUsdData]: [
    DeliveryDirectionResType,
    CurrencyToUsdResType,
  ] = await Promise.all([
    fetchData({api: 'chieu-van-chuyen', method: 'GET'}),
    fetchData({api: 'options?fields=currency_to_usd', method: 'GET'}),
  ])
  return (
    <main className='bg-background-elevation5'>
      {/* <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData, null, 2)}}
      ></script> */}
      <h1 className='hidden'>Tính giá vận chuyển</h1>
      <Breadcrumb
        data={[{title: 'Tính giá vận chuyển', slug: ''}]}
        className='sm:px-[5rem] xsm:hidden'
      />
      <DeliveryFee
        currencyToUsd={currencyToUsdData}
        deliveryDirection={deliveryDirectionData}
      />
    </main>
  )
}
