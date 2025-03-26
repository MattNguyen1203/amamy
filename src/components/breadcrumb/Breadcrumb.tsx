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
  type = 'white',
}: {
  data: IDataBreadcrumb[]
  className?: string
  type?: 'white' | 'blue'
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
        className={cn(
          ' transition-all duration-500 sm:p-[0.25rem_0.75rem] rounded-[1.25rem] !text-pc-sub14m',
          type === 'white' &&
            'hover:bg-[rgba(96,96,96,0.08)] hover:text-[#38B6FF] text-[rgba(0,0,0,0.30)]',
          type === 'blue' &&
            'text-[rgba(255,255,255,0.80)] hover:bg-[rgba(255,255,255,0.08)] hover:text-white',
        )}
      >
        Trang chủ
      </Link>
      <p
        className={cn(
          'text-pc-sub14m text-[rgba(0,00,0.60)]',
          type === 'blue' && 'text-white',
        )}
      >
        /
      </p>
      {Array.isArray(data) &&
        data?.map((items: IDataBreadcrumb, index: number) => (
          <Fragment key={index}>
            <Link
              href={items?.slug}
              className={cn(
                'transition-all line-clamp-1 duration-500 sm:p-[0.25rem_0.75rem] rounded-[1.25rem] !text-pc-sub14m',
                type === 'white' &&
                  'hover:bg-[rgba(96,96,96,0.08)] hover:text-[#38B6FF] text-[rgba(0,0,0,0.30)]',
                type === 'blue' &&
                  'text-white hover:bg-[rgba(255,255,255,0.08)] hover:text-white',
                index + 1 === data?.length &&
                  type === 'blue' &&
                  'bg-[rgba(255,255,255,0.08)]',
                index + 1 === data?.length &&
                  type === 'white' &&
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
