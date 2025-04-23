'use client'
import useStore from '@/app/(store)/store'
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
import {cn} from '@/lib/utils'
import {IInformationNoteOrder} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import {useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
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
      <p className='text-[#33A6E8] text-pc-sub16b mb-[1.5rem] xsm:mb-[0.75rem]'>
        Lưu ý quan trọng khi gửi hàng
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-[1.5rem] xsm:space-y-[0.75rem]'
        >
          {Array.isArray(data) &&
            data?.map((item: IInformationNoteOrder, index: number) => (
              <div
                key={index}
                className='p-[1rem] rounded-[1.25rem] bg-white space-y-[1rem]'
              >
                <p className='xsm:text-pc-sub14s mb-[0.88rem] xsm:!font-bold text-black font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
                  {item?.title}
                </p>
                <div
                  ref={(el) => {
                    containerRefs.current[index] = el
                  }}
                  className='[&_a]:text-[#0084FF] mb-[1rem] [&_h3]:text-pc-tab-title [&_strong]:text-pc-sub14s *:text-black/[0.92] *:text-pc-14 *:font-medium *:xsm:text-mb-13 [&_ul]:content-ul [&_ol]:content-ol [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 marker:[&_ul_li]:text-[0.65rem] xsm:marker:[&_ul_li]:text-[0.5rem] [&_img]:my-2 [&_img]:w-full [&_img]:h-auto [&_img]:rounded-[1rem]'
                  dangerouslySetInnerHTML={{
                    __html: item?.text || '',
                  }}
                ></div>
                <FormField
                  control={form.control}
                  name={`note.${index}`}
                  render={({field}) => (
                    <FormItem className='relative flex flex-row items-center space-y-0 space-x-[0.5rem] border-none'>
                      <FormControl>
                        <Checkbox
                          className='[&_.svg-none-check]:aria-[checked=false]:block size-[1.5rem] xsm:size-[1.25rem] flex-center border-none data-[state=checked]:bg-[#FFEC1F] bg-[#FFEC1F] data-[state=checked]:text-[#000000] text-[#000000]'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel className='cursor-pointer text-pc-sub14m !font-semibold text-black/[0.92] xsm:text-mb-13M xsm:line-clamp-2'>
                          {item?.agree_with ||
                            'Tôi đã đọc và đồng ý với chính sách về kiện hàng'}
                        </FormLabel>
                      </div>
                      <FormMessage className='pl-[0.75rem] first-letter:!text-[#F00] text-pc-sub12m absolute bottom-[-80%] left-0' />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          <div className='space-x-[2rem] xsm:p-[1rem] xsm:bg-[#FAFAFA] xsm:space-x-[0.5rem] xsm:fixed xsm:bottom-0 xsm:z-[49] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0 flex items-center justify-between sm:w-full'>
            <div
              onClick={() => {
                handleClickcurrentTab(prevStep)
                setIndexTab(indexTab - 1)
              }}
              className='flex-1 cursor-pointer p-[0.75rem_1.5rem] flex-center rounded-[1.25rem] bg-[#D9F1FF]'
            >
              <p className='text-pc-sub16m text-black'>Quay lại</p>
            </div>
            <Button
              type='submit'
              disabled={!form.formState.isValid}
              className={cn(
                '!shadow-none flex-1 hover:bg-[#38B6FF] mt-[0rem] ml-auto h-[2.8125rem] flex-center p-[0.75rem_1.5rem] rounded-[1.25rem] bg-[#38B6FF]',
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
