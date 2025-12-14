import AmericaPartner from '@/app/(non-gsap-layout)/trang-doi-tac-my/_components/AmericaPartner'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import getSchemaMarkup from '@/fetch/getSchemaMarkup'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'
import React, {Suspense} from 'react'

export async function generateMetadata() {
  const res = await getMetaDataRankMath(endpoints.americaPartner)
  return metadataValues(res)
}

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
      <Suspense fallback={<div>Loading...</div>}>
        <AmericaPartner />
      </Suspense>
    </main>
  )
}
