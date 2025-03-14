'use client'
import MobileMenu from '@/components/header/MobileMenu'
import Amamy from '@/components/svg/Amamy'
import ArrowRight from '@/components/svg/ArrowRight'
import Close from '@/components/svg/Close'
import Plus from '@/components/svg/Plus'
import Search from '@/components/svg/Search'
import useClickOutside from '@/hooks/useClickOutside'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useRef, useState} from 'react'

const navItems = [
  {name: 'Theo dõi vận đơn', href: '#'},
  {name: 'Về Amamy', href: '#'},
  {name: 'Dịch vụ', href: '#'},
  {name: 'Hữu ích cho gửi hàng', href: '#'},
]

const Header = () => {
  const [searchInput, setSearchInput] = useState('')
  const [isScrollTop, setIsScrollTop] = useState(false)
  const [isShowSearchInput, setIsShowSearchInput] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const {isOutside, ref} = useClickOutside<HTMLDivElement>()

  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    if (isShowSearchInput) {
      setIsScrollTop(false)
      return
    }

    if (isHomePage) {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setIsScrollTop(false)
        } else {
          setIsScrollTop(true)
        }
      }
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isHomePage, isShowSearchInput])

  useEffect(() => {
    if (isOutside && !searchInput) {
      setIsShowSearchInput(false)
    }
  }, [isOutside, searchInput])

  const handleOpen = () => {
    setIsShowSearchInput(true)
    inputRef.current?.focus()
  }

  const handleClose = () => {
    if (searchInput) {
      setSearchInput('')
    } else {
      setIsShowSearchInput(false)
    }
  }

  const handleSearch = () => {
    console.log('search', searchInput)
  }

  return (
    <>
      {/* mobile */}
      <div className='hidden sticky top-0 z-50 xsm:flex-center h-[3.5rem] bg-white px-4 py-2 '>
        <div
          className={cn(
            'flex items-center justify-between w-full',
            isShowSearchInput && 'hidden',
          )}
        >
          <div className='w-[5.625rem]'>
            <Link href='/'>
              <Amamy
                className={cn('w-[4.56213rem] h-[1.215rem] fill-[#38B6FF]')}
              />
            </Link>
          </div>
          <div className='flex items-center space-x-4'>
            <Search
              className='size-4 stroke-black'
              onClick={() => setIsShowSearchInput(true)}
            />
            <MobileMenu />
          </div>
        </div>
        <div
          className={cn(
            'w-full h-10 p-2 rounded-[1.25rem] bg-[#F5F5F9] flex items-center space-x-3',
            !isShowSearchInput && 'hidden',
          )}
        >
          <ArrowRight
            className='size-6 stroke-black/60'
            onClick={() => setIsShowSearchInput(false)}
          />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type='text'
            placeholder='Nhập từ khoá...'
            className='flex-1 border-none outline-none bg-transparent text-mb-13M text-black placeholder:text-black/30'
          />
          <Search
            className='size-4 stroke-[#797F87]'
            onClick={handleSearch}
          />
        </div>
      </div>

      {/* pc */}
      <div
        className={cn(
          'xsm:hidden sticky w-full top-0 z-50 p-[0.875rem_6rem] bg-white border-b border-[#DCDFE4]',
          isHomePage && 'fixed',
          isScrollTop &&
            'shadow-[0px_0px_1px_0px_rgba(0,0,0,0.05)] border-none bg-transparent',
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between relative z-10 bg-white',
            isScrollTop && 'bg-transparent',
          )}
        >
          <div className='w-[14.6875rem]'>
            <Link href='/'>
              <Amamy
                className={cn(
                  'w-[6.89394rem] h-[1.836rem] fill-[#38B6FF]',
                  isScrollTop && 'fill-white',
                )}
              />
            </Link>
          </div>
          <nav className='flex items-center space-x-8 text-pc-sub16s'>
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'p-[0.25rem_0.375rem] text-black',
                  isScrollTop && 'text-white',
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className='flex items-center space-x-4'>
            <Search
              onClick={handleOpen}
              className={cn(
                'size-[1.08175rem] stroke-[#091E36] cursor-pointer',
                isScrollTop && 'stroke-white',
                isShowSearchInput && 'hidden',
              )}
            />
            <Link
              href={'/tao-don-hang'}
              className='flex-center space-x-2 p-[0.75rem_1rem_0.75rem_1.5rem] rounded-[1.25rem] border-[1.5px] border-white/80 bg-Blue-Primary'
            >
              <span className='text-pc-sub16m text-white'>Tạo đơn hàng</span>
              <Plus
                className={cn(
                  'size-[1.5rem] stroke-[#D9F1FF]',
                  isScrollTop && 'stroke-white',
                )}
              />
            </Link>
          </div>
        </div>

        <div
          className={cn(
            'absolute bottom-0 left-0 w-full h-[6.875rem] flex-center bg-white transition-all duration-200',
            isShowSearchInput && 'translate-y-full',
            isScrollTop && 'opacity-0 duration-0',
          )}
        >
          <div
            ref={ref}
            className='w-[62.5rem] h-[1.875rem] border-b-[0.125rem] border-[#DCDFE4] flex items-center space-x-3'
          >
            <Search
              className='size-[1.08175rem] stroke-black cursor-pointer'
              onClick={handleSearch}
            />
            <input
              ref={inputRef}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type='text'
              placeholder='Nhập từ khoá...'
              className='flex-1 text-[1.25rem] border-none outline-none bg-transparent text-black placeholder:text-black/30 font-medium font-montserrat leading-[1.3] tracking-[-0.0375rem]'
            />
            <Close
              className='size-6 stroke-black cursor-pointer'
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default Header
