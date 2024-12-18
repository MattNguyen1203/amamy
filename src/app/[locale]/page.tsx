import {auth} from '@/auth'
import ImageV2 from '@/components/image/ImageV2'
import Pagination from '@/components/pagination/Pagination'
import {Button} from '@/components/ui/button'
import getMetadata from '@/fetch/getMetadata'
import {Link} from '@/i18n/routing'
import {FormAuth} from '@/sections/auth/FormAuth'
import metadataValues from '@/utils/metadataValues'
import {setRequestLocale} from 'next-intl/server'
import {getTranslations} from 'next-intl/server'
import Image from 'next/image'

export async function generateMetadata() {
  const res = await getMetadata('/')
  return metadataValues(res)
}

export default async function Home({
  params: {locale},
}: {
  params: {locale: string}
}) {
  // Enable static rendering
  setRequestLocale(locale)
  const t = await getTranslations({locale})
  const session = await auth()

  // const home = await getAcf({api: `/${AcfType.home}`})
  // const result = home?.yoast_head_json

  // const jsonLd = {...result?.schema}
  return (
    <div className='w-full h-screen bg-white text-black flex flex-col items-center'>
      {/* Add JSON-LD to your page */}
      {/* <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
            .replaceAll(process.env.CMS!, process.env.NEXT_PUBLIC_DOMAIN!)
            .replaceAll(
              process.env.NEXT_PUBLIC_DOMAIN! + '/wp-content',
              process.env.CMS! + '/wp-content',
            ),
        }}
      /> */}
      <div className='flex flex-col'>
        <h2 className='text-center'>{t('hello')}</h2>
        <div className='space-x-[1rem] mt-[5rem]'>
          <Button>
            <Link
              locale='en'
              href='/'
            >
              English
            </Link>
          </Button>
          <Button>
            <Link
              locale='vi'
              href='/'
            >
              Vietnamese
            </Link>
          </Button>
        </div>
      </div>
      <FormAuth session={session} />
      <Pagination />
      <ImageV2
        src={'/logo.png'}
        width={200}
        height={200}
        alt='logo'
      />
      <Image
        src={'/logo.png'}
        width={200}
        height={200}
        alt='logo'
      />
    </div>
  )
}
