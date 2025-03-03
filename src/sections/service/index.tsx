'use client'

import ShippingHero from './section1/ShippingHero'
import AIChatSection from './section2/AIChatSection'
import Testimonials from './section2/Testimonials'
import BlogSection from './section3/BlogSection'

const ServicePage = () => {
  return (
    <div className='w-full bg-white'>
      <ShippingHero />
      <AIChatSection />
      <Testimonials />
      <BlogSection />
    </div>
  )
}

export default ServicePage
