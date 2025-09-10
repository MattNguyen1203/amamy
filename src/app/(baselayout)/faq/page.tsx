import fetchData from '@/fetch/fetchData'
import fetchDataWP from '@/fetch/fetchDataWP'
import getMetaDataRankMath from '@/fetch/getMetaDataRankMath'
import FAQ from '@/sections/amamy/faq/FAQ'
import Hero from '@/sections/amamy/hero/Hero'
import Process from '@/sections/amamy/process/Process'
import Reason from '@/sections/amamy/reason/Reason'
import {IItemPostBlog} from '@/sections/blog/blogs.interface'
import RelatedBlogs from '@/sections/blog/detail/RelatedBlogs'
import Banner from '@/sections/homepage/banner'
import metadataValues from '@/utils/metadataValues'

type BlogPost = {
  ID: number
  title: string
  slug: string
  date: string
  thumbnail: string
  categories: string[]
}

export async function generateMetadata() {
  const res = await getMetaDataRankMath('')
  return metadataValues(res)
}

const page = async () => {
  const fetchBanner = fetchData({
    api: 'pages/11',
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchChatBoxAI = fetchData({
    api: 'options?fields=box_chat_ai',
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchDeliveryDirection = fetchData({
    api: 'chieu-van-chuyen',
    method: 'GET',
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchCurrencyExchangeRate = fetchData({
    api: 'options?fields=currency_to_usd',
    method: 'GET',
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchDataFaqs = fetchDataWP({
    api: 'pages/8647?_fields=acf&acf_format=standard',
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchDataServices = fetchData({
    api: `chieu-van-chuyen-header`,
    option: {
      next: {revalidate: 60},
    },
  })
  const fetchDataBlogs = fetchData({
    api: 'chieu-van-chuyen/tu-viet-nam-sang-phap?_fields=suggested_reading_articles_about_shipping',
    option: {
      next: {revalidate: 60},
    },
  })

  const [
    dataBanner,
    chatBoxAiData,
    deliveryDirectionData,
    currencyExchangeRateData,
    dataFaqs,
    dataServices,
    dataBlogs,
  ] = await Promise.all([
    fetchBanner,
    fetchChatBoxAI,
    fetchDeliveryDirection,
    fetchCurrencyExchangeRate,
    fetchDataFaqs,
    fetchDataServices,
    fetchDataBlogs,
  ])

  const mapBlogPosts = (posts: BlogPost[]): IItemPostBlog[] => {
    if (!Array.isArray(posts)) return []
    return posts.map((post) => ({
      title: post.title,
      date: post.date,
      slug: post.slug,
      image: {
        url: post.thumbnail,
        alt: post.title,
      },
      categories: post.categories?.[0] || '',
    }))
  }

  const blogsMapped = mapBlogPosts(
    dataBlogs?.suggested_reading_articles_about_shipping?.post || [],
  )

  return (
    <main className='overflow-hidden bg-white'>
      <Hero data={dataFaqs?.acf?.banner} />
      <FAQ
        data={dataFaqs?.acf?.faq}
        dataServices={dataServices}
      />
      <Banner
        dataFaqs={dataFaqs?.acf?.trackandprice}
        banner={dataBanner.banner}
        boxChatAI={{
          ...dataBanner.chat_box_ai,
          link_chat_ai: chatBoxAiData?.data?.box_chat_ai.link_chat_ai,
        }}
        deliveryDirectionData={deliveryDirectionData}
        currencyExchangeRateData={currencyExchangeRateData}
        isFaq={true}
      />
      <Reason data={dataFaqs?.acf?.reason} />
      <Process data={dataFaqs?.acf?.procedure} />
      {Array.isArray(
        dataBlogs?.suggested_reading_articles_about_shipping?.post,
      ) && (
        <RelatedBlogs
          data={blogsMapped}
          title={dataBlogs.suggested_reading_articles_about_shipping.title}
          className='[&_.ItemBlog]:shadow-none [&_.swiper-slide]:!w-[26.8125rem] xsm:[&_.swiper-slide]:!w-[16.875rem]'
        />
      )}
    </main>
  )
}

export default page
