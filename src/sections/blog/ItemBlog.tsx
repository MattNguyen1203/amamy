import ICArraw from '@/components/icon/ICArraw'
import ICCalendar from '@/components/icon/ICCalendar'
import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import {IItemPostBlog} from '@/sections/blog/blogs.interface'
import Link from 'next/link'

export default function ItemBlog({
  item,
  className,
}: {
  item: IItemPostBlog
  className?: string
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
        'group w-full flex flex-col h-[24.375rem] xsm:h-[18.19181rem] rounded-[1.25rem] bg-[#F8F8F8] shadow-[-8px_4px_40px_0px_rgba(0,35,93,0.08)]',
        className,
      )}
    >
      <div className='h-[15.625rem] xsm:h-[12.96894rem] w-full relative overflow-hidden rounded-t-[1.25rem] xsm:rounded-t-[0.5rem]'>
        <ImageV2
          alt={item?.title}
          src={item?.image?.url}
          width={478}
          height={258}
          className='size-full object-cover rounded-t-[1.25rem] xsm:rounded-t-[0.5rem] sm:group-hover:scale-[1.2] transition-all duration-500'
        />
        <div className='absolute top-[0.5rem] left-[0.5rem] '>
          <p className='text-white text-pc-sub12s xsm:text-[0.5rem] xsm:font-semibold xsm:tracking-[-0.01rem] uppercase p-[0.75rem_1rem] xsm:p-[0.5rem] rounded-[1.25rem] bg-[rgba(19,37,82,0.50)] xsm:bg-[rgba(4,24,77,0.50)]'>
            {item?.categories}
          </p>
        </div>
      </div>
      <div className='p-[1.5rem] xsm:p-[0.75rem] flex-1 flex-col flex justify-between items-start'>
        <h3 className='line-clamp-2 text-pc-sub16s xsm:text-pc-sub12s text-[#000]'>
          {item?.title}
        </h3>
        <div className='flex justify-between w-full items-center'>
          <div className='flex space-x-[0.5rem]'>
            <ICCalendar className='size-[1.25rem] object-contain xsm:size-[1rem]' />
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
