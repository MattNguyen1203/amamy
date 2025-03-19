/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import * as React from 'react'

import ImageV2 from '@/components/image/ImageV2'
import {Card, CardContent} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {IServicePage} from '@/utils/type'

interface Prop {
  data: IServicePage
}
export default function Testimonials({data}: Prop) {
  const [api, setApi] = React.useState<any>()
  const [current, setCurrent] = React.useState(0)
  const testimonials = data?.feedback_customer?.list_feedback

  React.useEffect(() => {
    if (!api) {
      return
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className='py-24 xsm:py-[1.5rem] mt-[3.75rem] xsm:mt-5'>
      <div className='w-full px-4 xsm:px-[1rem]'>
        <div className='fade-section mx-auto max-w-2xl text-center'>
          <h2 className='fade-item mb-4 xsm:mb-[1rem] font-montserrat font-bold text-[2.5rem] xsm:text-[1.25rem] leading-[120%] tracking-[-0.03em] text-center'>
            {data?.feedback_customer?.title}
          </h2>
          <p
            dangerouslySetInnerHTML={{
              __html: data?.feedback_customer?.subtitle,
            }}
            className='fade-item font-montserrat font-medium text-[0.875rem] leading-[1.375rem] tracking-[-0.03em] text-center'
          ></p>
        </div>

        <div className='relative mt-16 xsm:mt-[1rem] fade-section'>
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            className='mx-auto w-full px-[4rem] xsm:px-0'
          >
            <CarouselContent className='xsm:ml-0'>
              {Array.isArray(testimonials) &&
                testimonials?.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className='fade-item md:basis-1/2 lg:basis-1/4 p-0 flex justify-center'
                  >
                    <Card
                      className={`h-[20.5625rem] w-[20.875rem] border-none relative ${
                        index % 2 === 0 ? 'bg-[#DBF5FF]' : 'bg-[#F2F2F2]'
                      }`}
                    >
                      <ImageV2
                        alt=''
                        width={200}
                        height={200}
                        src='/homepage/review-mask.webp'
                        className='absolute top-0 left-0 size-full sm:hidden object-cover'
                      />
                      <CardContent className='p-[1.5rem] relative z-10'>
                        <div className='mb-4 flex gap-1'>
                          {Array.from({length: Number(testimonial.rating)}).map(
                            (_, i) => (
                              <svg
                                width='22'
                                key={i}
                                height='22'
                                viewBox='0 0 22 22'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M10.6326 0.853098C10.7715 0.530712 11.2285 0.530712 11.3674 0.853097L14.1506 7.31608C14.2085 7.45055 14.3353 7.54264 14.4811 7.55616L21.4878 8.20602C21.8373 8.23843 21.9786 8.67316 21.7149 8.90482L16.4283 13.549C16.3183 13.6456 16.2699 13.7946 16.3021 13.9375L17.8492 20.8021C17.9264 21.1445 17.5566 21.4132 17.2548 21.234L11.2042 17.6413C11.0783 17.5665 10.9217 17.5665 10.7958 17.6413L4.74523 21.234C4.44342 21.4132 4.07362 21.1445 4.1508 20.8021L5.69795 13.9375C5.73014 13.7946 5.68172 13.6456 5.57173 13.549L0.285139 8.90482C0.0214342 8.67316 0.162684 8.23843 0.512193 8.20602L7.51893 7.55616C7.66471 7.54264 7.79146 7.45055 7.84937 7.31608L10.6326 0.853098Z'
                                  fill='#FFC669'
                                />
                              </svg>
                            ),
                          )}
                        </div>

                        <p
                          dangerouslySetInnerHTML={{
                            __html: testimonial.content,
                          }}
                          className='mb-[2.1875rem] h-[10.4375rem] overflow-hidden text-ellipsis font-montserrat font-medium text-[0.875rem] leading-[1.3125rem] tracking-[-0.03em]'
                        ></p>

                        <div className='flex items-center gap-3'>
                          <Image
                            src={testimonial.author.avatar.url}
                            alt={testimonial.author.avatar.alt}
                            width={40}
                            height={40}
                            className='rounded-full object-cover w-[2.5rem] h-[2.5rem]'
                          />
                          <div>
                            <h4 className='font-montserrat font-semibold text-[1.125rem] leading-[1.4625rem] tracking-normal'>
                              {testimonial.author.name}
                            </h4>
                            <p className='font-montserrat font-medium text-[0.75rem] leading-[1.125rem] tracking-normal text-[#78858F]'>
                              {testimonial.author.position}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='absolute xsm:hidden left-[3rem] top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border-none bg-white shadow-lg' />
            <CarouselNext className='absolute xsm:hidden right-[3.5rem] top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border-none bg-white shadow-lg' />
          </Carousel>

          {/* Pagination Dots */}
          <div className='mt-10 flex justify-center space-x-[0.375rem] xsm:space-x-2'>
            {Array.isArray(testimonials) &&
              testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-[0.25rem] w-10 xsm:w-4 rounded-full transition-all ${
                    current === index ? 'bg-[#1F648C]' : 'bg-gray-200'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
