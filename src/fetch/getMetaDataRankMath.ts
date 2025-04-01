import {parseRankMathHead} from '@/fetch/parseRankMathHead'
export default async function getMetaDataRankMath(slug: string) {
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
    return parseRankMathHead(data.head) // Phân tách dữ liệu head
  } catch (error) {
    console.log('🚀 ~ getMetaDataRankMath ~ error:', error)
    return null
  }
}
