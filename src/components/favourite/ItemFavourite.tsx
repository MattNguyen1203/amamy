import ICArraw from '@/components/icon/ICArraw'
import {IFavouriteBlog} from '@/sections/blog/blogs.interface'
import Link from 'next/link'

export default function ItemFavourite({item}: {item: IFavouriteBlog}) {
  return (
    <Link
      href={'/blogs/' + item?.slug}
      className='group flex items-center space-x-2 w-full sm:p-[1rem] xsm:py-[1rem]'
    >
      <p className='flex-1 line-clamp-2 text-[#000] text-pc-sub16s xsm:text-[0.875rem] xsm:font-semibold xsm:leading-[1.4] xsm:tracking-[-0.035rem] transition-all duration-500 group-hover:underline'>
        {item?.title}
      </p>
      <ICArraw className='size-[2rem] xsm:size-[1.5rem] object-contain' />
      {/* <div className='flex w-full justify-between items-center'>
        <div className='p-[0.5rem_0.75rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4]'>
          <p className='text-greyscale-text60 text-pc-sub12s xsm:text-[0.6875rem] xsm:font-semibold xsm:tracking-[-0.01375rem] xsm:leading-[1.5] uppercase'>
            {item?.category}
          </p>
        </div>
      </div> */}
    </Link>
  )
}
