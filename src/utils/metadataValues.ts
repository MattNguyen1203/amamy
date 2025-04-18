/* eslint-disable @typescript-eslint/no-explicit-any */
export default function metadataValues(res: any) {
  if (!res) {
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN!),
      title: 'Amamy',
      description: 'Amamy',
      alternates: {
        canonical: './',
      },
      author: 'DEV OKHUB',
    }
  }
  const result = res
  const meta = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN!),
    title: result?.title,
    description:
      result?.description === '' ? 'Amamy' : result?.description,
    alternates: {
      canonical: './',
    },
    author: 'Amamy',
    openGraph: {
      title: result?.openGraph?.title || result?.title,
      description: result?.openGraph?.description || result?.description,
      url: './',
      siteName: result?.openGraph?.siteName || 'Amamy',
      images: Array.isArray(result?.og_image)
        ? [...result?.openGraph?.image?.url]
        : result?.openGraph?.image?.url
          ? result?.openGraph?.image?.url
          : [],
      locale: result?.openGraph?.locale,
      type: result?.openGraph?.type,
    },
    twitter: {
      card: result?.twitter || 'summary_large_image',
      title: result?.twitter?.title || result?.title,
      description: result?.twitter?.description || result?.description,
      creator: 'Amamy',
      images: Array.isArray(result?.og_image)
        ? [...result?.twitter?.image]
        : result?.twitter?.image
          ? result?.twitter?.image
          : [],
      misc: result?.twitter_misc,
    },
  }
  if (!result?.openGraph?.image?.url) {
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