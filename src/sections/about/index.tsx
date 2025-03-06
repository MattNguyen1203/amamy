'use client'

import {AboutWPResponse, IBlogResponse} from '@/utils/type'
import AboutAmamySection from './section1/AboutAmamySection'
import WhatMakesSpecial from './section2/WhatMakesSpecial'
import QuantitySection from './section3/QuantitySection'
import Timeline from './section4/Timeline'
import BlogSection from './section5/BlogSection'

interface Prop {
  res: AboutWPResponse
  listBlog: IBlogResponse
}

const AboutPage = ({res, listBlog}: Prop) => {
  return (
    <div className='w-full bg-white'>
      <AboutAmamySection data={res} />
      <WhatMakesSpecial data={res} />
      <QuantitySection data={res} />
      <Timeline data={res} />
      <BlogSection listBlog={listBlog} />
    </div>
  )
}

export default AboutPage
