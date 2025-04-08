import ICArraw from '@/components/icon/ICArraw'
import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import {suggested_reading_articles_about_shipping_post} from '@/utils/type'
import Link from 'next/link'

export default function ItemBlogV2({
  item,
  className,
  type = 'unhover',
}: {
  item: suggested_reading_articles_about_shipping_post
  className?: string
  type?: 'unhover' | 'hover'
}) {
  const date = new Date(item?.date)

  // Lấy ngày, tháng và năm
  const day = String(date.getDate()).padStart(2, '0') // Đảm bảo luôn có 2 chữ số
  const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0 nên cần +1
  const year = date.getFullYear()

  // Định dạng thành chuỗi dd/MM/yyyy
  const formattedDate = `${day}/${month}/${year}`
  return (
    <Link
      href={'/blogs/' + item?.slug}
      className={cn(
        'fade-item ItemBlog group w-full flex flex-col h-[24.375rem] xsm:h-[18.19181rem] rounded-[1.25rem] bg-[#F8F8F8] overflow-hidden',
        className,
      )}
    >
      <div className='warpper-image h-[15.625rem] xsm:h-[12.96894rem] w-full relative overflow-hidden rounded-t-[1.25rem] xsm:rounded-t-[0.5rem]'>
        <ImageV2
          alt={item?.title}
          src={item?.thumbnail ?? '/detail-card-post.jpg'}
          width={478}
          height={258}
          className='size-full object-cover rounded-t-[1.25rem] xsm:rounded-t-[0.5rem] sm:group-hover:scale-[1.2] transition-all duration-500'
        />
        <div
          className={cn(
            'absolute top-[0.5rem] left-[0.5rem]',
            type === 'hover' &&
              'sm:opacity-0 sm:group-hover:opacity-[100] transition-all duration-500',
          )}
        >
          <div className='absolute inset-0 bg-[rgba(19,37,82,0.50)] xsm:bg-[rgba(4,24,77,0.50)] backdrop-blur-[6.449999809265137px] rounded-[1.25rem]'></div>
          <p className='relative z-10 text-white text-pc-sub12s xsm:text-[0.5rem] xsm:font-semibold xsm:tracking-[-0.01rem] uppercase p-[0.75rem_1rem] xsm:p-[0.5rem] rounded-[1.25rem]'>
            {item?.categories}
          </p>
        </div>
      </div>
      <div className='itembox-content p-[1.5rem] xsm:p-[0.75rem] flex-1 flex-col flex justify-between items-start'>
        <h3 className='line-clamp-2 text-pc-sub16s xsm:text-pc-sub12s text-[#000]'>
          {item?.title}
        </h3>
        <div className='flex justify-between w-full items-center'>
          <div className='flex space-x-[0.5rem]'>
            {/* <ICCalendar className='size-[1.25rem] object-contain xsm:size-[1rem]' /> */}
            <p className='text-pc-sub12m text-greyscale-text60 xsm:text-mb-sub10m'>
              {formattedDate}
            </p>
          </div>
          <ICArraw className='size-[1.66669rem] object-contain xsm:size-[1.5rem]' />
        </div>
      </div>
    </Link>
  )
}
