'use client'
import {IDetailBlog} from '@/sections/blog/blogs.interface'
import ICCopy from '@/sections/blog/detail/ICCopy'
import ICFb from '@/sections/blog/detail/ICFb'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'
import {toast} from 'sonner'

export default function ContentBlog({
  data,
  updatedHtml,
}: {
  data: IDetailBlog
  updatedHtml: string
}) {
  const pathname = usePathname()
  const [currentUrl, setCurrentUrl] = useState('')
  const [copyUrl, setCopyUrl] = useState(false)
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
    setCopyUrl(true)
    navigator.clipboard.writeText(currentUrl)
    toast.success('Copy Thành Công')
    setTimeout(() => {
      setCopyUrl(false)
    }, 2000)
  }
  const handleShareToFacebook = () => {
    if (typeof window === 'undefined') return
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl,
    )}`
    window.open(facebookShareUrl, '_blank', 'noopener,noreferrer')
  }
  return (
    <section className='w-[60rem]'>
      <h1 className='mb-[0.81rem] text-[2.625rem] font-bold leading-[1.55] tracking-[-0.105rem] text-black'>
        {data?.title}
      </h1>
      <div className='font-montserrat opacity-[0.72] text-black text-[1rem] font-semibold leading-[1.5]'>
        {formattedDate}
      </div>
      <div className='mt-[5rem]'>
        <div
          dangerouslySetInnerHTML={{__html: updatedHtml}}
          className='*:font-montserrat [&_em]:content-em [&_h2]:content-h2 [&_h3]:content-h3 [&_img]:content-img [&>p]:content-p [&>span]:content-span [&>strong]:content-strong [&_ol_li]:content-ol--li [&_ul_li]:content-ul--li [&>ul]:content-ul [&>ol]:content-ol'
        ></div>
        <div className='flex items-center mt-[2rem]'>
          <p className='text-black font-montserrat mr-[1.25rem]'>
            Bạn thích bài viết này? Hãy chia sẻ qua:
          </p>
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
    </section>
  )
}
