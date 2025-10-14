'use client'

import useStore from '@/app/(store)/store'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { IInformationTimeOrder } from '@/sections/tao-don/oder.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function OrderStepTimeV2({
  dataInformation,
  handleClickcurrentTab,
  nextStep,
  setIndexTab,
  indexTab,
  setSelectedImage,
}: {
  dataInformation?: IInformationTimeOrder[]
  handleClickcurrentTab: (nextTab: string) => void
  nextStep: string
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
}) {
  const FormSchema = z.object({
    policy: z.array(
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
      policy: Array.isArray(dataInformation)
        ? dataInformation?.map(() => (stepOrder > 2 ? true : false))
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
    if (!dataInformation) {
      if (stepOrder < 3) {
        setStepOrder(3)
      }
      handleClickcurrentTab('3')
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
  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data) {
      if (stepOrder < 3) {
        setStepOrder(Number(nextStep))
      }
      setIndexTab(indexTab + 1)
      form.reset()
      handleClickcurrentTab(nextStep)
      setTriggerScroll(true)
    }
  }
  return (
    <div className='space-y-[1.5rem] xsm:space-y-[0.75rem]'>
      <p className='text-[#33A6E8] text-pc-sub16b sm:hidden'>
        Thời gian gửi hàng
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-[1.59rem]'
        >
          {Array.isArray(dataInformation) &&
            dataInformation?.map(
              (item: IInformationTimeOrder, index: number) => (
                <Fragment key={index}>
                  <div className='rounded-[1.25rem] bg-white p-[1rem]'>
                    <p className='mb-[0.75rem] font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem] text-black xsm:!font-bold xsm:text-pc-sub14s'>
                      {item?.time_content}
                    </p>
                    <div
                      ref={(el) => {
                        containerRefs.current[index] = el
                      }}
                      className='[&_ul]:content-ul [&_ol]:content-ol mb-[1rem] *:font-medium *:text-black/[0.92] *:text-pc-14 *:xsm:text-mb-13 [&>p>span]:font-medium [&_a]:text-[#0084FF] [&_em]:text-[0.75rem] [&_em]:font-semibold [&_em]:not-italic [&_em]:tracking-[-0.015rem] [&_em]:text-[#8F8F8F] [&_h3]:text-pc-tab-title [&_img]:my-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[1rem] [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 [&_strong]:text-pc-sub14s marker:[&_ul_li]:text-[0.65rem] xsm:marker:[&_ul_li]:text-[0.5rem]'
                      dangerouslySetInnerHTML={{
                        __html: item?.stock || '',
                      }}
                    ></div>
                    <FormField
                      control={form.control}
                      name={`policy.${index}`}
                      render={({field}) => (
                        <FormItem className='relative flex flex-row items-center space-x-[0.5rem] space-y-0 border-none'>
                          <FormControl>
                            <Checkbox
                              className={cn(
                                'relative aspect-square size-[1.25rem] rounded-[0.375rem] border-[1.5px] border-[#A3DDFF] bg-white shadow-none transition-all duration-150 sm:size-[1.5rem] sm:rounded-[0.5rem]',
                                'data-[state=checked]:border-[#38B6FF] data-[state=checked]:bg-[#38B6FF]',
                              )}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className='space-y-1 leading-none'>
                            <FormLabel className='cursor-pointer !font-semibold text-black/[0.92] text-pc-sub14s xsm:line-clamp-2 xsm:!font-semibold xsm:text-mb-13M'>
                              {item?.clause ||
                                'Tôi đồng ý với điều khoản của Amamy'}
                            </FormLabel>
                          </div>
                          <FormMessage className='absolute bottom-[-80%] left-0 pl-[0.75rem] !text-[#F00] text-pc-sub12m' />
                        </FormItem>
                      )}
                    />
                  </div>
                </Fragment>
              ),
            )}
          <div className='flex items-center justify-between space-x-[2rem] sm:w-full xsm:fixed xsm:bottom-0 xsm:left-0 xsm:right-0 xsm:z-[49] xsm:space-x-[0.5rem] xsm:bg-[#FAFAFA] xsm:p-[1rem] disabled:xsm:opacity-[1]'>
            <div
              onClick={() => {
                handleClickcurrentTab('1')
                setIndexTab(indexTab - 1)
                // setDataInformation(undefined)
                // setDataFromOrder({...dataFromOrder})
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
