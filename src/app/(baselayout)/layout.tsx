/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from '@/components/footer/Footer'
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
