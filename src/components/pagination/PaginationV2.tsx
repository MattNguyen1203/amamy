/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {forwardRef, useEffect} from 'react'
import ReactPaginate from 'react-paginate'

type TProps = {
  pageCurrent: number
  pageCount: number
  className?: string
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const PaginationV2 = forwardRef(
  (
    {pageCurrent, pageCount = 10, className, setCurrentPage}: TProps,
    ref?: any,
  ) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathName = usePathname()

    const isMobile = useIsMobile()

    useEffect(() => {
      if (searchParams?.get('page')) {
        setCurrentPage(Number(searchParams.get('page')))
      }
    }, [searchParams])

    function handleChangePage(page: number) {
      if (typeof window === 'undefined') return
      if (page === pageCurrent) return
      const paramNew = new URLSearchParams(searchParams ?? '')

      if (page <= 1) {
        paramNew.delete('page')
        setCurrentPage(1)
      } else {
        paramNew.set('page', String(page))
        setCurrentPage(Number(page))
      }
      router.push(pathName + '?' + paramNew.toString(), {
        scroll: false,
      })
      if (ref && ref.current) {
        ref.current.scrollIntoView({behavior: 'smooth', block: 'start'})
        window.scrollBy({top: -200, behavior: 'smooth'})
      }
    }

    return (
      <ReactPaginate
        activeClassName='!bg-[#E1EEFF] lg:hover:bg-[#E1EEFF] border-[1px] border-solid border-[#E4E4E7]'
        pageClassName='size-[2.75rem] xsm:size-[2.5rem] border-[1px] border-solid border-[#E4E4E7] rounded-full flex-center text-[#09090B] text-[0.875rem] font-semibold leading-normal bg-[#292929]/10 [&>a]:size-full [&>a]:flex-center select-none lg:hover:bg-[#1A2B49]/20 xsm:text-[0.7rem]'
        previousLabel={
          <button className='xsm:hidden space-x-[0.5rem] px-[1rem] group h-[2.75rem] w-auto rounded-full flex-center lg:hover:bg-[#1A2B49]/20'>
            <ICArrowPagination className='ease-pagination-bezier size-[0.8rem] transition-all duration-300 lg:group-hover:scale-[1.2]' />
            <p className='font-[SVN-Gilroy] text-[1rem] font-semibold leading-[1.5] text-[#09090B]'>
              Trước
            </p>
          </button>
        }
        nextLabel={
          <button className='xsm:hidden space-x-[0.5rem] px-[1rem] group h-[2.75rem] w-auto rounded-full flex-center lg:hover:bg-[#1A2B49]/20'>
            <p className='font-[SVN-Gilroy] text-[1rem] font-semibold leading-[1.5] text-[#09090B]'>
              Tiếp theo
            </p>
            <ICArrowPagination className='ease-pagination-bezier size-[0.8rem] rotate-180 transition-all duration-300 lg:group-hover:scale-[1.2]' />
          </button>
        }
        breakClassName='w-fit xsm:size-[2.75rem] rounded-[0.75rem] flex-center select-none'
        breakLabel={
          <div className='flex items-center space-x-[0.33rem]'>
            <ICBreakPagination className='size-[0.25rem]' />
            <ICBreakPagination className='size-[0.25rem]' />
            <ICBreakPagination className='size-[0.25rem]' />
          </div>
        }
        onPageChange={(e) => {
          handleChangePage(Number(e?.selected) + 1)
        }}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={isMobile ? 1 : 3}
        forcePage={pageCurrent - 1}
        className={cn(
          'mx-auto flex w-fit items-center space-x-[0.62rem] [&_.disabled]:hidden',
          className,
        )}
      />
    )
  },
)

PaginationV2.displayName = 'PaginationV2'
export default PaginationV2

const ICArrowPagination = ({className}: {className?: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='8'
      height='12'
      viewBox='0 0 8 12'
      fill='none'
      className={className}
    >
      <path
        d='M6.66699 1L1.66781 5.99918L6.66699 10.9984'
        stroke='#292929'
      />
    </svg>
  )
}

const ICBreakPagination = ({className}: {className?: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='5'
      height='4'
      viewBox='0 0 5 4'
      fill='none'
      className={className}
    >
      <ellipse
        cx='2.33351'
        cy='2'
        rx='2.00002'
        ry='2'
        fill='#292929'
      />
    </svg>
  )
}
