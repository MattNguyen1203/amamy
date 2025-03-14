import {IAbout} from '@/sections/about/about.interface'
import WhatMakesSpecial from '@/sections/about/section2/WhatMakesSpecial'
import QuantitySection from '@/sections/about/section3/QuantitySection'
import RelatedBlogs from '@/sections/blog/detail/RelatedBlogs'
import Section4 from '@/sections/homepage/section4.tsx'
import {IBlogResponse} from '@/utils/type'
import AboutAmamySection from './section1/AboutAmamySection'

interface Prop {
  res: IAbout
  listBlog: IBlogResponse
}

const AboutPage = ({res, listBlog}: Prop) => {
  return (
    <div className='w-full bg-white xsm:bg-[#f7f7f7]'>
      <AboutAmamySection data={res?.banner} />
      <WhatMakesSpecial data={res?.amamy_special} />
      <QuantitySection data={res} />
      <Section4 withDHS={res.withDHS} />
      {Array.isArray(listBlog?.posts) && (
        <RelatedBlogs
          data={listBlog?.posts}
          title='Các tin tức mới nhất'
          className='[&_.swiper-slide]:!w-[26.8125rem] xsm:[&_.swiper-slide]:!w-[16.875rem]'
        />
      )}
    </div>
  )
}

export default AboutPage
