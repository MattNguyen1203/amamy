import {AboutWPResponse} from '@/utils/type'
import Link from 'next/link'

interface Prop {
  data: AboutWPResponse
}

export default function AboutAmamySection({data}: Prop) {
  const statsData = data.acf.banner.list_infomation
  return (
    <section className='w-full bg-[#38b6ff] py-16 text-white'>
      <div className='w-full mx-auto px-[6rem] xsm:px-[1rem]'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 mb-12 text-sm md:text-base xsm:hidden'>
          <Link
            href='/'
            className='hover:underline'
          >
            Trang chủ
          </Link>
          <span>/</span>
          <Link
            href='/about'
            className='hover:underline'
          >
            Về Amamy
          </Link>
        </div>

        {/* Main content */}
        <div className='grid sm:grid-cols-2 gap-8 items-center'>
          {/* Left side - Heading */}
          <div>
            <h1 className='font-montserrat font-semibold text-[2.5rem] leading-[3.25rem] tracking-tight'>
              {data.acf.banner.subtitle}
            </h1>
            <h2 className='font-montserrat font-bold text-[3rem] leading-[3.9rem] tracking-[-0.02em]'>
              {data.acf.banner.title}
            </h2>
          </div>

          {/* Right side - Stats */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-[4rem]'>
            {statsData.map((stat, index) => (
              <div
                key={index}
                className='text-start'
              >
                <p className='font-montserrat font-bold text-[4rem] leading-[4.8rem] tracking-[-0.04em]'>
                  {stat.number} {stat.label}
                </p>
                <p className='font-montserrat font-bold text-[1.25rem] leading-[1.5rem] tracking-[-0.04em]'>
                  {stat.title}
                </p>
                <p className='font-montserrat font-medium text-[1rem] leading-[1.3rem] tracking-[-0.03em]'>
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
