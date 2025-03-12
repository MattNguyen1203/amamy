/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
