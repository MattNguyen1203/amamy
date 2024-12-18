/* eslint-disable @typescript-eslint/no-explicit-any */
export default function metadataValues(res: any) {
  if (!res || !res?.yoast_head_json) {
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN!),
      title: 'NEXTJS14-OKHUB',
      description: 'NEXTJS14-OKHUB',
      alternates: {
        canonical: './',
      },
      author: 'DEV OKHUB',
    }
  }
  const result = res?.yoast_head_json

  const meta = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN!),
    title: result?.title,
    description: result?.description,
    alternates: {
      canonical: './',
    },
    author: 'DEV OKHUB',
    openGraph: {
      title: result?.og_site_name,
      description: result?.og_description,
      url: './',
      siteName: result?.og_site_name,
      images: Array.isArray(result?.og_image)
        ? [...result?.og_image]
        : result?.og_image
        ? result?.og_image
        : [],
      locale: result?.og_locale,
      type: result?.og_type,
    },
    twitter: {
      card: result?.twitter_card || 'summary_large_image',
      title: result?.title,
      description: result?.description,
      creator: 'jenho',
      images: Array.isArray(result?.og_image)
        ? [...result?.og_image]
        : result?.og_image
        ? result?.og_image
        : [],
      misc: result?.twitter_misc,
    },
  }
  if (!result?.og_image || result?.og_image?.length <= 0) {
    meta.openGraph.images.push({
      url: '/images/home/stories/background-left-story-mb.jpg',
      width: 1200,
      height: 630,
    })
    meta.twitter.images.push({
      url: '/images/home/stories/background-left-story-mb.jpg',
    })
  }

  return meta
}
