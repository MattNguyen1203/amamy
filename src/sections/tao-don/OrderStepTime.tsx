'use client'

import {Fragment, useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import useStore from '@/app/(store)/store'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import {IInformationTimeOrder} from '@/sections/tao-don/oder.interface'
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

export default function OrderStepTime({
  dataInformation,
  handleClickcurrentTab,
  nextStep,
  setIndexTab,
  indexTab,
  setSelectedImage,
  setDataFromOrder,
  dataFromOrder,
}: {
  dataInformation?: IInformationTimeOrder[]
  handleClickcurrentTab: (nextTab: string) => void
  nextStep: string
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  dataFromOrder: IDataFromOrder
}) {
  const FormSchema = z.object({
    policy: z.array(
      z.boolean().refine((value) => value === true, {
        message: 'Vui lòng đồng ý với điều khoản của chúng tôi.',
      }),
    ),
    userChoices: z.record(z.string(), z.string().optional()).refine(
      (choices) => {
        if (!Array.isArray(dataInformation)) return true

        const itemsWithUserChoices = dataInformation.filter(
          (item) => item?.user_chooses,
        )
        const requiredKeys = itemsWithUserChoices.map(
          (item) => item?.time_content,
        )

        return requiredKeys.every((key) => {
          if (!key) {
            return true
          }
          return choices[key] && choices[key] !== ''
        })
      },
      {
        message: 'Vui lòng chọn đầy đủ các tùy chọn bắt buộc.',
      },
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
      userChoices: dataFromOrder?.userChoices || {},
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
      setDataFromOrder({...dataFromOrder, userChoices: data?.userChoices})
      // form.reset()
      handleClickcurrentTab(nextStep)
      setTriggerScroll(true)
    }
  }
  return (
    <div className='space-y-[1.5rem] pb-[4rem] xsm:space-y-[0.75rem]'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-[1.59rem]'
        >
          {Array.isArray(dataInformation) &&
            dataInformation?.map(
              (item: IInformationTimeOrder, index: number) => (
                <Fragment key={index}>
                  <div className='h-full rounded-[1.25rem] bg-white p-[1rem] xsm:rounded-[2rem] xsm:shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)]'>
                    <p className='mb-[0.75rem] font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem] text-black xsm:!font-bold xsm:text-pc-sub14s'>
                      {item?.time_content}
                    </p>
                    {item?.user_chooses ? (
                      <>
                        <div className='mb-[0.875rem] space-y-[0.875rem] xsm:mb-[1rem] xsm:mt-[1rem] xsm:space-y-[0.62rem]'>
                          {item?.stock_user?.map((stockItem, stockIndex) => (
                            <FormField
                              key={stockIndex}
                              control={form.control}
                              name={`userChoices.${item?.time_content}`}
                              render={({field}) => {
                                const isChecked =
                                  field.value === stockItem?.label

                                return (
                                  <FormItem
                                    className={cn(
                                      'relative flex flex-row items-center space-x-[0.5rem] space-y-0 border-[0px] xsm:rounded-[2rem] xsm:border-[1.2px] xsm:p-[0.625rem_0.75rem] xsm:transition-all xsm:duration-150',
                                      isChecked
                                        ? 'xsm:border-[#38B6FF] xsm:bg-[#F1F9FF]'
                                        : 'xsm:border-transparent xsm:bg-[#EFEFEF99]',
                                    )}
                                  >
                                    <FormControl>
                                      <Checkbox
                                        className='size-[1.25rem] rounded-[100%] border-[1.66667px] border-solid border-[#000000] !bg-white flex-center data-[state=checked]:!border-[#38B6FF] xsm:border-[#A3DDFF] xsm:!bg-[#EFEFEF99] xsm:shadow-none [&>span]:size-[0.75rem] [&>span]:rounded-[100%] [&>span]:bg-transparent [&>span]:data-[state=checked]:!bg-[#38B6FF] [&_svg]:!hidden'
                                        checked={isChecked}
                                        onCheckedChange={(checked) => {
                                          field.onChange(
                                            checked
                                              ? stockItem?.label
                                              : undefined,
                                          )
                                        }}
                                      />
                                    </FormControl>
                                    <div className='flex flex-col leading-none'>
                                      <div className='flex sm:items-center sm:space-x-[0.3875rem] xsm:flex-wrap xsm:gap-[0.5rem]'>
                                        <FormLabel className='cursor-pointer !font-semibold text-black/[0.92] text-pc-sub14s xsm:line-clamp-2 xsm:!font-semibold xsm:text-mb-13S'>
                                          {stockItem?.label}
                                        </FormLabel>
                                        {stockItem?.tag && (
                                          <p className='rounded-[62.5rem] bg-[#5DAF46] p-[0.25rem_0.75rem] text-white flex-center text-pc-sub14m xsm:w-max xsm:text-[0.625rem] xsm:font-semibold xsm:leading-[1.4] xsm:tracking-[-0.01875rem]'>
                                            {stockItem?.tag}
                                          </p>
                                        )}
                                      </div>
                                      {stockItem?.desc && (
                                        <FormLabel className='cursor-pointer pt-[0.5rem] text-[rgba(0,0,0,0.80)] text-pc-sub14m xsm:pt-[0.1rem]'>
                                          <p
                                            className='text-[rgba(0,0,0,0.80)] text-pc-sub14m xsm:text-[rgba(0,0,0,0.60)]'
                                            dangerouslySetInnerHTML={{
                                              __html: stockItem?.desc,
                                            }}
                                          ></p>
                                        </FormLabel>
                                      )}
                                    </div>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        {item?.note_more && (
                          <div className='flex flex-col items-start'>
                            <div className='flex items-center space-x-[0.38rem]'>
                              <span className='flex size-[1.25rem] shrink-0 items-center justify-center rounded-md bg-Blue-Primary'>
                                <ICMessageQuestion className='size-[0.9rem]' />
                              </span>
                              <p className='text-[0.875rem] font-bold leading-[1.3125rem] tracking-[-0.02625rem] text-Blue-Primary'>
                                LƯU Ý
                              </p>
                            </div>
                            <p
                              className='mb-[1rem] mt-[0.5rem] text-[#F00] text-pc-sub14m'
                              dangerouslySetInnerHTML={{
                                __html: item?.note_more,
                              }}
                            ></p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div
                        ref={(el) => {
                          containerRefs.current[index] = el
                        }}
                        className='[&_ul]:content-ul [&_ol]:content-ol mb-[1rem] *:font-medium *:text-black/[0.92] *:text-pc-14 *:xsm:text-mb-13 [&>p>span]:font-medium [&_a]:text-[#0084FF] [&_em]:text-[0.75rem] [&_em]:font-semibold [&_em]:not-italic [&_em]:tracking-[-0.015rem] [&_em]:text-[#8F8F8F] [&_h3]:text-pc-tab-title [&_img]:my-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[1rem] [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 [&_strong]:text-pc-sub14s marker:[&_ul_li]:text-[0.65rem] xsm:marker:[&_ul_li]:text-[0.5rem]'
                        dangerouslySetInnerHTML={{
                          __html: item?.stock || '',
                        }}
                      ></div>
                    )}
                    <FormField
                      control={form.control}
                      name={`policy.${index}`}
                      render={({field}) => (
                        <FormItem className='relative flex flex-row items-center space-x-[0.5rem] space-y-0 border-none'>
                          <FormControl>
                            <Checkbox
                              className={cn(
                                'size-[1.875rem] border-[0px] bg-[#FFEC1F] text-[#000000] flex-center data-[state=checked]:bg-[#FFEC1F] data-[state=checked]:text-[#000000] [&>span>svg]:size-[1.25rem] [&_.svg-none-check]:aria-[checked=false]:block [&_svg]:size-[1rem]',
                                // mobile
                                'xsm:relative xsm:aspect-square xsm:size-[1.25rem] xsm:rounded-[0.375rem] xsm:border-[1.5px] xsm:border-[#A3DDFF] xsm:bg-white xsm:shadow-none xsm:transition-all xsm:duration-150',
                                // === Khi checked trên mobile ===
                                'xsm:data-[state=checked]:border-[#38B6FF] xsm:data-[state=checked]:bg-[#38B6FF]',
                                // === Ẩn SVG mặc định và tạo custom tick bằng pseudo ===
                                'xsm:[&_svg]:hidden',

                                'xsm:data-[state=checked]:after:absolute xsm:data-[state=checked]:after:left-1/2 xsm:data-[state=checked]:after:top-[40%] xsm:data-[state=checked]:after:h-[0.7rem] xsm:data-[state=checked]:after:w-[0.4rem] xsm:data-[state=checked]:after:-translate-x-1/2 xsm:data-[state=checked]:after:-translate-y-1/2 xsm:data-[state=checked]:after:rotate-45 xsm:data-[state=checked]:after:border-b-[2px] xsm:data-[state=checked]:after:border-r-[2px] xsm:data-[state=checked]:after:border-white xsm:data-[state=checked]:after:content-[""]',
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
