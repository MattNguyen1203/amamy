'use client'

import RelatedBlogs from '@/sections/blog/detail/RelatedBlogs'
import {AboutWPResponse, IBlogResponse} from '@/utils/type'
import AboutAmamySection from './section1/AboutAmamySection'
import WhatMakesSpecial from './section2/WhatMakesSpecial'
import QuantitySection from './section3/QuantitySection'
import Timeline from './section4/Timeline'

interface Prop {
  res: AboutWPResponse
  listBlog: IBlogResponse
}

const AboutPage = ({res, listBlog}: Prop) => {
  return (
    <div className='w-full bg-white xsm:bg-[#f7f7f7]'>
      <AboutAmamySection data={res} />
      <WhatMakesSpecial data={res} />
      <QuantitySection data={res} />
      <Timeline data={res} />
      {/* <BlogSection listBlog={listBlog} /> */}
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
