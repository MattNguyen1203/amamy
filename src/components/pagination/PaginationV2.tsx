/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {forwardRef, useEffect} from 'react'
import ReactPaginate from 'react-paginate'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {gsap} from 'gsap'
import EaselPlugin from 'gsap/EaselPlugin'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'

gsap.registerPlugin(ScrollToPlugin, EaselPlugin)
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
        gsap.to(window, {
          duration: 0.5,
          scrollTo: {y: ref.current.offsetTop - 20},
          ease: 'power2.out',
        })
      }
    }

    return (
      <ReactPaginate
        activeClassName='!bg-[#E1EEFF] lg:hover:bg-[#E1EEFF] border-[1px] border-solid border-[#E4E4E7]'
        pageClassName='bg-white size-[2.75rem] xsm:size-[2.5rem] border-[1px] border-solid border-[#E4E4E7] rounded-[1.25rem] flex-center text-[#09090B] text-[0.875rem] font-semibold leading-normal bg-[#292929]/10 [&>a]:size-full [&>a]:flex-center select-none lg:hover:bg-[#1A2B49]/20 xsm:text-[0.7rem]'
        previousLabel={
          <button className='group h-[2.75rem] w-auto space-x-[0.5rem] rounded-full px-[1rem] flex-center lg:hover:bg-[#1A2B49]/20 xsm:size-[1.25rem] xsm:p-0 xsm:flex-center'>
            <ICArrowPagination className='ease-pagination-bezier size-[0.8rem] transition-all duration-300 lg:group-hover:scale-[1.2]' />
            <p className='font-montserrat text-[1rem] font-medium leading-[1.5] text-[#09090B] xsm:hidden'>
              Trước
            </p>
          </button>
        }
        nextLabel={
          <button className='group h-[2.75rem] w-auto space-x-[0.5rem] rounded-full px-[1rem] flex-center lg:hover:bg-[#1A2B49]/20 xsm:size-[1.25rem] xsm:p-0 xsm:flex-center'>
            <p className='font-montserrat text-[1rem] font-medium leading-[1.5] text-[#09090B] xsm:hidden'>
              Tiếp theo
            </p>
            <ICArrowPagination className='ease-pagination-bezier size-[0.8rem] rotate-180 transition-all duration-300 lg:group-hover:scale-[1.2]' />
          </button>
        }
        breakClassName='w-fit xsm:size-[2.75rem] rounded-[0.75rem] flex-center select-none'
        breakLabel={
          <div className='size-[2.75rem] space-x-[0.33rem] rounded-[100%] border-[1px] border-solid border-[#E4E4E7] bg-white flex-center xsm:size-[2.5rem]'>
            ...
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
