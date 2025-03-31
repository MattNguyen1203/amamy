import ImageV2 from '@/components/image/ImageV2'
import CountryCard from '@/sections/homepage/community/CountryCard'
import {ShippingServiceObject} from '@/utils/type'
import Image from 'next/image'
import Link from 'next/link'

const MultiCountryService = ({
  sectionCountry,
}: {
  sectionCountry: ShippingServiceObject
}) => (
  <div className='fade-in-box flex h-[33.8125rem] -mt-[11.25rem] w-[88rem] ml-[6rem] items-start relative z-10 rounded-[1.25rem] overflow-hidden xsm:hidden'>
    <div className='flex flex-col items-start relative w-[21.5rem]'>
      <div className='relative self-stretch w-full h-[33.8125rem] rounded-[var(--token-8)_0px_0px_0px] bg-[#1dacff] overflow-hidden'>
        <Image
          width={600 * 2}
          height={600 * 2}
          className='size-full object-cover'
          alt='Mask group'
          src={'/homepage/icon/Service-Item-Mask-GroupV5.png'}
        />
        <div className='absolute z-10 size-full top-0 left-0 p-7 flex flex-col justify-between'>
          <p className='w-[16.625rem] text-pc-h6 text-white'>
            {sectionCountry.title}
          </p>
          <Link href={`tel:${sectionCountry.hotline}`}>
            <div className='inline-flex items-center space-x-2 px-4 py-3 bg-white rounded-[1.25rem] border-[1.5px] border-white/80'>
              <ImageV2
                alt=''
                src='/homepage/icon/PhoneCall.svg'
                width={40}
                height={40}
                className='size-[1.9375rem] object-cover'
              />
              <p className='text-[1.25rem] font-semibold leading-[1.3] tracking-[-0.0375rem] text-Blue-Primary'>
                {sectionCountry.hotline}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
    <div className='flex'>
      <div className='grid grid-cols-3 w-[50.0625] items-start gap-[0_0] '>
        {sectionCountry.list_country.map((country, index) => (
          <CountryCard
            key={index}
            name={country.country}
            icon={country.flag_img.url}
            href={`/${country.link.slug}`}
          />
        ))}
      </div>
      <div className='flex flex-col w-[16.625rem] h-[33.8125rem] items-start '>
        <CountryCard
          name={
            sectionCountry.list_country[sectionCountry.list_country.length - 1]
              .country
          }
          icon={
            sectionCountry.list_country[sectionCountry.list_country.length - 1]
              .flag_img.url
          }
          href={`/${
            sectionCountry.list_country[sectionCountry.list_country.length - 1]
              .link.slug
          }`}
        />
        <div className='relative flex-1 self-stretch w-full grow'>
          <Image
            className='absolute w-[26.1875rem] h-[22.375rem] top-[0.rem] left-[-0rem]  object-contain overflow-hidden '
            alt='Image'
            width={6200}
            height={8400}
            src={sectionCountry.background2.url}
          />
          <Image
            className='absolute w-[26.1875rem] h-[22.375rem] top-[0.rem] left-[-5.25rem] object-contain overflow-hidden '
            alt='Image'
            width={6200}
            height={8400}
            src={sectionCountry.background2_people}
          />
        </div>
      </div>
    </div>
  </div>
)

export default MultiCountryService

export const MultiCountryServiceMB = ({
  sectionCountry,
}: {
  sectionCountry: ShippingServiceObject
}) => {
  return (
    <div className='hidden xsm:block px-4 mt-10'>
      <p className='text-center mx-auto w-[16.5625rem] text-mb-h2 text-black'>
        {sectionCountry.title}
      </p>
      <div className='mt-4 grid grid-cols-2 gap-3'>
        {sectionCountry.list_country.map((country, index) => (
          <Link
            href={`/${country.link.slug}`}
            key={index}
            className='flex items-center space-x-3 h-[3.5rem] p-[0.5rem_1rem_0.5rem_0.5rem] rounded-[1.25rem] bg-white'
          >
            <ImageV2
              alt=''
              src={country.flag_img.url}
              width={100}
              height={100}
              className='size-10 object-cover rounded-full'
            />
            <p className='text-pc-sub14s text-black'>{country.country}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
