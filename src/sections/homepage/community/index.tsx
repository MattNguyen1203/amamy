'use client'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import CardService from '@/sections/homepage/community/CardService'
import CardSlideMB from '@/sections/homepage/community/CardSlideMB'
import MultiCountryService, {
  MultiCountryServiceMB,
} from '@/sections/homepage/community/MultiCountryService'
import {ShippingServiceObject, StrengthsObject} from '@/utils/type'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'

type Props = {
  sectionCountry: ShippingServiceObject
  section3: StrengthsObject
}

const Community = ({sectionCountry, section3}: Props) => {
  const isMobile = useIsMobile()
  useGSAP(() => {
    gsap.from('.fade-in-box-card-service-1', {
      scrollTrigger: {
        trigger: '.fade-in-box-card-service-1',
        start: 'top 70%',
      },
      opacity: 0,
      y: 50,
      delay: 0.2,
      duration: 1.5,
      stagger: 0.2,
    })
  }, [])

  return (
    <div className='xsm:bg-[#F8F8FB] pb-[1.5rem]'>
      <div className='w-full flex xsm:flex-col'>
        {!isMobile && (
          <div className='sm:absolute sm:z-[1] sm:left-0 w-[27.5rem] h-[65.1875rem] bg-background-elevation5 shadow-[0px_14px_24px_#0004500a] xsm:hidden'>
            <div className='fade-in-box-card-service-1 pt-[9.44rem] pl-[5.94rem] pr-12'>
              <p className='text-pc-h1 text-black'>{section3.title}</p>
              <p className='mt-4 text-pc-sub16m'>{section3.subtitle}</p>
            </div>
          </div>
        )}
        {isMobile && (
          <div className='hidden xsm:block'>
            <div className='flex flex-col items-start gap-[.5rem] relative mx-[1rem]'>
              <p
                dangerouslySetInnerHTML={{__html: section3.title}}
                className='text-[1.25rem] not-italic font-bold leading-[120%] sm:[&_br]:hidden'
              ></p>
              <p className='text-[0.875rem] not-italic font-medium leading-[150%]'>
                {section3.subtitle}
              </p>
            </div>
          </div>
        )}
        {!isMobile && (
          <div className='flex-1 pt-[9.62rem] h-[53.9375rem] bg-Blue-100 pl-[4.5rem] relative xsm:hidden'>
            <ImageV2
              alt=''
              width={1000}
              height={1000}
              src='/homepage/map.webp'
              className='size-full object-cover absolute top-0 left-0'
            />
            <div className='flex sm:justify-end sm:pr-[5rem] space-x-4 relative z-10'>
              <CardService
                flag={section3.list_strengths.item_1.flag.url}
                title={section3.list_strengths.item_1.title || ''}
                header={section3.list_strengths.item_1.header || ''}
                subtitle={section3.list_strengths.item_1.subtitle || ''}
                list_des={section3.list_strengths.item_1.list_des || []}
                href={section3.list_strengths.item_1.link_group_fb}
                className='fade-in-box-card-service-1'
              />
              <CardService
                flag={section3.list_strengths.item_2.flag.url}
                title={section3.list_strengths.item_2.title || ''}
                header={section3.list_strengths.item_2.header || ''}
                subtitle={section3.list_strengths.item_2.subtitle || ''}
                list_des={section3.list_strengths.item_2.list_des || []}
                href={section3.list_strengths.item_2.link_group_fb}
                className='fade-in-box-card-service-1'
              />
              <CardService
                flag={section3.list_strengths.item_3.flag.url}
                title={section3.list_strengths.item_3.title || ''}
                header={section3.list_strengths.item_3.header || ''}
                subtitle={section3.list_strengths.item_3.subtitle || ''}
                list_des={section3.list_strengths.item_3.list_des || []}
                href={section3.list_strengths.item_3.link_group_fb}
                className='fade-in-box-card-service-1'
              />
            </div>
          </div>
        )}
        {isMobile && (
          <div className='pt-4 xsm:block hidden'>
            <CardSlideMB
              list={[
                section3.list_strengths.item_1,
                section3.list_strengths.item_2,
                section3.list_strengths.item_3,
              ]}
            />
          </div>
        )}
      </div>
      {!isMobile ? (
        <MultiCountryService sectionCountry={sectionCountry} />
      ) : (
        <MultiCountryServiceMB sectionCountry={sectionCountry} />
      )}
    </div>
  )
}

export default Community
