import CreateShippingLabel from '@/app/(non-gsap-layout)/tao-nhan-gui-hang/_components/CreateShippingLabel'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import fetchDataWP from '@/fetch/fetchDataWP'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import getSchemaMarkup from '@/fetch/getSchemaMarkup'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'

export async function generateMetadata() {
  const res = await getMetaDataRankMath(endpoints.createShippingLabel)
  return metadataValues(res)
}

export default async function page() {
  const [schemaData, pageAcfData] = await Promise.all([
    getSchemaMarkup(endpoints.createShippingLabel),
    fetchDataWP({api: endpoints.pageACF(14140), method: 'GET'}),
  ])
  return (
    <main className='relative bg-white xsm:bg-[#F8F8F8]'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData, null, 2)}}
      ></script>
      <h1 className='hidden'>Tạo nhãn gửi hàng</h1>
      <Breadcrumb
        data={[{title: 'Tạo nhãn gửi hàng', slug: ''}]}
        className='mx-auto max-w-[89.5rem] xsm:bg-white xsm:p-[1rem]'
      />
      <CreateShippingLabel data={pageAcfData?.acf} />
    </main>
  )
}
