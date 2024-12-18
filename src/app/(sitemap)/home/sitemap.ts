/* eslint-disable @typescript-eslint/no-explicit-any */
import initLocales from '@/utils/locales'

export default async function sitemap() {
  return initLocales.map((item: any) => ({
    url: `${process.env.NEXT_PUBLIC_DOMAIN}${
      item === initLocales[0] ? '' : `/${item}`
    }`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }))
}
