'use client'

import {Fragment, useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import useStore from '@/app/(store)/store'
import {cn} from '@/lib/utils'
import {IInformationNoteOrder} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import ICMessageQuestion from '@/components/icon/ICMessageQuestion'
import useIsMobile from '@/hooks/useIsMobile'
import ICStar from '@/components/icon/ICStar'

export default function CeateNote({
  data,
  handleClickcurrentTab,
  prevStep,
  setIndexTab,
  indexTab,
  setSelectedImage,
}: {
  data?: IInformationNoteOrder[]
  handleClickcurrentTab: (nextTab: string) => void
  prevStep: string
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
  type?: string
  importantNote?: string
}) {
  const isMobile = useIsMobile()

  const FormSchema = z.object({
    note: z.array(
      z.boolean().refine((value) => value === true, {
        message: 'Vui lòng đồng ý với điều khoản của chúng tôi.',
      }),
    ),
    noteOptions: z.record(z.string(), z.string().optional()),
    // Dynamic fields for note_options agreements (checkboxes)
    noteOptionsAgreement: z.record(z.string(), z.boolean()),
  })
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      note: Array.isArray(data)
        ? data?.map(() => (stepOrder > 3 ? true : false))
        : [],
      noteOptions: {},
      noteOptionsAgreement: {},
    },
  })
  useEffect(() => {
    containerRefs.current.forEach((container) => {
      if (!container) return
      const images = container.querySelectorAll('img')
      images.forEach((img) => {
        img.style.cursor = 'pointer' // Biến con trỏ thành bàn tay khi hover
        img.onclick = () => {
          // Extract the highest resolution image from srcset if available
          if (img.srcset) {
            const srcsetEntries = img.srcset.split(',').map((entry) => {
              const [url, size] = entry.trim().split(' ')
              // Parse the size value (e.g., "2x" or "1200w")
              const sizeValue = size
                ? size.endsWith('w')
                  ? parseInt(size.replace(/[w]$/, '')) // Only handle width-based sizes like 1200w
                  : 0 // Ignore density descriptors like 2x
                : 0
              return {
                url,
                sizeValue,
                hasWidthDescriptor: size?.endsWith('w') || false,
              }
            })

            // Filter for entries with width descriptors only (like 1200w)
            const widthBasedEntries = srcsetEntries.filter(
              (entry) => entry.hasWidthDescriptor,
            )

            if (widthBasedEntries.length > 0) {
              // Sort by width value in descending order and get the URL with the largest width
              widthBasedEntries.sort((a, b) => b.sizeValue - a.sizeValue)
              setSelectedImage(widthBasedEntries[0].url)
            } else {
              // Fallback to src if no width-based entries are found
              setSelectedImage(img.src)
            }
          }
        } // Khi click, mở ảnh lên
      })
    })
  })
  useEffect(() => {
    if (!data) {
      if (stepOrder < 4) {
        setStepOrder(4)
      }
      handleClickcurrentTab('4')
      setTriggerScroll(true)
    }
  }, [])
  const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'})
  useEffect(() => {
    if (triggerScroll) {
      scrollToTop()
      setTriggerScroll(false)
    }
  }, [triggerScroll])
  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (values) {
      if (stepOrder < 4) {
        setStepOrder(4)
      }
      setIndexTab(indexTab + 1)
      form.reset()
      handleClickcurrentTab('4')
      setTriggerScroll(true)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-[1.75rem] xsm:space-y-[1.25rem]'
      >
        {Array.isArray(data) &&
          data?.map((item: IInformationNoteOrder, index: number) => {
            const html = item?.text || ''
            const imgs = html.match(/<img[^>]*>/g) || []
            const content = html.replace(/<img[^>]*>/g, '').trim()

            return (
              <div
                key={index}
                className='space-y-[1.75rem] xsm:space-y-[1.25rem]'
              >
                <div className='rounded-[2.25rem] bg-white p-[1.5rem] shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)] xsm:space-y-[1.25rem] xsm:rounded-[2rem] xsm:p-[1rem]'>
                  <div>
                    <div className='mb-[1rem]'>
                      <h3 className='font-montserrat text-[1rem] font-semibold leading-[1.625rem] tracking-[-0.03rem] text-[rgba(0,0,0,0.92)] xsm:text-[0.875rem] xsm:leading-[1.225rem] xsm:tracking-[-0.035rem]'>
                        {item?.title}
                      </h3>
                    </div>

                    {imgs.length > 0 && (
                      <>
                        {imgs.map((img, i) => {
                          const roundedImg = img.replace(
                            /<img(.*?)>/,
                            `<img$1 style="border-radius:1rem;">`,
                          )

                          return (
                            <div
                              key={i}
                              ref={(el) => {
                                containerRefs.current[index] = el
                              }}
                              className='[&_img]:my-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[1rem]'
                              dangerouslySetInnerHTML={{__html: roundedImg}}
                            />
                          )
                        })}
                      </>
                    )}

                    <div className='mt-[1rem] flex flex-col items-start xsm:mb-[0.5rem] xsm:mt-[1.5rem] xsm:p-0'>
                      {/* icon */}
                      <div className='flex items-center space-x-[0.38rem] sm:space-x-[0.69rem]'>
                        <ICMessageQuestion className='size-[1.5rem] shrink-0' />
                        <p className='text-[1rem] font-bold leading-[1.5rem] tracking-[-0.03rem] text-[#33A6E8] xsm:text-[0.875rem] xsm:leading-[1.3125rem] xsm:tracking-[-0.02625rem]'>
                          LƯU Ý
                        </p>
                      </div>

                      <div
                        className={cn(
                          '*:text-[0.875rem] *:font-medium *:leading-[1.3125rem] *:tracking-[-0.02625rem] *:text-[rgba(0,0,0,0.80)] xsm:*:text-[0.8125rem] xsm:*:leading-[1.21875rem] xsm:*:tracking-[-0.02438rem]',
                          '[&_ul]:!my-3 [&_ul]:!list-disc [&_ul]:!px-[1.4rem] [&_ul]:xsm:!px-[1rem]',
                          '[&_ol]:!my-3 [&_ol]:!list-decimal [&_ol]:!px-[1.4rem] [&_ol]:xsm:!px-[1rem]',
                          '[&_p]:pt-[0.62rem] first:[&_p]:pt-0 [&_p]:xsm:pt-[0.38rem]',
                        )}
                        dangerouslySetInnerHTML={{__html: content}}
                      ></div>

                      <FormField
                        control={form.control}
                        name={`note.${index}`}
                        render={({field}) => (
                          <FormItem className='relative mt-[1.25rem] flex flex-row items-center space-x-[0.5rem] space-y-0 border-none xsm:mt-[1rem]'>
                            <FormControl>
                              <Checkbox
                                className={cn(
                                  'relative aspect-square size-[1.25rem] rounded-[0.375rem] border-[0.094rem] border-[#A3DDFF] bg-white shadow-none transition-all duration-150 sm:size-[1.5rem] sm:rounded-[0.5rem]',
                                  'data-[state=checked]:border-[#38B6FF] data-[state=checked]:bg-[#38B6FF]',
                                )}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                              <FormLabel className='cursor-pointer text-[0.875rem] font-semibold leading-normal tracking-[-0.0175rem] text-[rgba(0,0,0,0.92)] xsm:line-clamp-2 xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'>
                                {item?.agree_with ||
                                  'Tôi đã đọc và đồng ý với chính sách về kiện hàng'}
                              </FormLabel>
                            </div>
                            <FormMessage className='absolute bottom-[-80%] left-0 pl-[0.75rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* TEST */}
                {Array.isArray(item.note_options) &&
                  item.note_options.length > 0 &&
                  item.note_options.map((noteOpt, noteIdx) => {
                    if (!noteOpt?.list_note_options?.length) return null

                    const radioFieldName = `noteOptions.${index}-${noteIdx}`
                    const checkboxFieldName = `noteOptionsAgreement.${index}-${noteIdx}`

                    return (
                      <Fragment key={`${index}-${noteIdx}`}>
                        <div className='rounded-[2.25rem] bg-white p-[1.5rem] shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)] xsm:rounded-[2rem] xsm:p-[1rem]'>
                          {noteOpt.note_options_title && (
                            <div className='mb-[1rem]'>
                              <h3 className='font-montserrat text-[1rem] font-semibold leading-[1.625rem] tracking-[-0.03rem] text-[rgba(0,0,0,0.92)] xsm:text-[0.875rem] xsm:leading-[1.225rem] xsm:tracking-[-0.035rem]'>
                                {noteOpt?.note_options_title}
                              </h3>
                            </div>
                          )}

                          <>
                            <div className='space-y-[0.75rem] xsm:space-y-[0.5rem]'>
                              {noteOpt.list_note_options.map(
                                (opt, optIndex) => {
                                  return (
                                    <FormField
                                      key={`${index}-${noteIdx}-${optIndex}`}
                                      control={form.control}
                                      name={
                                        radioFieldName as `noteOptions.${string}`
                                      }
                                      render={({field}) => {
                                        const isChecked =
                                          field.value === opt?.label

                                        return (
                                          <FormItem
                                            className={cn(
                                              'relative flex flex-row items-center space-x-[0.75rem] space-y-0 rounded-[2.25rem] border-[0.075rem] px-[1.25rem] py-[0.88rem] transition-all duration-150 xsm:space-x-[0.5rem] xsm:rounded-[2rem] xsm:py-[0.62rem] xsm:pl-[0.75rem]',
                                              isChecked
                                                ? 'border-[#38B6FF] bg-[#F1F9FF]'
                                                : 'border-transparent bg-[rgba(239,239,239,0.60)]',
                                            )}
                                          >
                                            <FormControl>
                                              <Checkbox
                                                className={cn(
                                                  // layout reset
                                                  'relative box-border inline-flex items-center justify-center align-middle',
                                                  // fixed shape
                                                  'size-[1.25rem] rounded-full border border-[#A3DDFF]',
                                                  // visual bg
                                                  'bg-[rgba(239,239,239,0.60)] shadow-none transition-all duration-200 ease-out',
                                                  // ensure perfect circle
                                                  'aspect-square overflow-hidden',
                                                  // handle checked state
                                                  'data-[state=checked]:border-[#38B6FF] data-[state=checked]:bg-transparent',
                                                  // hide radix default SVG
                                                  '[&_svg]:hidden',
                                                  // span (indicator wrapper)
                                                  'flex items-center justify-center [&>span]:absolute [&>span]:inset-0',
                                                  // pseudo indicator
                                                  '[&>span]:before:block [&>span]:before:rounded-full [&>span]:before:transition-all [&>span]:before:duration-200',
                                                  '[&>span]:before:size-[0.75rem] [&>span]:before:bg-transparent [&>span]:before:content-[""]',
                                                  '[&[data-state=checked]>span:before]:!bg-[#38B6FF]',
                                                  // fine-tune optical centering
                                                  'translate-y-[0.5px]', // adjusts subpixel misalignment
                                                )}
                                                checked={isChecked}
                                                onCheckedChange={(checked) => {
                                                  field.onChange(
                                                    checked
                                                      ? opt?.label
                                                      : undefined,
                                                  )
                                                }}
                                              />
                                            </FormControl>
                                            <div className='flex flex-col gap-y-[0.25rem] leading-none'>
                                              <div className='flex sm:items-center sm:space-x-[0.5rem] xsm:flex-wrap xsm:gap-[0.19rem]'>
                                                {isMobile && opt?.tag && (
                                                  <div className='flex items-center space-x-[0.25rem] rounded-[62.5rem] bg-[#3FC371] p-[0.12rem_0.38rem] sm:hidden'>
                                                    <ICStar className='size-[0.75rem]' />
                                                    <p className='font-montserrat text-[0.625rem] font-semibold leading-[0.875rem] tracking-[-0.01875rem] text-white flex-center'>
                                                      {opt?.tag}
                                                    </p>
                                                  </div>
                                                )}
                                                <FormLabel className='cursor-pointer font-montserrat text-[0.875rem] font-semibold leading-normal tracking-[-0.0175rem] text-[rgba(0,0,0,0.92)] xsm:line-clamp-2 xsm:text-[0.8125rem] xsm:tracking-[-0.01625rem]'>
                                                  {opt?.label}
                                                </FormLabel>
                                                {!isMobile && opt?.tag && (
                                                  <div className='flex items-center space-x-[0.25rem] rounded-[62.5rem] bg-[#3FC371] p-[0.25rem_0.75rem] xsm:hidden'>
                                                    <ICStar className='size-[0.875rem]' />
                                                    <p className='font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-white flex-center'>
                                                      {opt?.tag}
                                                    </p>
                                                  </div>
                                                )}
                                              </div>
                                              {opt?.description && (
                                                <FormLabel
                                                  className='cursor-pointer text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.80)] xsm:text-[0.8125rem] xsm:leading-[1.21875rem] xsm:tracking-[-0.02438rem]'
                                                  dangerouslySetInnerHTML={{
                                                    __html: opt?.description,
                                                  }}
                                                ></FormLabel>
                                              )}
                                            </div>
                                          </FormItem>
                                        )
                                      }}
                                    />
                                  )
                                },
                              )}
                            </div>

                            {noteOpt?.note_more && (
                              <div className='mt-[1rem] flex flex-col items-start xsm:mb-[0.5rem] xsm:mt-[1.5rem] xsm:p-0'>
                                {/* icon */}
                                <div className='mb-[0.63rem] flex items-center space-x-[0.38rem] sm:space-x-[0.69rem] xsm:mb-[0.5rem]'>
                                  <ICMessageQuestion className='size-[1.5rem] shrink-0' />
                                  <p className='text-[1rem] font-bold leading-[1.5rem] tracking-[-0.03rem] text-[#33A6E8] xsm:text-[0.875rem] xsm:leading-[1.3125rem] xsm:tracking-[-0.02625rem]'>
                                    LƯU Ý
                                  </p>
                                </div>

                                <div
                                  className={cn(
                                    '*:text-[0.875rem] *:font-medium *:leading-[1.3125rem] *:tracking-[-0.02625rem] *:text-[rgba(0,0,0,0.80)] xsm:*:text-[0.8125rem] xsm:*:leading-[1.21875rem] xsm:*:tracking-[-0.02438rem]',
                                    '[&_ul]:!my-3 [&_ul]:!list-disc [&_ul]:!px-[1.4rem] [&_ul]:xsm:!px-[1rem]',
                                    '[&_ol]:!my-3 [&_ol]:!list-decimal [&_ol]:!px-[1.4rem] [&_ol]:xsm:!px-[1rem]',
                                    '[&_p]:pt-[0.62rem] first:[&_p]:pt-0 [&_p]:xsm:pt-[0.38rem]',
                                  )}
                                  dangerouslySetInnerHTML={{
                                    __html: noteOpt.note_more,
                                  }}
                                ></div>
                              </div>
                            )}

                            <FormField
                              control={form.control}
                              name={
                                checkboxFieldName as `noteOptionsAgreement.${string}`
                              }
                              render={({field}) => (
                                <FormItem className='relative mt-[1.25rem] flex flex-row items-center space-x-[0.5rem] space-y-0 border-none xsm:mt-[1rem]'>
                                  <FormControl>
                                    <Checkbox
                                      className={cn(
                                        'relative aspect-square size-[1.25rem] rounded-[0.375rem] border-[0.094rem] border-[#A3DDFF] bg-white shadow-none transition-all duration-150 sm:size-[1.5rem] sm:rounded-[0.5rem]',
                                        'data-[state=checked]:border-[#38B6FF] data-[state=checked]:bg-[#38B6FF]',
                                      )}
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className='space-y-1 leading-none'>
                                    <FormLabel className='cursor-pointer text-[0.875rem] font-semibold leading-normal tracking-[-0.0175rem] text-[rgba(0,0,0,0.92)] xsm:line-clamp-2 xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'>
                                      {noteOpt.note_options_clause ||
                                        'Tôi đồng ý với điều khoản của Amamy'}
                                    </FormLabel>
                                  </div>
                                  <FormMessage className='absolute bottom-[-80%] left-0 pl-[0.75rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                                </FormItem>
                              )}
                            />
                          </>
                        </div>
                      </Fragment>
                    )
                  })}
                {/* TEST */}
              </div>
            )
          })}

        <div className='mt-[1.5rem] flex w-full items-center justify-between space-x-[1.25rem] xsm:fixed xsm:bottom-0 xsm:left-0 xsm:right-0 xsm:z-[49] xsm:mt-0 xsm:space-x-[0.5rem] xsm:bg-[#FAFAFA] xsm:p-[1rem] disabled:xsm:opacity-[1]'>
          <div
            onClick={() => {
              handleClickcurrentTab(prevStep)
              setIndexTab(indexTab - 1)
            }}
            className='flex-1 cursor-pointer rounded-[1.25rem] bg-[#D9F1FF] p-[0.75rem_1.5rem] flex-center'
          >
            <p className='text-black text-pc-sub16m'>Quay lại</p>
          </div>
          <Button
            type='submit'
            disabled={!form.formState.isValid}
            className={cn(
              'ml-auto mt-[0rem] h-[2.8125rem] flex-1 rounded-[1.25rem] bg-[#38B6FF] p-[0.75rem_1.5rem] !shadow-none flex-center hover:bg-[#38B6FF]',
              !form.formState.isValid &&
                'bg-[#F0F0F0] [&_p]:text-[rgba(0,0,0,0.30)]',
            )}
          >
            <p className='text-white text-pc-sub16m'>Tiếp tục</p>
          </Button>
        </div>
      </form>
    </Form>
  )
}
