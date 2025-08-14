import DeliveryFee from '@/app/(baselayout)/tinh-gia-van-chuyen/_components/DeliveryFee'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import fetchData from '@/fetch/fetchData'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import getSchemaMarkup from '@/fetch/getSchemaMarkup'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'
import React from 'react'

export async function generateMetadata() {
  const res = await getMetaDataRankMath(endpoints.calculateOrderDelivery)
  return metadataValues(res)
}

export default async function page() {
  const [deliveryDirectionData, currencyToUsdData, schemaData] =
    await Promise.all([
      fetchData({api: 'chieu-van-chuyen', method: 'GET'}),
      fetchData({api: 'options?fields=currency_to_usd', method: 'GET'}),
      getSchemaMarkup(endpoints.calculateOrderDelivery),
    ])
  return (
    <main className='bg-background-elevation5 relative'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData, null, 2)}}
      ></script>
      <h1 className='hidden'>Tính giá vận chuyển</h1>
      <Breadcrumb
        data={[{title: 'Tính giá vận chuyển', slug: ''}]}
        className='sm:px-[5rem] xsm:px-[1rem]'
      />
      <DeliveryFee
        currencyToUsd={currencyToUsdData}
        deliveryDirection={deliveryDirectionData}
      />
    </main>
  )
}
