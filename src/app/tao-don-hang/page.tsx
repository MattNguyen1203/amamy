import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import fetchData from '@/fetch/fetchData'
import CreateOrder from '@/sections/tao-don/CreateOrder'
import metadataValues from '@/utils/metadataValues'

export async function generateMetadata() {
  return metadataValues('')
}

export default async function page() {
  const fetchCreateOrder = fetchData({
    api: `chieu-van-chuyen-posts`,
    option: {
      next: {revalidate: 60},
    },
  })
  const [dataCreateOrder] = await Promise.all([fetchCreateOrder])
  return (
    <main className='bg-white sm:px-[6rem] sm:pt-0 min-h-[calc(100vh-5.75rem)]'>
      <Breadcrumb
        data={[{title: 'Tạo đơn hàng', slug: ''}]}
        className='xsm:hidden'
      />
      <CreateOrder data={dataCreateOrder} />
    </main>
  )
}
