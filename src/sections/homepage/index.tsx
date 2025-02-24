import React from 'react'
import Section1 from './section1/Section1'
import Section4 from './section4.tsx'
import Section2 from './section2.tsx/Section2'
import Section3 from './section3/Section3'
import Section6 from './section6/Section6'
import Section5 from './section5.tsx/Section5'
import AIQuestion from './AIQuestion'

type Props = {}

const Homepage = (props: Props) => {
  return (
    <div className='w-full bg-[#EDF5FA]'>
    <AIQuestion />
    <Section1 />
    <Section2 />
    <Section3 />
    
    <Section4 />
    <Section5 />
    <Section6 />
    </div>
  )
}

export default Homepage