'use client'
import PaginationV2 from '@/components/pagination/PaginationV2'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useIsMobile from '@/hooks/useIsMobile'
import {fetcher} from '@/lib/swr'
import {cn} from '@/lib/utils'
import ItemBlog from '@/sections/blog/ItemBlog'
import {ICategoryBlog, IItemPostBlog} from '@/sections/blog/blogs.interface'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useMemo, useRef, useState} from 'react'
import useSWR from 'swr'
export default function MenuSearch({
  dataCategory,
}: {
  dataCategory: ICategoryBlog[]
}) {
  const isMobile = useIsMobile()
  const [selectedValue, setSelectedValue] = useState('all')
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState<number>(1)
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const slugCategory = searchParams ? searchParams.get('category') : 'all'
  const slugpage = searchParams ? searchParams.get('page') : '1'
  const search = searchParams ? searchParams.get('key') : ''
  const query = useMemo(() => {
    if (!searchParams?.size)
      return `search?${search ? 'keywords=' + search + '&' : ''}limit=9&page=${
        slugpage ? slugpage : page
      }${slugCategory ? '&categories=' + slugCategory : ''}`
    return `search?${search ? 'keywords=' + search + '&' : ''}limit=9&page=${
      slugpage ? slugpage : page
    }${slugCategory ? '&categories=' + slugCategory : ''}`
  }, [searchParams, slugpage, slugCategory, page])
  const {data, isLoading} = useSWR(query, fetcher, {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  })
  const handleValueChange = (value: string) => {
    setSelectedValue(value)
    const paramNew = new URLSearchParams(searchParams ?? '')
    if (value !== 'all') {
      paramNew.set('category', value)
      paramNew.delete('page')
    } else {
      paramNew.delete('category')
      paramNew.delete('page')
    }
    router.push(pathName + paramNew.toString() && '?' + paramNew.toString(), {
      scroll: false,
    })
    if (sectionRef.current instanceof HTMLElement) {
      sectionRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }
  return (
    <>
      <div
        ref={containerRef}
        className='flex xsm:flex-col sm:justify-between w-full px-[5.91rem] xsm:px-[1rem]'
      >
        <p className='flex-1 text-black text-[1.75rem] font-medium leading-[1.2] tracking-[-0.035rem] xsm:text-[0.875rem] xsm:font-medium xsm:leading-[1.2] xsm:tracking-[-0.0175rem] xsm:text-[rgba(0,0,0,0.60)]'>
          Tìm thấy 24 kết quả cho ”
          <span className='font-bold tracking-[-0.07rem] leading-[1.3] xsm:text-[0.875rem] xsm:text-black xsm:tracking-[-0.035rem]'>
            {search}
          </span>
          ”
        </p>
        {!isMobile && (
          <div>
            <Select
              defaultValue={selectedValue}
              onValueChange={handleValueChange}
            >
              <SelectTrigger className='border-none [&>svg]:size-[1.5625rem] rounded-[1.25rem] bg-[#F8F8F8] min-w-[16.9375rem] w-max h-[3rem] space-x-[0.5rem] p-[0.75rem_0.75rem_0.75rem_1rem] focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                <p className='w-full flex-1 text-start text-pc-sub14m text-black'>
                  <span className='text-pc-sub14m !font-bold text-black'>
                    Lọc Theo:
                  </span>{' '}
                  <SelectValue placeholder='Tất cả' />
                </p>
              </SelectTrigger>
              <SelectContent className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-[#F8F8F8] shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)]'>
                <SelectGroup>
                  <SelectItem
                    value={'all'}
                    className='cursor-pointer p-[0.75rem_1rem] h-[3rem] bg-[#F8F8F8] rounded-[1.25rem] text-pc-sub14m text-black'
                  >
                    Tất cả
                  </SelectItem>
                  {Array.isArray(dataCategory) &&
                    dataCategory?.map((item: ICategoryBlog, index: number) => (
                      <SelectItem
                        key={index}
                        value={item?.slug}
                        className='cursor-pointer p-[0.75rem_1rem] h-[3rem] bg-[#F8F8F8] rounded-[1.25rem] text-pc-sub14m text-black'
                      >
                        {item?.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      {isMobile && (
        <div className='w-full overflow-hidden overflow-x-auto hidden_scroll'>
          <div className='mt-[1rem] flex w-max flex-1 space-x-[0.5rem] items-center px-[1rem]'>
            <div
              onClick={() => handleValueChange('all')}
              className={cn(
                (slugCategory === 'all' || slugCategory === null) && 'active',
                '[&.active]:bg-[rgba(0,0,0,0.60)] [&.active]:text-white rounded-[1.25rem] p-[0.5rem_1rem] border-[1px] border-solid border-[#DCDFE4] text-pc-sub12s text-[rgba(0,0,0,0.60)]',
              )}
            >
              Tất cả
            </div>
            {Array.isArray(dataCategory) &&
              dataCategory?.map((item: ICategoryBlog, index: number) => (
                <div
                  onClick={() => handleValueChange(item?.slug)}
                  key={index}
                  className={cn(
                    slugCategory === item?.slug && 'active',
                    '[&.active]:bg-[rgba(0,0,0,0.60)] [&.active]:text-white rounded-[1.25rem] p-[0.5rem_1rem] border-[1px] border-solid border-[#DCDFE4] text-pc-sub12s text-[rgba(0,0,0,0.60)]',
                  )}
                >
                  {item?.name}
                </div>
              ))}
          </div>
        </div>
      )}
      <div className='pt-[3rem] px-[5.91rem] xsm:px-[1rem] grid grid-cols-3 xsm:grid-cols-1 gap-[1.5rem] xsm:gap-[0.75rem] w-full'>
        {isLoading ? (
          Array(6)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className='animate-pulse bg-white h-[24.375rem] rounded-[0.5rem] p-[1rem]'
              >
                <div className='w-full bg-gray-300 rounded-md' />{' '}
                {/* Skeleton image */}
                <div className='h-4 bg-gray-300 rounded w-3/4 my-2' />{' '}
                {/* Skeleton title */}
                <div className='h-3 bg-gray-200 rounded w-1/2' />{' '}
                {/* Skeleton category */}
              </div>
            ))
        ) : Array.isArray(data?.data) && data?.data?.length > 0 ? (
          data?.data?.map((item: IItemPostBlog, index: number) => (
            <ItemBlog
              key={index}
              item={item}
            />
          ))
        ) : (
          <div>Không có bài viết phù hợp</div>
        )}
      </div>
      <div className='pt-[3rem] xsm:pt-[2rem] xsm:pb-[1rem] pb-[5rem]'>
        {data && data?.total_pages > 1 && (
          <PaginationV2
            pageCurrent={page}
            setCurrentPage={setPage}
            pageCount={data ? data?.total_pages : 0}
            ref={containerRef}
            className=''
          />
        )}
      </div>
    </>
  )
}
