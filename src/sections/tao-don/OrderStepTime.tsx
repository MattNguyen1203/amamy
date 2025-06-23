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
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import {IInformationTimeOrder} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import {Fragment, useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
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
    <div className='space-y-[1.5rem] xsm:space-y-[0.75rem]'>
      <p className='sm:hidden text-pc-sub16b text-[#33A6E8]'>
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
                  <div className='p-[1rem] rounded-[1.25rem] bg-white'>
                    <p className='xsm:text-pc-sub14s mb-[0.75rem] xsm:!font-bold text-black font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
                      {item?.time_content}
                    </p>
                    {item?.user_chooses ? (
                      <div className='space-y-[0.875rem] mb-[0.875rem]'>
                        {item?.stock_user?.map((stockItem, stockIndex) => (
                          <FormField
                            key={stockIndex}
                            control={form.control}
                            name={`userChoices.${item?.time_content}`}
                            render={({field}) => (
                              <FormItem className='xsm:pt-[0.5rem] xsm:border-t-[1px] xsm:border-solid xsm:border-[#DCDFE4] xsm:first:border-t-0 xsm:first:pt-0 relative flex flex-row items-center space-y-0 space-x-[0.5rem] border-none mb-[0.5rem]'>
                                <FormControl>
                                  <Checkbox
                                    className='[&_svg]:!hidden size-[1.25rem] rounded-[100%] border-[1.66667px] border-solid border-[#000000] data-[state=checked]:!border-[#38B6FF] !bg-white flex-center [&>span]:data-[state=checked]:!bg-[#38B6FF] [&>span]:bg-transparent [&>span]:size-[0.75rem] [&>span]:rounded-[100%]'
                                    checked={field.value === stockItem?.label}
                                    onCheckedChange={(checked) => {
                                      field.onChange(
                                        checked ? stockItem?.label : undefined,
                                      )
                                    }}
                                  />
                                </FormControl>
                                <div className='leading-none space-y-[0rem] flex flex-col'>
                                  <div className='flex xsm:flex-wrap sm:items-center xsm:gap-[0.5rem] sm:space-x-[0.3875rem]'>
                                    <FormLabel className='text-pc-sub14s !font-semibold xsm:text-mb-13S xsm:!font-semibold xsm:line-clamp-2 text-black/[0.92] cursor-pointer'>
                                      {stockItem?.label}
                                    </FormLabel>
                                    {stockItem?.tag && (
                                      <p className='xsm:w-max p-[0.25rem_0.75rem] flex-center rounded-[62.5rem] bg-[#5DAF46] text-pc-sub14m xsm:text-[0.625rem] xsm:font-semibold xsm:leading-[1.4] xsm:tracking-[-0.01875rem] text-white'>
                                        {stockItem?.tag}
                                      </p>
                                    )}
                                  </div>
                                  {stockItem?.desc && (
                                    <FormLabel className='pt-[0.5rem] text-pc-sub14m text-[rgba(0,0,0,0.80)] cursor-pointer'>
                                      <p
                                        className='text-pc-sub14m text-[rgba(0,0,0,0.80)]'
                                        dangerouslySetInnerHTML={{
                                          __html: stockItem?.desc,
                                        }}
                                      ></p>
                                    </FormLabel>
                                  )}
                                </div>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    ) : (
                      <div
                        ref={(el) => {
                          containerRefs.current[index] = el
                        }}
                        className='[&_img]:my-2 [&_img]:w-full [&_img]:h-auto [&_img]:rounded-[1rem] [&_a]:text-[#0084FF] mb-[1rem] [&_h3]:text-pc-tab-title [&_strong]:text-pc-sub14s *:text-black/[0.92] *:text-pc-14 *:font-medium *:xsm:text-mb-13 [&>p>span]:font-medium [&_ul]:content-ul [&_ol]:content-ol [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 marker:[&_ul_li]:text-[0.65rem] xsm:marker:[&_ul_li]:text-[0.5rem] [&_em]:not-italic [&_em]:text-[0.75rem] [&_em]:font-semibold [&_em]:tracking-[-0.015rem] [&_em]:text-[#8F8F8F]'
                        dangerouslySetInnerHTML={{
                          __html: item?.stock || '',
                        }}
                      ></div>
                    )}
                    <FormField
                      control={form.control}
                      name={`policy.${index}`}
                      render={({field}) => (
                        <FormItem className='relative flex flex-row items-center space-y-0 space-x-[0.5rem] border-none'>
                          <FormControl>
                            <Checkbox
                              className='[&_.svg-none-check]:aria-[checked=false]:block size-[1.875rem] xsm:size-[1.5rem] [&_svg]:size-[1rem] [&>span>svg]:size-[1.25rem] flex-center border-none data-[state=checked]:bg-[#FFEC1F] bg-[#FFEC1F] data-[state=checked]:text-[#000000] text-[#000000]'
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className='space-y-1 leading-none'>
                            <FormLabel className='text-pc-sub14s !font-semibold xsm:text-mb-13M xsm:!font-semibold xsm:line-clamp-2 text-black/[0.92] cursor-pointer'>
                              {item?.clause ||
                                'Tôi đồng ý với điều khoản của Amamy'}
                            </FormLabel>
                          </div>
                          <FormMessage className='pl-[0.75rem] !text-[#F00] text-pc-sub12m absolute bottom-[-80%] left-0' />
                        </FormItem>
                      )}
                    />
                  </div>
                </Fragment>
              ),
            )}
          <div className='space-x-[2rem] xsm:space-x-[0.5rem] xsm:fixed xsm:bottom-0 xsm:z-[49] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0 xsm:p-[1rem] xsm:bg-[#FAFAFA] flex items-center justify-between sm:w-full'>
            <div
              onClick={() => {
                handleClickcurrentTab('1')
                setIndexTab(indexTab - 1)
                // setDataInformation(undefined)
                // setDataFromOrder({...dataFromOrder})
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
