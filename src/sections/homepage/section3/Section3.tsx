import {ShippingServiceObject, StrengthsObject} from '@/utils/type'
import Section35 from './Section3.5'
import Section35Mobile from './Section35Mobile'
import ImageV2 from '@/components/image/ImageV2'
import CardService from '@/sections/homepage/section3/CardService'
import CardSlideMB from '@/sections/homepage/section3/CardSlideMB'

type Props = {
  sectionCountry: ShippingServiceObject
  section3: StrengthsObject
}

const Section3 = ({sectionCountry, section3}: Props) => {
  return (
    <div>
      <div className='w-full flex xsm:flex-col'>
        {/* pc */}
        <div className='w-[27.5rem] h-[65.1875rem] bg-background-elevation5 shadow-[0px_14px_24px_#0004500a] xsm:hidden'>
          <div className='pt-[9.44rem] pl-[5.94rem] pr-12'>
            <p className='text-pc-h1 text-black'>{section3.title}</p>
            <p className='mt-4 text-pc-sub16m'>{section3.subtitle}</p>
          </div>
        </div>
        {/* mb */}
        <div className='hidden xsm:block'>
          <div className='flex flex-col items-start gap-[.5rem] relative mx-[1rem]'>
            <p className='text-[1.25rem] not-italic font-bold leading-[120%]'>
              {section3.title}
            </p>
            <p className='text-[0.875rem] not-italic font-medium leading-[150%]'>
              {section3.subtitle}
            </p>
          </div>
        </div>

        {/* pc */}
        <div className='flex-1 pt-[9.62rem] bg-Blue-100 pl-[4.5rem] relative xsm:bg-transparent xsm:pt-[1rem] xsm:pl-[1rem] xsm:hidden'>
          <ImageV2
            alt=''
            width={1000}
            height={1000}
            src='/homepage/map.webp'
            className='size-full object-cover absolute top-0 left-0'
          />
          <div className='flex space-x-4 relative z-10'>
            <CardService
              flag={section3.list_strengths.item_1.flag.url}
              title={section3.list_strengths.item_1.title || ''}
              subtitle={section3.list_strengths.item_1.subtitle || ''}
              list_des={section3.list_strengths.item_1.list_des || []}
            />
            <CardService
              flag={section3.list_strengths.item_1.flag.url}
              title={section3.list_strengths.item_1.title || ''}
              subtitle={section3.list_strengths.item_1.subtitle || ''}
              list_des={section3.list_strengths.item_1.list_des || []}
            />
            <CardService
              flag={section3.list_strengths.item_1.flag.url}
              title={section3.list_strengths.item_1.title || ''}
              subtitle={section3.list_strengths.item_1.subtitle || ''}
              list_des={section3.list_strengths.item_1.list_des || []}
            />
          </div>
        </div>

        {/* mb */}
        <div className='pt-4 xsm:block hidden'>
          <CardSlideMB
            list={[
              section3.list_strengths.item_1,
              section3.list_strengths.item_1,
              section3.list_strengths.item_1,
            ]}
          />
        </div>
      </div>
      <Section35 sectionCountry={sectionCountry} />
      <Section35Mobile sectionCountry={sectionCountry} />
    </div>
  )
}

export default Section3
