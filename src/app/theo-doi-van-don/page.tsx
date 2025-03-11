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
    <main className='pt-40 bg-background-elevation5'>
      <TrackingBill dataAcf={dataAcf?.acf} />
    </main>
  )
}
export default page
