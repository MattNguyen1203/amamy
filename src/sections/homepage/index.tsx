'use client'
import React from 'react'
import Section1 from './section1/Section1'
import Section4 from './section4.tsx'
import Section2 from './section2.tsx/Section2'
import Section3 from './section3/Section3'
import Section6 from './section6/Section6'
import Section5 from './section5.tsx/Section5'
import AIQuestion from './AIQuestion'
import { IHomePage } from '@/utils/type'

type Props = {
  res: IHomePage
}

const Homepage = ({ res }: Props) => {
  console.log(res.section3)
  return (
    <div className='w-full bg-[#EDF5FA]'>
    <AIQuestion />
    <Section1 banner={res.banner} />
    <Section2 services={res.services}  />
    <Section3 sectionCountry={res.section_country} section3={res.section3} />
    <Section4 withDHS={res.withDHS} />
    <Section5 faq={res.faq} faqs={res.faqs} />
    <Section6 />
    </div>
  )
}

export default Homepage