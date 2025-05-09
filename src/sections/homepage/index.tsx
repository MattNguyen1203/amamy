import {IItemPostBlog} from '@/sections/blog/blogs.interface'
import RelatedBlogs from '@/sections/blog/detail/RelatedBlogs'
import Banner from '@/sections/homepage/banner'
import Community from '@/sections/homepage/community/'
import Services from '@/sections/homepage/services'
import {IHomePage} from '@/utils/type'
import Section4 from './section4.tsx'
import Section5 from './section5.tsx/Section5'

type Props = {
  res: IHomePage
  dataBlog: IItemPostBlog[]
  chatBoxAiData: {
    title: string
    customer_chat: string
    ai_chat: string
    link_chat_ai: string
  }
}

const Homepage = ({res, dataBlog, chatBoxAiData}: Props) => {
  return (
    <div className='w-full bg-[#EDF5FA] xsm:bg-[#F8F8FB]'>
      <h1 className='fixed z-[-1] pointer-events-none opacity-0'>Amamy</h1>
      <Banner
        banner={res.banner}
        boxChatAI={{
          ...res.chat_box_ai,
          link_chat_ai: chatBoxAiData.link_chat_ai,
        }}
      />
      <Services services={res.services} />
      <Community
        sectionCountry={res.section_country}
        section3={res.section3}
      />
      <Section4 withDHS={res.withDHS} />
      <Section5 faqs={res?.faq} />
      {/* <Section6 /> */}
      {Array.isArray(dataBlog) && (
        <RelatedBlogs
          data={dataBlog}
          title='Các tin tức mới nhất'
          className='[&_.ItemBlog]:shadow-none [&_.swiper-slide]:!w-[26.8125rem] xsm:[&_.swiper-slide]:!w-[16.875rem]'
        />
      )}
    </div>
  )
}

export default Homepage
