'use client'

import Favourite from '@/components/favourite/Favourite'
import PaginationV2 from '@/components/pagination/PaginationV2'
import {fetcher} from '@/lib/swr'
import {cn} from '@/lib/utils'
import ItemBlog from '@/sections/blog/ItemBlog'
import {
  ICategoryBlog,
  IFavouriteBlog,
  IItemPostBlog,
} from '@/sections/blog/blogs.interface'
import {gsap} from 'gsap'
import EaselPlugin from 'gsap/EaselPlugin'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useMemo, useRef, useState} from 'react'
import useSWR from 'swr'
gsap.registerPlugin(ScrollToPlugin, EaselPlugin)
export default function TabsCategory({
  dataCategory,
  dataFavourite,
}: {
  dataCategory: ICategoryBlog[]
  dataFavourite: IFavouriteBlog[]
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState<number>(1)
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const slugCategory = searchParams ? searchParams.get('category') : 'all'
  const slugpage = searchParams ? searchParams.get('page') : '1'
  const query = useMemo(() => {
    if (!searchParams?.size)
      return `blogs?page=1${
        slugCategory === 'all' || slugCategory === null
          ? ''
          : '&categories=' + slugCategory
      }&limit=8`
    return `blogs?page=${slugpage ? slugpage : page}${
      slugCategory === 'all' || slugCategory === null
        ? ''
        : '&categories=' + slugCategory
    }&limit=8`
  }, [searchParams, slugpage, slugCategory, page])
  const {data, isLoading} = useSWR(query, fetcher, {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  })
  const handleSelectSortOption = (sortOption: ICategoryBlog) => {
    const paramNew = new URLSearchParams(searchParams ?? '')
    if (sortOption?.slug !== 'all') {
      paramNew.set('category', sortOption.slug)
      paramNew.delete('page')
    } else {
      paramNew.delete('category')
      paramNew.delete('page')
    }
    router.push(pathName + paramNew.toString() && '?' + paramNew.toString(), {
      scroll: false,
    })
    if (sectionRef.current instanceof HTMLElement) {
      gsap.to(window, {
        duration: 0.5,
        scrollTo: {y: sectionRef.current.offsetTop - 80},
        ease: 'power2.out',
      })
    }
  }
  return (
    <section>
      <div className='xsm:px-[1rem] xsm:overflow-hidden xsm:overflow-x-auto xsm:w-full hidden_scroll'>
        <div
          ref={containerRef}
          className='flex sm:flex-wrap gap-2 w-full xsm:w-max sm:mb-[2.5rem]'
        >
          <div
            onClick={() => {
              handleSelectSortOption({
                name: '',
                slug: 'all',
                id: 0,
              })
            }}
            className={cn(
              (slugCategory === 'all' || slugCategory === null) && 'active',
              '[&.active_p]:text-white hover:bg-greyscale-text60 cursor-pointer transition-all duration-500 flex-center rounded-[1.25rem] [&.active]:bg-greyscale-text60 p-[0.75rem_1rem] xsm:py-2 border-[1px] border-solid border-[#DCDFE4]',
            )}
          >
            <p className='text-pc-sub14s group-hover:text-white xsm:text-[0.75rem] xsm:leading-[1.4] text-greyscale-text60 transition-all duration-500'>
              Tất cả
            </p>
          </div>
          {Array.isArray(dataCategory) &&
            dataCategory?.map((e: ICategoryBlog, index) => (
              <div
                key={index}
                onClick={() => handleSelectSortOption(e)}
                className={cn(
                  slugCategory === e?.slug && 'active',
                  ' [&.active_p]:text-white group hover:bg-greyscale-text60 [&.active]:bg-greyscale-text60 transition-all duration-500 cursor-pointer flex-center rounded-[1.25rem] p-[0.75rem_1rem] border-[1px] border-solid border-[#DCDFE4] xsm:py-2',
                )}
              >
                <p className='text-pc-sub14s group-hover:text-white text-greyscale-text60 transition-all duration-500 xsm:text-[0.75rem] xsm:leading-[1.4]'>
                  {e?.name}
                </p>
              </div>
            ))}
        </div>
      </div>
      <div className='xsm:px-[1rem] xsm:pb-[1rem] flex xsm:flex-col sm:space-x-[3rem] relative sm:pb-[6rem]'>
        <div className='sm:w-[59.375rem] xsm:py-[1rem]'>
          <div className='grid grid-cols-2 xsm:grid-cols-1 gap-[1.5rem] xsm:gap-[0.75rem] w-full'>
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
            ) : Array.isArray(data?.posts) && data?.posts?.length > 0 ? (
              data?.posts?.map((item: IItemPostBlog, index: number) => (
                <ItemBlog
                  className='[&_.itembox-content]:bg-[#F8F8F8] [&_.itembox-content]:rounded-b-[1.25rem] !shadow-none'
                  key={index}
                  item={item}
                />
              ))
            ) : (
              <div>Không có bài viết phù hợp</div>
            )}
          </div>
          <div className='pt-[3rem] xsm:pt-[2rem] xsm:pb-[1rem]'>
            {data && data?.total_paged > 1 && (
              <PaginationV2
                pageCurrent={page}
                setCurrentPage={setPage}
                pageCount={data ? data?.total_paged : 0}
                ref={containerRef}
                className=''
              />
            )}
          </div>
        </div>
        <div className='sticky top-[5rem] h-fit w-[25.625rem] xsm:w-full'>
          <Favourite dataFavourite={dataFavourite} />
        </div>
      </div>
    </section>
  )
}
