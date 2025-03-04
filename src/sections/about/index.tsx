'use client'

import AboutAmamySection from './section1/AboutAmamySection'
import WhatMakesSpecial from './section2/WhatMakesSpecial'
import QuantitySection from './section3/QuantitySection'
import Timeline from './section4/Timeline'
import BlogSection from './section5/BlogSection'

const AboutPage = () => {
  return (
    <div className='w-full bg-white'>
      <AboutAmamySection />
      <WhatMakesSpecial/>
      <QuantitySection/>
      <Timeline/>
      <BlogSection />
    </div>
  )
}

export default AboutPage
