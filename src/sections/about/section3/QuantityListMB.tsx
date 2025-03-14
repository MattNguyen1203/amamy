/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {IAmamyQualityAbout_ListQuality} from '@/sections/about/about.interface'
import React from 'react'
import CoreValueCard from './CoreValueCard'

interface Prop {
  quantities: IAmamyQualityAbout_ListQuality[]
}

const QuantityListMB = ({quantities}: Prop) => {
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
    <>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        className='mx-auto w-full xsm:px-0'
      >
        <CarouselContent className='xsm:ml-0'>
          {Array.isArray(quantities) &&
            quantities?.map((quantity, index) => (
              <CarouselItem
                key={index}
                className='md:basis-1/2 p-0 flex justify-center'
              >
                <CoreValueCard
                  imageSrc={quantity.image.url}
                  imageAlt={quantity.image.alt}
                  label={quantity.subtitle}
                  title={quantity.title}
                  description={quantity.description}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className='absolute xsm:hidden left-[3rem] top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border-none bg-white shadow-lg' />
        <CarouselNext className='absolute xsm:hidden right-[3.5rem] top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border-none bg-white shadow-lg' />
      </Carousel>

      <div className='mt-8 flex justify-center gap-2 xsm:mt-[1rem] xsm:mb-[2.5rem]'>
        {Array.isArray(quantities) &&
          quantities.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-[0.25rem] w-[1rem] rounded-full transition-all ${
                current === index ? 'bg-[#1F648C]' : 'bg-gray-200'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
      </div>
    </>
  )
}

export default QuantityListMB
