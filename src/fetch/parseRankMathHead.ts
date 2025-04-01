export function parseRankMathHead(headHtml: string) {
  function getMetaContent(property: string) {
    const regex = new RegExp(`<meta[^>]+${property}[^>]+content="([^"]+)"`, 'i')
    const match = headHtml.match(regex)
    return match ? match[1] : ''
  }

  function getLinkHref(rel: string) {
    const regex = new RegExp(`<link[^>]+rel="${rel}"[^>]+href="([^"]+)"`, 'i')
    const match = headHtml.match(regex)
    return match ? match[1] : ''
  }

  return {
    title: headHtml.match(/<title>(.*?)<\/title>/)?.[1] || '',
    description: getMetaContent('name="description"'),
    canonical: getLinkHref('canonical'),
    openGraph: {
      title: getMetaContent('property="og:title"'),
      description: getMetaContent('property="og:description"'),
      url: getMetaContent('property="og:url"'),
      siteName: getMetaContent('property="og:site_name"'),
      locale: getMetaContent('property="og:locale"'),
      type: getMetaContent('property="og:type"'),
      image: {
        url: getMetaContent('property="og:image"'),
        width: getMetaContent('property="og:image:width"'),
        height: getMetaContent('property="og:image:height"'),
        alt: getMetaContent('property="og:image:alt"'),
      },
    },
    twitter: {
      card: getMetaContent('name="twitter:card"'),
      title: getMetaContent('name="twitter:title"'),
      description: getMetaContent('name="twitter:description"'),
      image: getMetaContent('name="twitter:image"'),
    },
  }
}
