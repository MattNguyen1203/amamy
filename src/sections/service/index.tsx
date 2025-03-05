'use client'

import {IServicePage} from '@/utils/type'
import ShippingHero from './section1/ShippingHero'
import AIChatSection from './section2/AIChatSection'
import Testimonials from './section2/Testimonials'
import BlogSection from './section3/BlogSection'

interface Prop {
  data: IServicePage
}
const ServicePage = ({data}: Prop) => {
  return (
    <div className='w-full bg-white'>
      <ShippingHero data={data} />
      <AIChatSection data={data} />
      <Testimonials data={data} />
      <BlogSection />
    </div>
  )
}

export default ServicePage
