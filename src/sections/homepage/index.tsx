'use client'
import React from 'react'
import Section4 from './section4.tsx'
import Section3 from './section3/Section3'
import Section6 from './section6/Section6'
import Section5 from './section5.tsx/Section5'
import AIQuestion from './AIQuestion'
import {IHomePage} from '@/utils/type'
import Banner from '@/sections/homepage/banner'
import Services from '@/sections/homepage/services'

type Props = {
  res: IHomePage
}

const Homepage = ({res}: Props) => {
  return (
    <div className='w-full bg-[#EDF5FA]'>
      <AIQuestion />
      <Banner banner={res.banner} />
      <Services services={res.services} />
      <Section3
        sectionCountry={res.section_country}
        section3={res.section3}
      />
      <Section4 withDHS={res.withDHS} />
      <Section5
        faq={res.faq}
        faqs={res.faqs}
      />
      <Section6 />
    </div>
  )
}

export default Homepage
