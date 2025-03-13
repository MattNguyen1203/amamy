'use client'

import RelatedBlogs from '@/sections/blog/detail/RelatedBlogs'
import {IBlogResponse, IListServiceResponse, IServicePage} from '@/utils/type'
import ShippingHero from './section1/ShippingHero'
import AIChatSection from './section2/AIChatSection'
import Testimonials from './section2/Testimonials'

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

export default ServicePage
