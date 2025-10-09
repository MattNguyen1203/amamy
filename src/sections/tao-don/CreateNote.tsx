'use client'

import {useEffect, useRef, useState} from 'react'
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

export default function CeateNote({
  data,
  handleClickcurrentTab,
  prevStep,
  setIndexTab,
  indexTab,
  setSelectedImage,
  type,
  importantNote,
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
  const FormSchema = z.object({
    note: z.array(
      z.boolean().refine((value) => value === true, {
        message: 'Vui lòng đồng ý với điều khoản của chúng tôi.',
      }),
    ),
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
    <div className=''>
      <p className='mb-[1.5rem] text-[#33A6E8] text-pc-sub16b xsm:mb-[0.75rem] xsm:hidden'>
        Lưu ý quan trọng khi gửi hàng
      </p>
      {type === 'nhatviet' && (
        <div className='mb-[1.75rem] mt-[1.75rem] xsm:pl-[1rem]'>
          <div className='mb-[0.75rem] text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem] text-black xsm:text-[0.875rem] xsm:leading-[1.4] xsm:tracking-[-0.035rem]'>
            Lưu ý quan trọng về mã bưu điện nội địa Nhật
          </div>
          <p
            ref={(el) => {
              containerRefs.current[data?.length || 0] = el
            }}
            dangerouslySetInnerHTML={{
              __html: importantNote || '',
            }}
            className='[&_ul]:content-ul flex-1 text-[rgba(0,0,0,0.80)] text-pc-sub14m *:text-[rgba(0,0,0,0.90)] *:text-pc-sub14m *:xsm:text-mb-13 [&_a]:text-[#0084FF] [&_h3]:text-black [&_h3]:text-pc-tab-title [&_img]:my-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[1rem] [&_strong]:text-black [&_strong]:text-pc-sub14s [&_ul]:!my-0 marker:[&_ul_li]:text-[#f00] xsm:marker:[&_ul_li]:text-[0.5rem]'
          ></p>
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-[1.5rem] xsm:space-y-[0.75rem]'
        >
          {Array.isArray(data) &&
            data?.map((item: IInformationNoteOrder, index: number) => (
              <div
                key={index}
                className='space-y-[1rem] rounded-[1.25rem] bg-white p-[1rem] xsm:rounded-[2.125rem] xsm:shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)]'
              >
                <p className='mb-[0.88rem] font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem] text-black xsm:!font-bold xsm:text-pc-sub14s'>
                  {item?.title}
                </p>
                <div
                  ref={(el) => {
                    containerRefs.current[index] = el
                  }}
                  className='[&_ul]:content-ul [&_ol]:content-ol mb-[1rem] *:font-medium *:text-black/[0.92] *:text-pc-14 *:xsm:text-mb-13 xsm:[&_*]:!text-[rgba(0,0,0,0.60)] [&_a]:text-[#0084FF] [&_h3]:text-pc-tab-title [&_img]:my-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[1rem] [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 [&_strong]:text-pc-sub14s marker:[&_ul_li]:text-[0.65rem] xsm:marker:[&_ul_li]:text-[0.5rem]'
                  dangerouslySetInnerHTML={{
                    __html: item?.text || '',
                  }}
                ></div>
                <FormField
                  control={form.control}
                  name={`note.${index}`}
                  render={({field}) => (
                    <FormItem className='relative flex flex-row items-center space-x-[0.5rem] space-y-0 border-none'>
                      <FormControl>
                        <Checkbox
                          className={cn(
                            'relative aspect-square size-[1.25rem] rounded-[0.375rem] border-[1.5px] border-[#A3DDFF] bg-white shadow-none transition-all duration-150 sm:size-[1.5rem] sm:rounded-[0.5rem]',
                            'data-[state=checked]:border-[#38B6FF] data-[state=checked]:bg-[#38B6FF]',
                          )}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel className='cursor-pointer !font-semibold text-black/[0.92] text-pc-sub14m xsm:line-clamp-2 xsm:text-mb-13M'>
                          {item?.agree_with ||
                            'Tôi đã đọc và đồng ý với chính sách về kiện hàng'}
                        </FormLabel>
                      </div>
                      <FormMessage className='absolute bottom-[-80%] left-0 pl-[0.75rem] text-pc-sub12m first-letter:!text-[#F00]' />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          <div className='flex items-center justify-between space-x-[1.25rem] sm:w-full xsm:fixed xsm:bottom-0 xsm:left-0 xsm:right-0 xsm:z-[49] xsm:space-x-[0.5rem] xsm:bg-[#FAFAFA] xsm:p-[1rem] disabled:xsm:opacity-[1]'>
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
    </div>
  )
}
