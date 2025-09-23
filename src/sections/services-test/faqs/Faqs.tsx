'use client'

import React, {useEffect, useRef, useState} from 'react'
import gsap from 'gsap'
import ICMessage from '@/components/icon/ICMessage'
import ICPlus from '@/components/icon/ICPlus'
import ICQuestion from '@/components/icon/ICQuestion'

interface FAQItem {
  question: string
  answer: string
}

interface FaqsProps {
  faqsData?: {
    questions: FAQItem[]
  }
}

const Faqs = ({faqsData}: FaqsProps) => {
  // cho phép mở nhiều; chỉ đóng khi bấm lại đúng item
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]))

  const contentRefs = useRef<HTMLDivElement[]>([])
  const iconRefs = useRef<HTMLDivElement[]>([])
  const tlRefs = useRef<gsap.core.Timeline[]>([])

  // Khởi tạo timeline cho từng item (một lần theo số lượng items)
  useEffect(() => {
    // clear cũ (nếu length thay đổi)
    tlRefs.current.forEach((tl) => tl?.kill())
    tlRefs.current = []

    faqsData?.questions?.forEach((_, i) => {
      const contentEl = contentRefs.current[i]
      const iconEl = iconRefs.current[i]
      if (!contentEl || !iconEl) return

      // Trạng thái ban đầu: nếu đang trong openSet -> hiển thị, ngược lại ẩn
      const initiallyOpen = openSet.has(i)
      gsap.set(contentEl, {
        display: initiallyOpen ? 'flex' : 'none',
        overflow: 'hidden',
        willChange: 'height, transform, opacity',
        height: initiallyOpen ? 'auto' : 0,
        x: initiallyOpen ? 0 : 50,
        opacity: initiallyOpen ? 1 : 0,
      })
      gsap.set(iconEl, {
        willChange: 'transform, opacity',
        opacity: initiallyOpen ? 1 : 0,
        rotate: initiallyOpen ? 0 : 180,
        scale: initiallyOpen ? 1 : 0.8,
      })

      const tl = gsap.timeline({paused: true})

      // content: 0 -> auto height + slide x + fade
      tl.addLabel('start')
      tl.fromTo(
        contentEl,
        {height: 0, x: 50, opacity: 0, display: 'flex'},
        {
          height: 'auto',
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          duration: 0.35,
          // sau khi mở xong, clear height để layout tự nhiên
          onComplete: () => {
            gsap.set(contentEl, {height: 'auto', clearProps: 'height'})
          },
        },
        0,
      )

      // icon
      tl.fromTo(
        iconEl,
        {opacity: 0, rotate: 180, scale: 0.8},
        {opacity: 1, rotate: 0, scale: 1, ease: 'power2.out', duration: 0.45},
        0.05,
      )

      // Khi reverse xong thì ẩn hẳn để không chiếm chỗ
      tl.eventCallback('onReverseComplete', () => {
        gsap.set(contentEl, {display: 'none', height: 0})
      })

      // Lưu
      tlRefs.current[i] = tl

      // Nếu ban đầu đang mở thì đặt tl ở cuối (đã mở)
      if (initiallyOpen) {
        tl.progress(1).pause(0)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faqsData?.questions?.length]) // phụ thuộc vào số item

  // Điều khiển open/close theo openSet
  useEffect(() => {
    faqsData?.questions?.forEach((_, i) => {
      const tl = tlRefs.current[i]
      const contentEl = contentRefs.current[i]
      const iconEl = iconRefs.current[i]
      if (!tl || !contentEl || !iconEl) return

      const shouldOpen = openSet.has(i)

      if (shouldOpen) {
        // chuẩn bị state trước khi play để tránh khựng
        gsap.set(contentEl, {display: 'flex', overflow: 'hidden'})
        tl.play()
      } else {
        // reverse về 0
        tl.reverse()
      }
    })
  }, [openSet, faqsData])

  const toggleItem = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(i))
        next.delete(i) // bấm lại chính nó -> đóng
      else next.add(i) // bấm item khác -> mở thêm, không đóng item cũ
      return next
    })
  }

  return (
    <div className='flex w-[full] flex-col items-start gap-[0.625rem] bg-white px-4 py-10 sm:p-[5rem_6rem]'>
      <div className='flex w-full flex-col items-center gap-[1.5rem] sm:w-[88rem] sm:gap-[2.5rem]'>
        <h2 className='text-center font-montserrat text-[1.25rem] font-bold not-italic leading-[120%] tracking-[-0.105rem] text-[color:var(--greyscaletext-92,rgba(0,0,0,0.92))] sm:text-[2.625rem]'>
          Câu hỏi thường gặp cho đi Pháp
        </h2>

        <div className='flex w-full flex-col items-start sm:w-[62.5rem] sm:gap-2'>
          {faqsData?.questions?.map((item, index) => {
            const isOpen = openSet.has(index)
            return (
              <div
                key={index}
                className='w-full'
              >
                {/* Question row */}
                <div className='mb-2 flex w-full items-center justify-between gap-2'>
                  <div className='flex h-[3rem] w-[3rem] items-center gap-2.5 self-stretch rounded-[3.125rem] bg-white p-2 shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:h-[4.125rem] sm:w-[4.125rem] sm:p-[0.8125rem]'>
                    <ICQuestion className='h-8 w-8 sm:h-[2.5rem] sm:w-[2.5rem]' />
                  </div>

                  <button
                    onClick={() => toggleItem(index)}
                    className='flex w-full flex-[1_0_0] items-start justify-between gap-4 rounded-[0_0.75rem_0.75rem_0.75rem] bg-white px-4 py-3 text-left shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:gap-6 sm:rounded-[0_1.25rem_1.25rem_1.25rem] sm:p-[1.25rem_1.25rem_1.25rem_1.5rem]'
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <span className='flex items-start justify-start text-start font-montserrat text-[0.75rem] font-semibold not-italic leading-[1.05rem] tracking-[-0.05rem] text-[var(--greyscaletext-92,#292F36)] sm:text-xl sm:leading-[1.75rem]'>
                      {item.question}
                    </span>
                    <ICPlus
                      className={`h-6 w-6 transform text-[var(--greyscaletext-80,rgba(0,0,0,0.80))] transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Answer row + icon */}
                <div className='flex w-full gap-2'>
                  <div
                    ref={(el) => {
                      if (el) contentRefs.current[index] = el
                    }}
                    className='flex w-full items-end justify-between gap-2 pb-4'
                  >
                    <div className='flex flex-[1_0_0] flex-col items-start gap-6 rounded-[0.75rem_0.75rem_0_0.75rem] bg-white px-4 py-3 shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:rounded-[1.25rem_1.25rem_0_1.25rem] sm:p-[1.25rem_1.25rem_1.25rem_1.5rem]'>
                      <p
                        dangerouslySetInnerHTML={{__html: item.answer}}
                        className='font-montserrat text-[0.75rem] font-normal not-italic leading-5 tracking-[-0.03rem] text-[var(--greyscaletext-92,#292F36)] sm:text-base sm:leading-6'
                      ></p>
                    </div>

                    <div
                      ref={(el) => {
                        if (el) iconRefs.current[index] = el
                      }}
                      className='flex h-[3rem] w-[3rem] items-center rounded-full bg-white p-2 shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:h-[4.125rem] sm:w-[4.125rem]'
                    >
                      <ICMessage className='h-8 w-8 sm:h-10 sm:w-10' />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Faqs
