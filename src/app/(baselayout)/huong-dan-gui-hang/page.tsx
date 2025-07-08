import ShippingInstructions from '@/app/(baselayout)/huong-dan-gui-hang/_components/ShippingInstructions'
import fetchData from '@/fetch/fetchData'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import getSchemaMarkup from '@/fetch/getSchemaMarkup'
import metadataValues from '@/utils/metadataValues'

export async function generateMetadata() {
  const res = await getMetaDataRankMath('huong-dan-gui-hang')
  return metadataValues(res)
}

export default async function page() {
  const fetchCreateOrder = fetchData({
    api: `chieu-van-chuyen-posts`,
    option: {
      next: {revalidate: 60},
    },
  })
  const [dataCreateOrder, schemaData] = await Promise.all([
    fetchCreateOrder,
    getSchemaMarkup('huong-dan-gui-hang'),
  ])
  return (
    <main className='bg-[#F8F8F8] xsm:bg-[#FAFAFA] sm:px-[6rem] sm:pt-0 min-h-[calc(100vh-5.75rem)]'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData, null, 2)}}
      ></script>
      <ShippingInstructions data={dataCreateOrder} />
    </main>
  )
}
