'use client'

import * as React from 'react'
import Image from 'next/image'

import {Card, CardContent} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const testimonials = [
  {
    name: 'Le Van An',
    avatar: '/service/avatar.svg?height=40&width=40',
    rating: 5,
    review:
      'Mình đã dùng nhiều dịch vụ vận chuyển nhưng Amamy là tốt nhất. Hàng đến đúng lịch, không thất lạc, đóng gói rất chắc chắn. Rất đáng tin tưởng!',
    route: 'Vận chuyển từ Việt Nam -> Đức',
  },
  {
    name: 'Le An',
    avatar: '/service/avatar.svg?height=40&width=40',
    rating: 5,
    review:
      'Mình thường gửi hàng từ Việt Nam sang Đức cho gia đình và rất hài lòng với Amamy! Hàng đến đúng hẹn, đóng gói cẩn thận, không hư hỏng. Đội ngũ hỗ trợ nhiệt tình, hướng dẫn rõ ràng về thủ tục hải quan. Giá cả hợp lý so với chất lượng dịch vụ. Mình sẽ tiếp tục sử dụng và giới thiệu cho bạn bè!',
    route: 'Vận chuyển từ Việt Nam -> Đức',
  },
  {
    name: 'Nguyen Minh',
    avatar: '/service/avatar.svg?height=40&width=40',
    rating: 5,
    review:
      'Dịch vụ quá tuyệt! Gửi hàng dễ dàng, thủ tục rõ ràng, không lo lắng về hải quan. Giá cả hợp lý, rất đáng tin cậy!',
    route: 'Vận chuyển từ Việt Nam -> Đức',
  },
  {
    name: 'Pham Quoc Duy',
    avatar: '/service/avatar.svg?height=40&width=40',
    rating: 5,
    review:
      'Mình gửi quà cho người thân ở Đức qua Amamy và rất hài lòng! Hàng về nhanh, nguyên vẹn, nhân viên hỗ trợ tận tình. Sẽ tiếp tục sử dụng!',
    route: 'Vận chuyển từ Việt Nam -> Đức',
  },
  {
    name: 'Pham Quoc Duy',
    avatar: '/service/avatar.svg?height=40&width=40',
    rating: 5,
    review:
      'Mình gửi quà cho người thân ở Đức qua Amamy và rất hài lòng! Hàng về nhanh, nguyên vẹn, nhân viên hỗ trợ tận tình. Sẽ tiếp tục sử dụng!',
    route: 'Vận chuyển từ Việt Nam -> Đức',
  },
]

export default function Testimonials() {
  const [api, setApi] = React.useState<any>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className='py-24'>
      <div className='w-full px-4'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='mb-4 font-montserrat font-bold text-[2.5rem] leading-[3.25rem] tracking-[-0.03em] text-center'>
            Khách hàng nói gì về Amamy?
          </h2>
          <p className='font-montserrat font-medium text-[0.875rem] leading-[1.375rem] tracking-[-0.03em] text-center'>
            Chúng tôi tự hào mang đến trải nghiệm gửi hàng nhanh chóng, an toàn
            và đáng tin cậy từ <br /> Việt Nam sang Đức. Hãy cùng xem họ nói gì
            về chúng tôi!
          </p>
        </div>

        <div className='relative mt-16'>
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            className='mx-auto w-full px-[4rem]'
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className='md:basis-1/2 lg:basis-1/4 p-0 flex justify-center'
                >
                  <Card
                    className={`h-[20.5625rem] w-[20.875rem] border-none ${index % 2 === 0 ? 'bg-[#DBF5FF]' : 'bg-[#F2F2F2]'}`}
                  >
                    <CardContent className='p-[1.5rem]'>
                      <div className='mb-4 flex gap-1'>
                        {[...Array(testimonial.rating)].map((_, i) => (
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
                        ))}
                      </div>

                      <p className='mb-[2.1875rem] h-[10.4375rem] overflow-hidden text-ellipsis font-montserrat font-medium text-[0.875rem] leading-[1.3125rem] tracking-[-0.03em]'>
                        {testimonial.review}
                      </p>

                      <div className='flex items-center gap-3'>
                        <Image
                          src={'/service/avatar.svg'}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className='rounded-full object-cover w-[2.5rem] h-[2.5rem]'
                        />
                        <div>
                          <h4 className='font-montserrat font-semibold text-[1.125rem] leading-[1.4625rem] tracking-normal'>
                            {testimonial.name}
                          </h4>
                          <p className='font-montserrat font-medium text-[0.75rem] leading-[1.125rem] tracking-normal text-[#78858F]'>
                            {testimonial.route}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='absolute left-[3rem] top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border-none bg-white shadow-lg' />
            <CarouselNext className='absolute right-[3.5rem] top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border-none bg-white shadow-lg' />
          </Carousel>

          {/* Pagination Dots */}
          <div className='mt-8 flex justify-center gap-2'>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 w-8 rounded-full transition-all ${current === index ? 'bg-blue-500' : 'bg-gray-200'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
