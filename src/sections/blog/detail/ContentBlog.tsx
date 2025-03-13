'use client'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {IDetailBlog} from '@/sections/blog/blogs.interface'
import {Iheadings} from '@/sections/blog/detail/AsideBlog'
import ICCopy from '@/sections/blog/detail/ICCopy'
import ICFb from '@/sections/blog/detail/ICFb'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'
import {toast} from 'sonner'

export default function ContentBlog({
  data,
  updatedHtml,
  headings,
}: {
  data: IDetailBlog
  updatedHtml: string
  headings: Iheadings[]
}) {
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const [currentUrl, setCurrentUrl] = useState('')
  const date = new Date(data?.date)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  const formattedDate = `Ngày ${day}/${month}/${year}`
  useEffect(() => {
    const fullUrl = `${window.location.origin}${pathname}${window.location.search}`
    setCurrentUrl(fullUrl)
  }, [])
  const handleCopuUrl = () => {
    navigator.clipboard.writeText(currentUrl)
    toast.success('Copy Thành Công')
  }
  const handleShareToFacebook = () => {
    if (typeof window === 'undefined') return
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl,
    )}`
    window.open(facebookShareUrl, '_blank', 'noopener,noreferrer')
  }
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
    <section className='w-[60rem] xsm:w-full xsm:p-[1rem]'>
      <h1 className='mb-[0.81rem] xsm:mb-[1rem] text-[2.625rem] font-bold leading-[1.55] tracking-[-0.105rem] text-black xsm:text-mb-h2'>
        {data?.title}
      </h1>
      <div className='xsm:mb-[1rem] xsm:pb-[1rem] xsm:border-b-[1px] xsm:border-solid xsm:border-[#DCDFE4] font-montserrat opacity-[0.72] text-black text-[1rem] font-semibold leading-[1.5] xsm:text-pc-sub14s'>
        {formattedDate}
      </div>
      {isMobile && (
        <div className='rounded-[1.25rem] bg-[#EDF5FA] p-[1.5rem] xsm:p-[1rem]'>
          <p className='text-black text-pc-heading20b mb-[0.5rem] xsm:text-pc-sub16b pb-[0.5rem] border-b-[1px] border-solid border-[rgba(220,223,228,0.30)]'>
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
                    'text-pc-sub12s text-[rgba(0,0,0,0.80)] [&.active]:text-[#09A5FF] hover:text-[#09A5FF] transition-all duration-500',
                  )}
                >
                  {item?.text}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className='mt-[5rem] xsm:mt-[1.5rem]'>
        <div
          dangerouslySetInnerHTML={{__html: updatedHtml}}
          className='[&_div]:!w-full *:font-montserrat [&_em]:content-em [&_h2]:content-h2 [&_h3]:content-h3 [&_img]:content-img [&>p]:content-p [&>span]:content-span [&>strong]:content-strong [&_ol_li]:content-ol--li [&_ul_li]:content-ul--li [&>ul]:content-ul [&>ol]:content-ol'
        ></div>
        <div className='flex xsm:flex-col xsm:space-y-[0.5rem] sm:items-center mt-[2rem] xsm:pt-[1rem] xsm:mt-[1rem] xsm:border-t-[0.0625rem] xsm:border-t-solid xsm:border-t-[#DCDFE4]'>
          <p className='text-black font-montserrat xsm:text-pc-sub14s sm:mr-[1.25rem]'>
            Bạn thích bài viết này? Hãy chia sẻ qua:
          </p>
          <div className='flex items-center xsm:space-x-[0.75rem]'>
            <div
              onClick={handleShareToFacebook}
              className='mr-[0.59rem] flex-center cursor-pointer rounded-[100%] size-[2.375rem] border-[0.792px] border-solid border-[#DCDFE4] bg-white'
            >
              <ICFb className='size-[1.1875rem] object-contain' />
            </div>
            <div
              onClick={handleCopuUrl}
              className='cursor-pointer flex-center rounded-[100%] size-[2.375rem] border-[0.792px] border-solid border-[#DCDFE4] bg-white'
            >
              <ICCopy className='size-[1.1875rem] object-contain' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
