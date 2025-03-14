import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import fetchDataWP from '@/fetch/fetchDataWP'
import TrackingBill from '@/sections/tracking-bill'

const page = async () => {
  const dataAcf = await fetchDataWP({
    api: 'pages/355?_fields=acf&acf_format=standard',
    option: {
      next: {revalidate: 0},
    },
  })

  return (
    <main className='bg-background-elevation5'>
      <Breadcrumb
        data={[{title: 'Theo dõi vận đơn', slug: ''}]}
        className='sm:px-[5rem] xsm:hidden'
      />
      <TrackingBill dataAcf={dataAcf?.acf} />
    </main>
  )
}
export default page
