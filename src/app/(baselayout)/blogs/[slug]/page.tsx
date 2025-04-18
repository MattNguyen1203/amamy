/* eslint-disable @typescript-eslint/no-explicit-any */
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import fetchData from '@/fetch/fetchData'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import getSchemaMarkup from '@/fetch/getSchemaMarkup'
import DetailCentenBlog from '@/sections/blog/detail/Index'
import RelatedBlogs from '@/sections/blog/detail/RelatedBlogs'
import metadataValues from '@/utils/metadataValues'
export async function generateStaticParams() {
  const posts = await fetchData({
    api: 'all-slug-post',
  })
  return posts.map((post: any) => ({
    slug: post.slug,
  }))
}
export async function generateMetadata({params}: {params: {slug: string}}) {
  const res = await getMetaDataRankMath(params?.slug)
  return metadataValues(res)
}
export default async function page({params}: {params: {slug: string}}) {
  const fetchDataDetailPost = fetchData({
    api: `post-detail-slug/${params?.slug}`,
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchDataFavourite = fetchData({
    api: `options?fields=you_might_like_it`,
    option: {
      next: {revalidate: 60},
    },
  })
  const [dataDetailPost, dataFavourite, schemaData] = await Promise.all([
    fetchDataDetailPost,
    fetchDataFavourite,
    getSchemaMarkup(params?.slug),
  ])
  return (
    <main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData, null, 2)}}
      ></script>
      <div className='bg-white'>
        <Breadcrumb
          data={[
            {title: 'Hữu ích cho gửi hàng', slug: '/blogs'},
            {title: dataDetailPost?.post?.title ?? 'Bài Viết', slug: ''},
          ]}
          className='sm:px-[5rem] xsm:px-[1rem] xsm:pb-[1.5rem]'
        />
        <DetailCentenBlog
          dataDetailPost={dataDetailPost}
          dataFavourite={dataFavourite?.data?.you_might_like_it}
        />
        <RelatedBlogs
          data={dataDetailPost?.related_posts}
          className='[&_.ItemBlog]:!shadow-none'
        />
      </div>
    </main>
  )
}
