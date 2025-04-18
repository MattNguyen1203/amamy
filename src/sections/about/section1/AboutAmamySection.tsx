'use client'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import {IBannerAbout} from '@/sections/about/about.interface'

interface Prop {
  data: IBannerAbout
}

export default function AboutAmamySection({data}: Prop) {
  const statsData = data?.list_infomation
  return (
    <section className='fade-section w-full bg-[#00273C] py-16 text-white xsm:py-[2rem]'>
      <div className='w-full mx-auto px-[6rem] xsm:px-[1rem]'>
        {/* Breadcrumb */}
        <Breadcrumb
          type='blue'
          data={[{title: 'Về Amamy', slug: ''}]}
          className='xsm:hidden'
        />
        {/* Main content */}
        <div className='grid sm:grid-cols-2 gap-8 items-center'>
          {/* Left side - Heading */}
          <div>
            <p className='fade-item font-montserrat font-semibold text-[2rem]  xsm:text-[1.125rem] leading-[120%] tracking-tight'>
              {data?.subtitle}
            </p>
            <h1 className='fade-item font-montserrat font-bold text-[2.75rem] xsm:text-[1rem] xsm:leading-[1.25rem] leading-[1.3] tracking-[-0.055rem]'>
              {data?.title}
            </h1>
          </div>

          {/* Right side - Stats */}
          <div className='grid grid-cols-3 gap-[4rem] xsm:gap-[1.25rem]'>
            {Array.isArray(statsData) &&
              statsData.map((stat, index) => (
                <div
                  key={index}
                  className='fade-item text-start'
                >
                  <p className='font-montserrat font-bold text-[3.75rem] xsm:text-[1.125rem] leading-[1.2] xsm:leading-[1.315rem] tracking-[-0.15rem]'>
                    {stat?.number} {stat?.label}
                  </p>
                  <p className='font-montserrat uppercase font-semibold text-[1.125rem] xsm:text-[0.6875rem] xsm:tracking-[-0.01375rem] xsm:leading-[0.8125rem] leading-[1.6] xsm:mb-[0.5rem]'>
                    {stat?.title}
                  </p>
                  <p className='xsm:hidden font-montserrat font-medium text-[0.875rem] leading-[1.3] xsm:text-[0.75rem] xsm:leading-[1.5] tracking-[-0.02625rem] xsm:tracking-[-0.0225rem] xsm:opacity-[0.9] xsm:font-normal'>
                    {stat?.description_mb}
                  </p>
                  <p className='sm:hidden font-montserrat font-medium text-[0.875rem] leading-[1.3] xsm:text-[0.75rem] xsm:leading-[1.5] tracking-[-0.03em] xsm:tracking-[-0.0225rem] xsm:opacity-[0.9] xsm:font-normal'>
                    {stat?.description_mb}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
