import {cn} from '@/lib/utils'
import Link from 'next/link'
import {Fragment} from 'react'
interface IDataBreadcrumb {
  title: string
  slug: string
}
export default function Breadcrumb({
  data,
  className,
}: {
  data: IDataBreadcrumb[]
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-start p-[1.5rem_0rem_2.5rem_0rem] space-x-[0.5rem]',
        className,
      )}
    >
      <Link
        href={'/'}
        className='hover:bg-[rgba(96,96,96,0.08)] hover:text-[#38B6FF] transition-all duration-500 p-[0.25rem_0.75rem] rounded-[1.25rem] text-pc-sub14m text-[rgba(0,0,0,0.30)]'
      >
        Trang chủ
      </Link>
      <p className='text-pc-sub14m text-[rgba(0,00,0.60)]'>/</p>
      {Array.isArray(data) &&
        data?.map((items: IDataBreadcrumb, index: number) => (
          <Fragment key={index}>
            <Link
              href={items?.slug}
              className={cn(
                'hover:bg-[rgba(96,96,96,0.08)] hover:text-[#38B6FF] transition-all duration-500 p-[0.25rem_0.75rem] rounded-[1.25rem] text-pc-sub14m text-[rgba(0,0,0,0.30)]',
                index + 1 === data?.length &&
                  'bg-[rgba(96,96,96,0.08)] text-black active',
              )}
            >
              {items?.title}
            </Link>
            {index + 1 !== data?.length && (
              <p className='text-pc-sub14m text-[rgba(0,00,0.60)]'>/</p>
            )}
          </Fragment>
        ))}
    </div>
  )
}
