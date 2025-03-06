'use client'

import {IBlogResponse, IListServiceResponse, IServicePage} from '@/utils/type'
import ShippingHero from './section1/ShippingHero'
import AIChatSection from './section2/AIChatSection'
import Testimonials from './section2/Testimonials'
import BlogSection from './section3/BlogSection'

interface Prop {
  data: IServicePage
  listService: IListServiceResponse
  listBlog: IBlogResponse
}
const ServicePage = ({data, listService, listBlog}: Prop) => {
  return (
    <div className='w-full bg-white'>
      <ShippingHero data={data} />
      <AIChatSection
        listService={listService}
        data={data}
      />
      <Testimonials data={data} />
      <BlogSection listBlog={listBlog} />
    </div>
  )
}

export default ServicePage
