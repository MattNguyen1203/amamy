import fetchData from '@/fetch/fetchData'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import getSchemaMarkup from '@/fetch/getSchemaMarkup'
import CreateOrder from '@/sections/tao-don/CreateOrder'
import metadataValues from '@/utils/metadataValues'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'

export async function generateMetadata() {
  const res = await getMetaDataRankMath('tao-don-hang')
  return metadataValues(res)
}

export default async function page() {
  const fetchCreateOrder = fetchData({
    api: `chieu-van-chuyen-posts`,
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchNoticeDanger = fetchData({
    api: `get-option-field?field=notice_danger`,
    option: {
      next: {revalidate: 60},
    },
  })
  const [dataCreateOrder, schemaData, dataNoticeDanger] = await Promise.all([
    fetchCreateOrder,
    getSchemaMarkup('tao-don-hang'),
    fetchNoticeDanger,
  ])
  return (
    <main className='bg-white sm:px-[6rem] sm:pt-0 min-h-[calc(100vh-5.75rem)]'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData, null, 2)}}
      ></script>
      <Breadcrumb
        data={[{title: 'Tạo đơn hàng', slug: ''}]}
        className='xsm:hidden'
      />
      <CreateOrder data={dataCreateOrder} dataNoticeDanger={dataNoticeDanger?.value} />
    </main>
  )
}
