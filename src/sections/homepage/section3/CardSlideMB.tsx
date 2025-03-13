import {CardServiceMB} from '@/sections/homepage/section3/CardService'
import {StrengthItem} from '@/utils/type'
import {Swiper, SwiperSlide} from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import './styles.css'
import {Pagination} from 'swiper/modules'

type CardSlideMBProps = {
  list: StrengthItem[]
}

const CardSlideMB = ({list}: CardSlideMBProps) => {
  return (
    <>
      <Swiper
        spaceBetween={12}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        slidesPerView={1.32}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          type: 'bullets',
          el: '.swiper-card-pag',
        }}
      >
        {list.map((item, index) => (
          <SwiperSlide key={index}>
            <CardServiceMB
              flag={item.flag.url}
              title={item.title || ''}
              subtitle={item.subtitle || ''}
              list_des={item.list_des || []}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='w-full mt-4'>
        <div className='swiper-card-pag flex-center space-x-1'></div>
      </div>
    </>
  )
}
export default CardSlideMB
