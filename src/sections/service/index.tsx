'use client'
import RelatedBlogs from '@/sections/blog/detail/RelatedBlogs'
import {IBlogResponse, IListServiceResponse, IServicePage} from '@/utils/type'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useEffect} from 'react'
import ShippingHero from './section1/ShippingHero'
import AIChatSection from './section2/AIChatSection'
import Testimonials from './section2/Testimonials'
gsap.registerPlugin(ScrollTrigger)
interface Prop {
  data: IServicePage
  listService: IListServiceResponse
  listBlog: IBlogResponse
}
const ServicePage = ({data, listService, listBlog}: Prop) => {
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>('.fade-section').forEach((section) => {
      const items = section.querySelectorAll<HTMLElement>('.fade-item')

      items.forEach((el, index) => {
        const duration = parseFloat(el.dataset.duration ?? '1')
        const delay = parseFloat(el.dataset.delay ?? (0.3 * index).toString())

        gsap.fromTo(
          el,
          {autoAlpha: 0, y: 50},
          {
            autoAlpha: 1,
            y: 0,
            duration,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              once: true,
              // markers: true,
            },
          },
        )
      })
    })
  }, [])
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
          className='bg-[#EDF5FA] [&_.ItemBlog]:shadow-none xsm:bg-[#F8F8FB] [&_.swiper-slide]:!w-[26.8125rem] xsm:[&_.swiper-slide]:!w-[16.875rem]'
        />
      )}
    </div>
  )
}

export default ServicePage
