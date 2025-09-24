import React from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'
import ICArrowRight from '@/components/icon/ICArrowRight'

const Hero = ({heroData}: {heroData: any}) => {
  useGSAP(() => {
    gsap.from('.fade-in-hero', {
      scrollTrigger: {
        trigger: '.fade-in-hero',
        start: 'top bottom',
      },
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.2,
    })
  }, [])

  const handleScrollToLink = (e) => {
    e.preventDefault()
    if (heroData?.link?.url && heroData?.link?.url.startsWith('#')) {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: {
          y: heroData?.link?.url,
          offsetY: 80,
        }, // có thể là element hoặc tọa độ số
        ease: 'power2.inOut',
      })
    }
  }

  return (
    <div className='flex w-full flex-shrink-0 flex-col items-center bg-[#38B6FF] px-0 py-10 sm:px-[6rem] sm:pb-[5rem] sm:pt-[4rem]'>
      <div className='mb-8 flex w-full flex-col items-center px-4 sm:mb-[2.5rem]'>
        <h2 className='mb-3 text-center font-montserrat text-[1.5rem] font-bold leading-[120%] tracking-[-0.115rem] text-white sm:mb-[1rem] sm:text-[2.875rem]'>
          {heroData?.heading}
        </h2>
        <p className='text-center font-montserrat text-[0.875rem] font-medium leading-[150%] tracking-[-0.03rem] text-[var(--greyscaletext-inverse-body-80,rgba(255,255,255,0.80))] sm:w-[41.25rem] sm:text-base'>
          {heroData?.description}
        </p>
      </div>
      {heroData?.link && (
        <Link
          {...(heroData?.link?.url &&
            heroData?.link?.url.startsWith('#') && {
              onClick: handleScrollToLink,
            })}
          href={heroData?.link?.url || '#'}
          target={heroData?.link?.target || '_self'}
          className='flex w-[21.4375rem] items-center justify-center gap-[0.75rem] rounded-[1.375rem] bg-white px-8 py-3 sm:w-[23.75rem] sm:rounded-[1.5rem] sm:px-[2rem] sm:py-[1rem]'
        >
          <span className='font-montserrat text-base font-medium leading-[1.56rem] tracking-[-0.036rem] text-[var(--Color-1,#38B6FF)] sm:text-[1.2rem]'>
            {heroData?.link?.title}
          </span>
          <ICArrowRight className='size-[0.85rem] stroke-Blue-Primary sm:size-[1rem]' />
        </Link>
      )}
    </div>
  )
}

export default Hero
