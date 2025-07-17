/* eslint-disable @typescript-eslint/no-explicit-any */
import ContactButton from '@/components/contact-button'
import Footer from '@/components/footer/Footer'
import fetchData from '@/fetch/fetchData'
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const fetchFooter = await fetchData({
    api: 'options?fields=footer_site,header_site',
    option: {
      next: {revalidate: 60},
    },
  })
  const [dataFooter] = await Promise.all([fetchFooter])
  return (
    <>
      {children}
      <ContactButton data={dataFooter?.data?.header_site?.contact_us} />
      <Footer data={dataFooter.data.footer_site} />
    </>
  )
}
