'use client'
import {IAbout} from '@/sections/about/about.interface'
import WhatMakesSpecial from '@/sections/about/section2/WhatMakesSpecial'
import QuantitySection from '@/sections/about/section3/QuantitySection'
import RelatedBlogs from '@/sections/blog/detail/RelatedBlogs'
import Section4 from '@/sections/homepage/section4.tsx'
import {IBlogResponse} from '@/utils/type'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useEffect} from 'react'
import AboutAmamySection from './section1/AboutAmamySection'

gsap.registerPlugin(ScrollTrigger)

interface Prop {
  res: IAbout
  listBlog: IBlogResponse
}

const AboutPage = ({res, listBlog}: Prop) => {
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
    <div className='w-full bg-white xsm:bg-[#f7f7f7]'>
      <AboutAmamySection data={res?.banner} />
      <WhatMakesSpecial data={res?.amamy_special} />
      <QuantitySection data={res} />
      <Section4 withDHS={res.withDHS} />
      {Array.isArray(listBlog?.posts) && (
        <RelatedBlogs
          data={listBlog?.posts}
          title='Đồng hành cùng du học sinh'
          className='[&_.swiper-slide]:!w-[26.8125rem] xsm:[&_.swiper-slide]:!w-[16.875rem]'
        />
      )}
    </div>
  )
}

export default AboutPage
