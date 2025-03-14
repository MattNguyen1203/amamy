'use client'
import React from 'react'
import Section4 from './section4.tsx'
import Section5 from './section5.tsx/Section5'
import {IHomePage} from '@/utils/type'
import Banner from '@/sections/homepage/banner'
import Services from '@/sections/homepage/services'
import RelatedBlogs from '@/sections/blog/detail/RelatedBlogs'
import Community from '@/sections/homepage/community/'
import {IItemPostBlog} from '@/sections/blog/blogs.interface'

type Props = {
  res: IHomePage
  dataBlog: IItemPostBlog[]
}

const Homepage = ({res, dataBlog}: Props) => {
  return (
    <div className='w-full bg-[#EDF5FA]'>
      <Banner banner={res.banner} />
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
          className='[&_.swiper-slide]:!w-[26.8125rem] xsm:[&_.swiper-slide]:!w-[16.875rem]'
        />
      )}
    </div>
  )
}

export default Homepage
