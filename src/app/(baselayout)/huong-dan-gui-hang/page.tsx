import ShippingInstructions from '@/app/(baselayout)/huong-dan-gui-hang/_components/ShippingInstructions'
import fetchData from '@/fetch/fetchData'
import getSchemaMarkup from '@/fetch/getSchemaMarkup'

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
    <main className='bg-white sm:px-[6rem] sm:pt-0 min-h-[calc(100vh-5.75rem)]'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData, null, 2)}}
      ></script>
      <ShippingInstructions data={dataCreateOrder} />
    </main>
  )
}
