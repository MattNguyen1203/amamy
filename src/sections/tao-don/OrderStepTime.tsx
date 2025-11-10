'use client'

import useStore from '@/app/(store)/store'
import ICMessageQuestion from '@/components/icon/ICMessageQuestion'
import ICStar from '@/components/icon/ICStar'
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
import {Label} from '@/components/ui/label'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import {IInformationTimeOrder} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import Image from 'next/image'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {FieldErrors, useForm, UseFormReturn} from 'react-hook-form'
import {z} from 'zod'

// Type for form data
type FormData = {
  policy: boolean[]
  userChoices: Record<string, string | undefined>
}

// Memoized component for user choices section
const UserChoicesSection = React.memo(function UserChoicesSection({
  item,
  index,
  form,
  isMobile,
  containerRefs,
}: {
  item: IInformationTimeOrder
  index: number
  form: UseFormReturn<FormData>
  isMobile: boolean
  containerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}) {
  const setContainerRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      containerRefs.current[index] = el
    },
    [containerRefs],
  )

  const noteMoreClassName = useMemo(
    () =>
      cn(
        'custom-prose *:text-[0.875rem] *:font-medium *:leading-[1.3125rem] *:tracking-[-0.02625rem] *:text-[rgba(0,0,0,0.80)] xsm:*:text-[0.8125rem] xsm:*:leading-[1.21875rem] xsm:*:tracking-[-0.02438rem]',
        '[&_ul]:!my-3 [&_ul]:!list-disc [&_li]:mb-2 [&_ul]:!px-[1.4rem] [&_ul]:xsm:!px-[1rem]',
        '[&_ol]:!my-3 [&_ol]:!list-decimal [&_ol]:!px-[1.4rem] [&_ol]:xsm:!px-[1rem]',
        '[&_p]:pt-[0.62rem] first:[&_p]:pt-0 [&_p]:xsm:pt-[0.38rem]',
      ),
    [],
  )

  const stockClassName = useMemo(
    () =>
      cn(
        'custom-prose xsm:-[-0.0225rem] text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.80)] xsm:text-[0.75rem] xsm:leading-[1.05rem] [&_img]:my-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[1rem]',
      ),
    [],
  )

  const checkboxClassName = useMemo(
    () =>
      cn(
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
      ),
    [],
  )

  return (
    <>
      {item?.user_chooses ? (
        <>
          <div className='space-y-[0.75rem] xsm:space-y-[0.5rem]'>
            {item?.stock_user?.map((stockItem, stockIndex) => (
              <FormField
                key={stockIndex}
                control={form.control}
                name={`userChoices.${item?.time_content}`}
                render={({field}) => {
                  const isChecked = field.value === stockItem?.label

                  return (
                    <Label
                      htmlFor={`userChoices.${item?.time_content}-${stockIndex}`}
                      className='block w-full cursor-pointer'
                    >
                      <FormItem
                        className={cn(
                          'relative flex cursor-pointer flex-row items-center space-x-[0.75rem] space-y-0 rounded-[2.25rem] border-[0.075rem] px-[1.25rem] py-[0.88rem] transition-all duration-150 xsm:space-x-[0.5rem] xsm:rounded-[2rem] xsm:py-[0.62rem] xsm:pl-[0.75rem]',
                          isChecked
                            ? 'border-[#38B6FF] bg-[#F1F9FF]'
                            : 'border-transparent bg-[rgba(239,239,239,0.60)]',
                        )}
                      >
                        <FormControl>
                          <Checkbox
                            id={`userChoices.${item?.time_content}-${stockIndex}`}
                            className={checkboxClassName}
                            checked={isChecked}
                            onCheckedChange={() => {
                              if (field.value === stockItem?.label) {
                                field.onChange(undefined)
                              } else {
                                field.onChange(stockItem?.label)
                              }
                            }}
                          />
                        </FormControl>
                        <div className='flex flex-col gap-y-[0.25rem] leading-none'>
                          <div className='flex sm:items-center sm:space-x-[0.5rem] xsm:flex-wrap xsm:gap-[0.19rem]'>
                            {isMobile && stockItem?.tag && (
                              <div className='flex items-center space-x-[0.25rem] rounded-[62.5rem] bg-[#3FC371] p-[0.12rem_0.38rem] sm:hidden'>
                                <ICStar className='size-[0.75rem]' />
                                <p className='font-montserrat text-[0.625rem] font-semibold leading-[0.875rem] tracking-[-0.01875rem] text-white flex-center'>
                                  {stockItem?.tag}
                                </p>
                              </div>
                            )}
                            <FormLabel
                              htmlFor={`userChoices.${item?.time_content}-${stockIndex}`}
                              className='cursor-pointer font-montserrat text-[0.875rem] font-semibold leading-normal tracking-[-0.0175rem] text-[rgba(0,0,0,0.92)] xsm:line-clamp-2 xsm:text-[0.8125rem] xsm:tracking-[-0.01625rem]'
                            >
                              {stockItem?.label}
                            </FormLabel>
                            {!isMobile && stockItem?.tag && (
                              <div className='flex items-center space-x-[0.25rem] rounded-[62.5rem] bg-[#3FC371] p-[0.25rem_0.75rem] xsm:hidden'>
                                <ICStar className='size-[0.875rem]' />
                                <p className='font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-white flex-center'>
                                  {stockItem?.tag}
                                </p>
                              </div>
                            )}
                          </div>
                          {stockItem?.desc && (
                            <FormLabel
                              htmlFor={`userChoices.${item?.time_content}-${stockIndex}`}
                              className='custom-prose xsm:-[-0.0225rem] cursor-pointer text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.80)] xsm:text-[0.75rem] xsm:leading-[1.05rem]'
                              dangerouslySetInnerHTML={{
                                __html: stockItem?.desc,
                              }}
                            ></FormLabel>
                          )}
                        </div>
                      </FormItem>
                    </Label>
                  )
                }}
              />
            ))}
          </div>

          {item?.note_more && (
            <div className='mt-[1rem] flex flex-col items-start xsm:mb-[0.5rem] xsm:mt-[1.5rem] xsm:p-0'>
              {/* icon */}
              <div className='mb-[0.63rem] flex items-center space-x-[0.38rem] sm:space-x-[0.69rem] xsm:mb-[0.5rem]'>
                {/* <ICMessageQuestion className='size-[1.5rem] shrink-0' /> */}
                <Image src='/icon/question.svg' alt='icon' width={24} height={24}  className='size-[1.5rem] shrink-0'/>

                <p className='text-[1rem] font-bold leading-[1.5rem] tracking-[-0.03rem] text-[#33A6E8] xsm:text-[0.875rem] xsm:leading-[1.3125rem] xsm:tracking-[-0.02625rem]'>
                  LƯU Ý
                </p>
              </div>

              <div
                className={noteMoreClassName}
                dangerouslySetInnerHTML={{
                  __html: item?.note_more,
                }}
              ></div>
            </div>
          )}
        </>
      ) : (
        <div
          ref={setContainerRef(index)}
          className={stockClassName}
          dangerouslySetInnerHTML={{
            __html: item?.stock || '',
          }}
        ></div>
      )}
    </>
  )
})

