import Link from 'next/link'

const statsData = [
  {
    value: '04+',
    title: 'NĂM HOẠT ĐỘNG',
    description: 'Amamy được thành lập từ năm 2021',
  },
  {
    value: '03+',
    title: 'ĐỐI TÁC',
    description: 'Tại các quốc gia như Đức, Mỹ, Nhật',
  },
  {
    value: '10K+',
    title: 'KHÁCH HÀNG',
    description: 'Đã tin tưởng sử dụng dịch vụ của Amamy',
  },
]

export default function AboutAmamySection() {
  return (
    <section className='w-full bg-[#38b6ff] py-16 text-white'>
      <div className='w-full mx-auto px-[6rem]'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 mb-12 text-sm md:text-base'>
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
              Xin Chào!
            </h1>
            <h2 className='font-montserrat font-bold text-[3rem] leading-[3.9rem] tracking-[-0.02em]'>
              Chúng Tôi Là Amamy
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
                  {stat.value}
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
