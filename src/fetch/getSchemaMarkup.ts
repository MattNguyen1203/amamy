import {parseRankMathHead} from '@/fetch/parseRankMathHead'

export default async function getSchemaMarkup(slug: string) {
  try {
    const res = await fetch(
      `${process.env.RANKMATH_API}/getHead?url=${process.env.CMS_DOMAIN}/${slug}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 600,
        },
      },
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.success || !data?.head) return null
    const schemaMarkup = parseRankMathHead(data.head)
    if (schemaMarkup?.schemaMarkup) {
      const updatedSchemaMarkup = JSON.parse(
        JSON.stringify(schemaMarkup.schemaMarkup)
          .replaceAll(process.env.CMS_DOMAIN!, process.env.NEXT_PUBLIC_DOMAIN!)
          .replaceAll(
            process.env.NEXT_PUBLIC_DOMAIN! + '/author/ad_okhub/',
            'https://okhub.vn/',
          )
          .replaceAll(
            process.env.NEXT_PUBLIC_DOMAIN! + '/wp-content/',
            process.env.CMS_DOMAIN! + '/wp-content/',
          )
          .replaceAll(
            process.env.CMS_DOMAINV2!,
            process.env.NEXT_PUBLIC_DOMAIN!,
          ),
      )
      return updatedSchemaMarkup
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
