import fetchData from '@/fetch/fetchData'
import DetailCentenBlog from '@/sections/blog/detail/Index'
import RelatedBlogs from '@/sections/blog/detail/RelatedBlogs'

export default async function page({params}: {params: {slug: string}}) {
  const fetchDataDetailPost = fetchData({
    api: `post-detail-slug/${params?.slug}`,
    option: {
      next: {revalidate: 10},
    },
  })
  const fetchDataFavourite = fetchData({
    api: `options?fields=you_might_like_it`,
    option: {
      next: {revalidate: 10},
    },
  })
  const [dataDetailPost, dataFavourite] = await Promise.all([
    fetchDataDetailPost,
    fetchDataFavourite,
  ])
  return (
    <main>
      <div className='bg-white'>
        <DetailCentenBlog
          dataDetailPost={dataDetailPost}
          dataFavourite={dataFavourite?.data?.you_might_like_it}
        />
        <RelatedBlogs data={dataDetailPost?.related_posts} />
      </div>
    </main>
  )
}