const OrderStepTime = React.memo(function OrderStepTime({
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
  const isMobile = useIsMobile()
  // Create dynamic FormSchema based on dataInformation
  const FormSchema = useMemo(
    () =>
      z.object({
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
      }),
    [dataInformation],
  )
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)

  const formDefaultValues = useMemo(
    () => ({
      policy: Array.isArray(dataInformation)
        ? dataInformation?.map(() => (stepOrder > 2 ? true : false))
        : [],
      userChoices: dataFromOrder?.userChoices || {},
    }),
    [dataInformation, stepOrder, dataFromOrder?.userChoices],
  )

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: formDefaultValues,
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
  }, [dataInformation, stepOrder, setStepOrder, handleClickcurrentTab])
  const scrollToTop = useCallback(
    () => window.scrollTo({top: 0, behavior: 'smooth'}),
    [],
  )
  useEffect(() => {
    if (triggerScroll) {
      scrollToTop()
      setTriggerScroll(false)
    }
  }, [triggerScroll, scrollToTop])

  // Scroll to top when component mounts (when entering this step)
  useEffect(() => {
    scrollToTop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onSubmit = useCallback(
    (data: z.infer<typeof FormSchema>) => {
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
    },
    [
      stepOrder,
      nextStep,
      setStepOrder,
      setIndexTab,
      indexTab,
      setDataFromOrder,
      dataFromOrder,
      handleClickcurrentTab,
    ],
  )

  const onError = (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
    const firstErrorField = Object.keys(errors)[0]
    if (!firstErrorField) {
      return
    }

    const el = document.querySelector(`[name="${firstErrorField}"]`)
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'center'})
      ;(el as HTMLElement).focus({preventScroll: true})
    }
  }

  const handleBackClick = useCallback(() => {
    handleClickcurrentTab('1')
    setIndexTab(indexTab - 1)
    // setDataInformation(undefined)
    // setDataFromOrder({...dataFromOrder})
  }, [handleClickcurrentTab, setIndexTab, indexTab])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className='space-y-[1.75rem] xsm:space-y-[1.25rem]'
      >
        {Array.isArray(dataInformation) &&
          dataInformation?.map((item: IInformationTimeOrder, index: number) => (
            <Fragment key={index}>
              <div className='rounded-[2.25rem] bg-white p-[1.5rem] shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)] xsm:rounded-[2rem] xsm:p-[1rem]'>
                <div className='mb-[1rem]'>
                  <h3 className='font-montserrat text-[1rem] font-semibold leading-[1.625rem] tracking-[-0.03rem] text-[rgba(0,0,0,0.92)] xsm:text-[0.875rem] xsm:leading-[1.225rem] xsm:tracking-[-0.035rem]'>
                    {item?.time_content}
                  </h3>
                </div>

                <UserChoicesSection
                  item={item}
                  index={index}
                  form={form}
                  isMobile={isMobile}
                  containerRefs={containerRefs}
                />

                <FormField
                  control={form.control}
                  name={`policy.${index}`}
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
                          {item?.clause ||
                            'Tôi đồng ý với điều khoản của Amamy'}
                        </FormLabel>
                      </div>
                      <FormMessage className='absolute bottom-[-80%] left-0 pl-[0.75rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                    </FormItem>
                  )}
                />
              </div>
            </Fragment>
          ))}

        <div className='mt-[1.5rem] flex w-full items-center justify-between space-x-[1.25rem] xsm:fixed xsm:bottom-0 xsm:left-0 xsm:right-0 xsm:z-[49] xsm:mt-0 xsm:space-x-[0.5rem] xsm:bg-[#FAFAFA] xsm:p-[1rem] disabled:xsm:opacity-[1]'>
          <div
            onClick={handleBackClick}
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
})

export default OrderStepTime
