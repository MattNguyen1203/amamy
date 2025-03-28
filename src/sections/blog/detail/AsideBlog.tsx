'use client'
import Favourite from '@/components/favourite/Favourite'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {IFavouriteBlog} from '@/sections/blog/blogs.interface'
import Link from 'next/link'
import {useEffect, useState} from 'react'
export interface Iheadings {
  heading: number
  id: string
  text: string
}
export default function AsideBlog({
  headings,
  dataFavourite,
}: {
  headings: Iheadings[]
  dataFavourite: IFavouriteBlog[]
}) {
  const isMobile = useIsMobile()
  const [activeSection, setActiveSection] = useState<string>('')
  useEffect(() => {
    if (!isMobile) {
      const sections = document.querySelectorAll('h2')
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id)
            }
          })
        },
        {threshold: 0.025}, // Chỉ cần 0.01% section xuất hiện trong viewport là kích hoạt
      )
      sections.forEach((section) => observer.observe(section))

      return () => {
        sections.forEach((section) => observer.unobserve(section))
      }
    }
  }, [isMobile])
  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Cuộn đến phần tử và thêm offset (khoảng cách từ top)
      window.scrollTo({
        top: element.offsetTop - 200, // Khoảng cách từ top có thể điều chỉnh theo nhu cầu
        behavior: 'smooth', // Cuộn mượt mà
      })
    }
  }
  return (
    <section className='w-[24.5625rem] xsm:w-full h-max sticky top-[6.875rem] sm:h-[calc(100vh-6.875rem)] sm:overflow-hidden sm:overflow-y-auto space-y-[1rem]'>
      {!isMobile && (
        <div className='rounded-[1.25rem] bg-[#EDF5FA] p-[1.5rem]'>
          <p className='text-black text-pc-heading20b mb-[1.5rem]'>
            Mục lục bài viết
          </p>
          <div className='space-y-[0.75rem]'>
            {headings?.map((item: Iheadings, index: number) => (
              <div key={index}>
                <Link
                  href={'#' + item?.id}
                  onClick={(e) => {
                    e.preventDefault() // Ngăn việc chuyển trang
                    handleScroll(item?.id) // Cuộn đến phần tử với ID tương ứng
                  }}
                  className={cn(
                    activeSection === item?.id && 'active',
                    'text-pc-sub14s text-[rgba(0,0,0,0.80)] [&.active]:text-[#09A5FF] hover:text-[#09A5FF] transition-all duration-500',
                  )}
                >
                  {item?.text}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      <Favourite
        className='sm:[&_.warpper-content]:max-h-max sm:[&_.warpper-content]:h-max sm:[&_.warpper-content]:overflow-hidden px-[1rem]'
        dataFavourite={dataFavourite}
      />
    </section>
  )
}
