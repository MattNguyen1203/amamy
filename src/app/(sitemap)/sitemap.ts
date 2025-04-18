import fetchData from '@/fetch/fetchData'

export default async function sitemap() {
  const [posts, orders] = await Promise.all([
    fetchData({
      api: 'all-slug-post',
    }),
    fetchData({
      api: `chieu-van-chuyen-header`,
      option: {
        next: {revalidate: 60},
      },
    }),
  ])

  const fixedPage = [
    {
      url: process.env.NEXT_PUBLIC_DOMAIN,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/about`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/blogs`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/blogs/search`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/theo-doi-van-don`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/tao-don-hang`,
      lastModified: new Date(),
      priority: 0.9,
    },
  ]
  if (posts && posts.length > 0) {
    posts.map((post) => {
      fixedPage.push({
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/blogs/${post.slug}`,
        lastModified: new Date(),
        priority: 0.8,
      })
    })
  }
  if (orders && orders.length > 0) {
    orders.map((order) => {
      fixedPage.push({
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/${order.slug}`,
        lastModified: new Date(),
        priority: 0.8,
      })
    })
  }
  return fixedPage
}
