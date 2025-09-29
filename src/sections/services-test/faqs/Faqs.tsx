'use client'

import ICMessage from '@/components/icon/ICMessage'
import ICQuestion from '@/components/icon/ICQuestion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/sections/services-test/faqs/accordion'
import Image from 'next/image'

type FAQItem = {question: string; answer: string}
type FaqsData = {
  title?: string
  questions?: FAQItem[]
  number?: string
}
type Props = {
  faqsData: FaqsData
  onOpenPopup?: () => void
}

const Faqs: React.FC<Props> = ({faqsData}) => {
  // cho phép mở nhiều; chỉ đóng khi bấm lại chính item
  // const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]))
  // const [isInitialized, setIsInitialized] = useState(false)

  // const contentRefs = useRef<HTMLDivElement[]>([])
  // const iconRefs = useRef<HTMLDivElement[]>([])
  // const tlRefs = useRef<gsap.core.Timeline[]>([])

  // Khởi tạo timeline cho từng item (theo số lượng items)
  // useEffect(() => {
  //   // Only run on client side to prevent hydration mismatch
  //   if (typeof window === 'undefined') return
  //   tlRefs.current.forEach((tl) => tl?.kill())
  //   tlRefs.current = []

  //   const len = faqsData?.questions?.length ?? 0
  //   for (let i = 0; i < len; i++) {
  //     const contentEl = contentRefs.current[i]
  //     const iconEl = iconRefs.current[i]
  //     if (!contentEl || !iconEl) continue

  //     // Chỉ item đầu tiên (index 0) được mở ngay từ đầu
  //     const initiallyOpen = i === 0

  //     gsap.set(contentEl, {
  //       display: initiallyOpen ? 'flex' : 'none',
  //       overflow: 'hidden',
  //       willChange: 'height, transform, opacity',
  //       height: initiallyOpen ? 'auto' : 0,
  //       x: initiallyOpen ? 0 : 50,
  //       opacity: initiallyOpen ? 1 : 0,
  //     })
  //     gsap.set(iconEl, {
  //       willChange: 'transform, opacity',
  //       opacity: initiallyOpen ? 1 : 0,
  //       rotate: initiallyOpen ? 0 : 180,
  //       scale: initiallyOpen ? 1 : 0.8,
  //     })

  //     const tl = gsap.timeline({paused: true})
  //     tl.addLabel('start')
  //     tl.fromTo(
  //       contentEl,
  //       {height: 0, x: 0, opacity: 0, display: 'flex'},
  //       {
  //         height: 'auto',
  //         x: 0,
  //         opacity: 1,
  //         ease: 'power2.out',
  //         duration: 0.35,
  //         onComplete: () => {
  //           gsap.set(contentEl, {height: 'auto', clearProps: 'height'})
  //         },
  //       },
  //       0,
  //     )
  //     tl.fromTo(
  //       iconEl,
  //       {opacity: 0, rotate: 0, scale: 0.8},
  //       {opacity: 1, rotate: 0, scale: 1, ease: 'power2.out', duration: 0.45},
  //       0.05,
  //     )
  //     tl.eventCallback('onReverseComplete', () => {
  //       gsap.set(contentEl, {display: 'none', height: 0})
  //     })

  //     tlRefs.current[i] = tl
  //     if (initiallyOpen) tl.progress(1).pause(0)
  //   }

  //   // Mark as initialized after first setup
  //   setIsInitialized(true)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [faqsData?.questions?.length])

  // // Điều khiển mở/đóng theo openSet (chỉ chạy sau khi đã khởi tạo)
  // useEffect(() => {
  //   // Only run on client side to prevent hydration mismatch
  //   if (typeof window === 'undefined' || !isInitialized) return
  //   const len = faqsData?.questions?.length ?? 0
  //   for (let i = 0; i < len; i++) {
  //     const tl = tlRefs.current[i]
  //     const contentEl = contentRefs.current[i]
  //     const iconEl = iconRefs.current[i]
  //     if (!tl || !contentEl || !iconEl) continue

  //     if (openSet.has(i)) {
  //       gsap.set(contentEl, {display: 'flex', overflow: 'hidden'})
  //       tl.play()
  //     } else {
  //       tl.reverse()
  //     }
  //   }
  // }, [openSet, faqsData, isInitialized])

  // const toggleItem = (i: number) => {
  //   setOpenSet((prev) => {
  //     const next = new Set(prev)
  //     if (next.has(i)) next.delete(i)
  //     else next.add(i)
  //     return next
  //   })
  // }

  const title = faqsData?.title ?? 'Câu hỏi thường gặp'

  return (
    <div className='flex w-[full] flex-col items-start gap-[0.625rem] bg-white px-4 py-10 sm:p-[5rem_6rem] relative overflow-hidden xsm:bg-[#fff]'>
      <Image
        src={'/newPage/img2.png'}
        width={1380}
        height={1022}
        alt='background'
        className='w-[86.25794rem] h-[63.91225rem] absolute left-[-17.25rem] bottom-[-11.78294rem] rotate-[9.508deg] object-contain xsm:hidden pointer-events-none'
      />
      <div className='flex w-full flex-col items-center gap-[1.5rem] sm:w-[88rem] sm:gap-[2.5rem] z-10'>
        <div className='flex w-full items-center justify-between gap-4 sm:w-[62.5rem]'>
          <h2 className='text-center font-montserrat text-[1.25rem] font-bold not-italic leading-[120%] tracking-[-0.105rem] text-[color:var(--greyscaletext-92,rgba(0,0,0,0.92))] sm:text-[2.625rem]'>
            {title}
          </h2>
        </div>

        <div className='flex w-full flex-col items-start sm:w-[62.5rem] sm:gap-2'>
          {/* {faqsData?.questions?.map((item, index) => {
            const isOpen = openSet.has(index)
            return (
              <div
                key={index}
                className='w-full'
              >
           
                <div className='mb-2 flex w-full items-center justify-between gap-2'>
                  <div className='flex h-[3rem] w-[3rem] items-center self-stretch rounded-[3.125rem] bg-white p-2 shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:h-[4.125rem] sm:w-[4.125rem] sm:p-[0.8125rem]'>
                    <ICQuestion className='h-8 w-8 sm:h-[2.5rem] sm:w-[2.5rem] xsm:hidden' />
                    <Image
                      src={'/newPage/question_mb.svg'}
                      alt='question'
                      width={80}
                      height={80}
                      className='sm:hidden size-[2rem]'
                    />
                  </div>

                  <button
                    onClick={() => toggleItem(index)}
                    className='flex w-full flex-[1_0_0] relative items-center justify-between gap-4 rounded-[0_0.75rem_0.75rem_0.75rem] bg-white px-4 py-4 text-left shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:gap-6 sm:rounded-[0_1.25rem_1.25rem_1.25rem] sm:p-[1.25rem_1.25rem_1.25rem_1.5rem]'
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <Image
                      src={'/newPage/tamgiac.svg'}
                      alt='arrow'
                      width={40}
                      height={40}
                      className='w-[1.375rem] h-[1rem] absolute top-0 left-0 -translate-x-1/2 rotate-180'
                    />
                    <span className='flex items-start justify-start text-start font-montserrat xsm:leading-[140%] text-[0.75rem] font-semibold not-italic leading-[1.05rem] tracking-[-0.05rem] text-[var(--greyscaletext-92,#292F36)] sm:text-xl sm:leading-[1.75rem]'>
                      {item?.question ?? ''}
                    </span>
                    <ICPlus
                      className={`sm:h-6 sm:w-6 h-[0.875rem] w-[0.875rem] transform text-[var(--greyscaletext-80,rgba(0,0,0,0.80))] transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    />
                  </button>
                </div>

                <div className='mb-2 flex w-full items-center justify-between gap-2'>
                  <div className='flex h-[3rem] w-[3rem] items-center self-stretch rounded-[3.125rem] bg-white p-2 shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:h-[4.125rem] sm:w-[4.125rem] sm:p-[0.8125rem]'>
                    <ICQuestion className='h-8 w-8 sm:h-[2.5rem] sm:w-[2.5rem] xsm:hidden' />
                    <Image
                      src={'/newPage/question_mb.svg'}
                      alt='question'
                      width={80}
                      height={80}
                      className='sm:hidden size-[2rem]'
                    />
                  </div>

                  <button
                    onClick={() => toggleItem(index)}
                    className='flex w-full flex-[1_0_0] relative items-center justify-between gap-4 rounded-[0_0.75rem_0.75rem_0.75rem] bg-white px-4 py-4 text-left shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:gap-6 sm:rounded-[0_1.25rem_1.25rem_1.25rem] sm:p-[1.25rem_1.25rem_1.25rem_1.5rem]'
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <Image
                      src={'/newPage/tamgiac.svg'}
                      alt='arrow'
                      width={40}
                      height={40}
                      className='w-[1.375rem] h-[1rem] absolute top-0 left-0 -translate-x-1/2 rotate-180'
                    />
                    <span className='flex items-start justify-start text-start font-montserrat xsm:leading-[140%] text-[0.75rem] font-semibold not-italic leading-[1.05rem] tracking-[-0.05rem] text-[var(--greyscaletext-92,#292F36)] sm:text-xl sm:leading-[1.75rem]'>
                      {item?.question ?? ''}
                    </span>
                    <ICPlus
                      className={`sm:h-6 sm:w-6 h-[0.875rem] w-[0.875rem] transform text-[var(--greyscaletext-80,rgba(0,0,0,0.80))] transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    />
                  </button>
                </div>

              
                <div className='flex w-full gap-2'>
                  <div
                    ref={(el) => {
                      if (el) contentRefs.current[index] = el
                    }}
                    id={`faq-panel-${index}`}
                    className='flex w-full items-end justify-between gap-2 pb-4'
                    style={{
                      display: index === 0 ? 'flex' : 'none',
                      height: index === 0 ? 'auto' : 0,
                      opacity: index === 0 ? 1 : 0,
                    }}
                  >
                    <div className='flex relative text-[1rem] flex-[1_0_0] flex-col items-start xsm:[&_*]:text-[0.75rem]  xsm:[&_*]:leading-[140%] xsm:[&_*]:font-normal   xsm:[&_*]:tracking-[-0.0225rem] gap-6 rounded-[0.75rem_0.75rem_0_0.75rem] bg-white px-4 py-3 shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:rounded-[1.25rem_1.25rem_0_1.25rem] sm:p-[1.25rem_1.25rem_1.25rem_1.5rem]'>
                     
                      <Image
                        src={'/newPage/tamgiac.svg'}
                        alt='mess'
                        width={40}
                        height={40}
                        className='w-[1.375rem] h-[1rem] absolute right-0 bottom-0 translate-x-1/2 '
                      />
                      <div
                        className='prose max-w-none custom-prose'
                        dangerouslySetInnerHTML={{__html: item?.answer ?? ''}}
                      />
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
          })} */}

          <Accordion
            type='single'
            collapsible
            className='w-full'
            defaultValue='item-0'
          >
            {faqsData?.questions?.map((item, index) => {
              return (
                <AccordionItem
                  value={'item-' + index}
                  key={index}
                  className='border-none'
                >
                  <div className='w-full'>
                    <AccordionTrigger>
                      <div className='mb-2 flex w-full items-center justify-between gap-2'>
                        <div className='flex h-[3rem] w-[3rem] items-center self-stretch rounded-[3.125rem] bg-white p-2 shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:h-[4.125rem] sm:w-[4.125rem] sm:p-[0.8125rem]'>
                          <ICQuestion className='h-8 w-8 sm:h-[2.5rem] sm:w-[2.5rem] xsm:hidden' />
                          <Image
                            src={'/newPage/question_mb.svg'}
                            alt='question'
                            width={80}
                            height={80}
                            className='sm:hidden size-[2rem]'
                          />
                        </div>

                        <div className='flex w-full flex-[1_0_0] relative items-center justify-between gap-4 rounded-[0_0.75rem_0.75rem_0.75rem] bg-white px-4 py-4 text-left shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:gap-6 sm:rounded-[0_1.25rem_1.25rem_1.25rem] sm:p-[1.25rem_1.25rem_1.25rem_1.5rem]'>
                          <Image
                            src={'/newPage/tamgiac.svg'}
                            alt='arrow'
                            width={40}
                            height={40}
                            className='w-[1.375rem] h-[1rem] absolute top-0 left-0 -translate-x-1/2 rotate-180'
                          />
                          <span className='flex items-start justify-start text-start font-montserrat xsm:leading-[140%] text-[0.75rem] font-semibold not-italic leading-[1.05rem] tracking-[-0.05rem] text-[var(--greyscaletext-92,#292F36)] sm:text-xl sm:leading-[1.75rem]'>
                            {item?.question ?? ''}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className='flex w-full gap-2'>
                        <div className='flex w-full items-end justify-between gap-2 pb-4'>
                          <div className='flex relative text-[1rem] flex-[1_0_0] flex-col items-start xsm:[&_*]:text-[0.75rem]  xsm:[&_*]:leading-[140%] xsm:[&_*]:font-normal   xsm:[&_*]:tracking-[-0.0225rem] gap-6 rounded-[0.75rem_0.75rem_0_0.75rem] bg-white px-4 py-3 shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:rounded-[1.25rem_1.25rem_0_1.25rem] sm:p-[1.25rem_1.25rem_1.25rem_1.5rem]'>
                            <Image
                              src={'/newPage/tamgiac.svg'}
                              alt='mess'
                              width={40}
                              height={40}
                              className='w-[1.375rem] h-[1rem] absolute right-0 bottom-0 translate-x-1/2'
                            />
                            <div
                              className='prose max-w-none custom-prose'
                              dangerouslySetInnerHTML={{
                                __html: item?.answer ?? '',
                              }}
                            />
                          </div>

                          <div className='flex h-[3rem] w-[3rem] items-center rounded-full bg-white p-2 shadow-[0_4px_19.3px_0_rgba(0,39,97,0.06)] sm:h-[4.125rem] sm:w-[4.125rem]'>
                            <ICMessage className='h-8 w-8 sm:h-10 sm:w-10' />
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              )
            })}
          </Accordion>
          {(!faqsData?.questions || faqsData.questions.length === 0) && (
            <div className='rounded-lg border border-dashed p-4 text-sm opacity-70'>
              Hiện chưa có câu hỏi nào.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Faqs
