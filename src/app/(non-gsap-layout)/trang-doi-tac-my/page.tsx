import AmericaPartner from '@/app/(non-gsap-layout)/trang-doi-tac-my/_components/AmericaPartner'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import getSchemaMarkup from '@/fetch/getSchemaMarkup'
import endpoints from '@/utils/endpoints'
import React from 'react'

export default async function page() {
  const [schemaData] = await Promise.all([
    getSchemaMarkup(endpoints.americaPartner),
  ])
  return (
    <main className='relative bg-white'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData, null, 2)}}
      ></script>
      <h1 className='hidden'>Trang đối tác Mỹ</h1>
      <Breadcrumb
        data={[{title: 'Trang đối tác Mỹ', slug: ''}]}
        className='mx-auto max-w-[89.5rem] xsm:bg-white xsm:p-[1rem]'
      />
      <AmericaPartner />
    </main>
  )
}
