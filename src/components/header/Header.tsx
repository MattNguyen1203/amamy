'use client'
import Amamy from '@/components/svg/Amamy'
import Plus from '@/components/svg/Plus'
import Search from '@/components/svg/Search'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'

const navItems = [
  {name: 'Theo dõi vận đơn', href: '#'},
  {name: 'Về Amamy', href: '#'},
  {name: 'Dịch vụ', href: '#'},
  {name: 'Hữu ích cho gửi hàng', href: '#'},
]

const Header = () => {
  const [isScrollTop, setIsScrollTop] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
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
  }, [isHomePage])

  return (
    <div
      className={cn(
        'sticky w-full top-0 z-[99] p-[0.875rem_6rem] flex items-center justify-between bg-white border-b-[1px_solid_#DCDFE4] transition-all duration-300',
        isHomePage && 'fixed',
        isScrollTop &&
          'shadow-[0px_0px_1px_0px_rgba(0,0,0,0.05)] border-none bg-transparent',
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
          className={cn(
            'size-[1.08175rem] stroke-[#091E36] cursor-pointer',
            isScrollTop && 'stroke-white',
          )}
        />
        <button className='flex-center space-x-2 p-[0.75rem_1rem_0.75rem_1.5rem] rounded-[1.25rem] border-[1.5px] border-white/80 bg-Blue-Primary'>
          <span className='text-pc-sub16m text-white'>Tạo đơn hàng</span>
          <Plus
            className={cn(
              'size-[1.5rem] stroke-[#D9F1FF]',
              isScrollTop && 'stroke-white',
            )}
          />
        </button>
      </div>
    </div>
  )
}
export default Header
