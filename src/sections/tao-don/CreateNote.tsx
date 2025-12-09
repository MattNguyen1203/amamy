'use client'

import useStore from '@/app/(store)/store'
import ICStar from '@/components/icon/ICStar'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import useIsMobile from '@/hooks/useIsMobile'
import { cn } from '@/lib/utils'
import { IInformationNoteOrder } from '@/sections/tao-don/oder.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { FieldErrors, useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { IOptionFieldNotePopupJapan } from '@/sections/tao-don/CreateOrder'

// Type for form data
type FormData = {
  note: boolean[]
  noteOptions: Record<string, string | undefined>
  noteOptionsAgreement: Record<string, boolean>
}

// Memoized component for note options section
const NoteOptionsSection = React.memo(function NoteOptionsSection({
  item,
  index,
  form,
  isMobile,
}: {
  item: IInformationNoteOrder
  index: number
  form: UseFormReturn<FormData>
  isMobile: boolean
}) {
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

  const agreementCheckboxClassName = useMemo(
    () =>
      cn(
        'relative aspect-square size-[1.25rem] rounded-[0.375rem] border-[0.094rem] border-[#A3DDFF] bg-white shadow-none transition-all duration-150 sm:size-[1.5rem] sm:rounded-[0.5rem]',
        'data-[state=checked]:border-[#38B6FF] data-[state=checked]:bg-[#38B6FF]',
      ),
    [],
  )

  return (
    <>
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
                    {noteOpt.list_note_options.map((opt, optIndex) => {
                      const fieldId = `noteOption-${index}-${noteIdx}-${optIndex}`

                      return (
                        <FormField
                          key={`${index}-${noteIdx}-${optIndex}`}
                          control={form.control}
                          name={radioFieldName as `noteOptions.${string}`}
                          render={({ field }) => {
                            const isChecked = field.value === opt?.label

                            return (
                              <Label
                                htmlFor={fieldId}
                                className='block w-full cursor-pointer'
                              >
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
                                      id={fieldId}
                                      className={checkboxClassName}
                                      checked={isChecked}
                                      onCheckedChange={(checked) => {
                                        field.onChange(
                                          checked ? opt?.label : undefined,
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
                                      <FormLabel
                                        htmlFor={fieldId}
                                        className='cursor-pointer font-montserrat text-[0.875rem] font-semibold leading-normal tracking-[-0.0175rem] text-[rgba(0,0,0,0.92)] xsm:line-clamp-2 xsm:text-[0.8125rem] xsm:tracking-[-0.01625rem]'
                                      >
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
                                        htmlFor={fieldId}
                                        className='custom-prose cursor-pointer text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.80)] xsm:text-[0.8125rem] xsm:leading-[1.21875rem] xsm:tracking-[-0.02438rem]'
                                        dangerouslySetInnerHTML={{
                                          __html: opt?.description,
                                        }}
                                      ></FormLabel>
                                    )}
                                  </div>
                                </FormItem>
                              </Label>
                            )
                          }}
                        />
                      )
                    })}
                  </div>

                  {noteOpt?.note_more && (
                    <div className='mt-[1rem] flex flex-col items-start xsm:mb-[0.5rem] xsm:mt-[1.5rem] xsm:p-0'>
                      {/* icon */}
                      <div className='mb-[0.63rem] flex items-center space-x-[0.38rem] sm:space-x-[0.69rem] xsm:mb-[0.5rem]'>
                        {/* <ICMessageQuestion className='size-[1.5rem] shrink-0' /> */}
                        <Image
                          src='/icon/question.svg'
                          alt='icon'
                          width={24}
                          height={24}
                          className='size-[1.5rem] shrink-0'
                        />
                        <span className='text-[1rem] font-bold leading-[1.5rem] tracking-[-0.03rem] text-[#33A6E8] xsm:text-[0.875rem] xsm:leading-[1.3125rem] xsm:tracking-[-0.02625rem]'>
                          LƯU Ý
                        </span>
                      </div>

                      <div
                        className={noteMoreClassName}
                        dangerouslySetInnerHTML={{
                          __html: noteOpt.note_more,
                        }}
                      ></div>
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name={checkboxFieldName as `noteOptionsAgreement.${string}`}
                    render={({ field }) => (
                      <FormItem className='relative mt-[1.25rem] flex flex-row items-center space-x-[0.5rem] space-y-0 border-none xsm:mt-[1rem]'>
                        <FormControl>
                          <Checkbox
                            className={agreementCheckboxClassName}
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
    </>
  )
})

// Memoized component for image item
const ImageItem = React.memo(function ImageItem({
  img,
  index,
  setContainerRef,
  imgClassName,
}: {
  img: string
  index: number
  setContainerRef: (_index: number) => (_el: HTMLDivElement | null) => void
  imgClassName: string
}) {
  const roundedImg = useMemo(
    () => img.replace(/<img(.*?)>/, '<img$1 style="border-radius:1rem;">'),
    [img],
  )

  return (
    <div
      ref={setContainerRef(index)}
      className={imgClassName}
      dangerouslySetInnerHTML={{ __html: roundedImg }}
    />
  )
})

// Memoized component for note content section
const NoteContentSection = React.memo(function NoteContentSection({
  item,
  index,
  form,
  containerRefs,
  imgs,
  content,
}: {
  item: IInformationNoteOrder
  index: number
  form: UseFormReturn<FormData>
  containerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  imgs: string[]
  content: string
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
        '*:text-[0.875rem] *:font-medium *:leading-[1.3125rem] *:tracking-[-0.02625rem] *:text-[rgba(0,0,0,0.80)] xsm:*:text-[0.8125rem] xsm:*:leading-[1.21875rem] xsm:*:tracking-[-0.02438rem]',
        '[&_ul]:!my-3 [&_ul]:!list-disc [&_li]:mb-2 [&_ul]:!px-[1.4rem] [&_ul]:xsm:!px-[1rem]',
        '[&_ol]:!my-3 [&_ol]:!list-decimal [&_ol]:!px-[1.4rem] [&_ol]:xsm:!px-[1rem]',
        '[&_p]:pt-[0.62rem] first:[&_p]:pt-0 [&_p]:xsm:pt-[0.38rem]',
      ),
    [],
  )

  const agreementCheckboxClassName = useMemo(
    () =>
      cn(
        'relative aspect-square size-[1.25rem] rounded-[0.375rem] border-[0.094rem] border-[#A3DDFF] bg-white shadow-none transition-all duration-150 sm:size-[1.5rem] sm:rounded-[0.5rem]',
        'data-[state=checked]:border-[#38B6FF] data-[state=checked]:bg-[#38B6FF]',
      ),
    [],
  )

  const imgClassName = useMemo(
    () =>
      cn('[&_img]:my-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[1rem]'),
    [],
  )

  return (
    <div className='rounded-[2.25rem] bg-white p-[1.5rem] shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)] xsm:space-y-[1.25rem] xsm:rounded-[2rem] xsm:p-[1rem]'>
      <div>
        <div className='mb-[1rem]'>
          <h3 className='font-montserrat text-[1rem] font-semibold leading-[1.625rem] tracking-[-0.03rem] text-[rgba(0,0,0,0.92)] xsm:text-[0.875rem] xsm:leading-[1.225rem] xsm:tracking-[-0.035rem]'>
            {item?.title}
          </h3>
        </div>

        {imgs.length > 0 && (
          <>
            {imgs.map((img, i) => (
              <ImageItem
                key={i}
                img={img}
                index={index}
                setContainerRef={setContainerRef}
                imgClassName={imgClassName}
              />
            ))}
          </>
        )}

        <div className='mt-[1rem] flex flex-col items-start xsm:mb-[0.5rem] xsm:mt-[1.5rem] xsm:p-0'>
          {/* icon */}
          <div className='flex items-center space-x-[0.38rem] sm:space-x-[0.69rem]'>
            {/* <ICMessageQuestion className='size-[1.5rem] shrink-0' /> */}
            <Image
              src='/icon/question.svg'
              alt='icon'
              width={24}
              height={24}
              className='size-[1.5rem] shrink-0'
            />
            <p className='text-[1rem] font-bold leading-[1.5rem] tracking-[-0.03rem] text-[#33A6E8] xsm:text-[0.875rem] xsm:leading-[1.3125rem] xsm:tracking-[-0.02625rem]'>
              LƯU Ý
            </p>
          </div>

          <div
            className={noteMoreClassName}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>

          <FormField
            control={form.control}
            name={`note.${index}`}
            render={({ field }) => (
              <FormItem className='relative mt-[1.25rem] flex flex-row items-center space-x-[0.5rem] space-y-0 border-none xsm:mt-[1rem]'>
                <FormControl>
                  <Checkbox
                    className={agreementCheckboxClassName}
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
  )
})

interface IDataFromOrder {
  [key: string]: string | number | boolean | object | undefined
}

export default function CeateNote({
  data,
  handleClickcurrentTab,
  prevStep,
  setIndexTab,
  indexTab,
  setSelectedImage,
  setDataFromOrder,
  dataNotePopupJapan,
  type,
}: {
  data?: IInformationNoteOrder[]
  handleClickcurrentTab: (_nextTab: string) => void
  prevStep: string
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  type?: string
  importantNote?: string
  dataNotePopupJapan?: IOptionFieldNotePopupJapan
}) {
  const isMobile = useIsMobile()

  const FormSchema = z.object({
    note: z.array(
      z.boolean().refine((value) => value === true, {
        message: 'Vui lòng đồng ý với điều khoản của chúng tôi.',
      }),
    ),
    noteOptions: z.record(z.string(), z.string().optional()).refine(
      (choices) => {
        console.log('🔍 noteOptions validation - choices:', choices)
        console.log('🔍 noteOptions validation - data:', data)

        if (!Array.isArray(data)) return true

        const itemsWithNoteOptions = data.filter(
          (item) =>
            Array.isArray(item?.note_options) && item?.note_options?.length > 0,
        )
        console.log('🔍 itemsWithNoteOptions:', itemsWithNoteOptions)

        const requiredKeys = itemsWithNoteOptions
          .map((item) => {
            // Find the actual index in the original data array
            const actualIndex = data.findIndex(d => d === item)
            return item.note_options?.map((_, noteIdx) => `${actualIndex}-${noteIdx}`)
          })
          .flat()
          .filter(Boolean)

        console.log('🔍 requiredKeys for noteOptions:', requiredKeys)

        const result = requiredKeys.every((key) => {
          if (!key) {
            return true
          }
          const isValid = choices[key] && choices[key] !== ''
          console.log(`🔍 key "${key}": ${choices[key]} -> ${isValid}`)
          return isValid
        })

        console.log('🔍 noteOptions validation result:', result)
        return result
      },
      {
        message: 'Vui lòng chọn đầy đủ các tùy chọn bắt buộc.',
      },
    ),
    // Dynamic fields for note_options agreements (checkboxes)
    noteOptionsAgreement: z.record(z.string(), z.boolean()).refine(
      (agreements) => {
        console.log('🔍 noteOptionsAgreement validation - agreements:', agreements)
        console.log('🔍 noteOptionsAgreement validation - data:', data)

        if (!Array.isArray(data)) return true

        const itemsWithNoteOptions = data.filter(
          (item) =>
            Array.isArray(item.note_options) && item.note_options.length > 0,
        )
        console.log('🔍 itemsWithNoteOptions for agreement:', itemsWithNoteOptions)

        const requiredKeys = itemsWithNoteOptions
          .map((item) => {
            // Find the actual index in the original data array
            const actualIndex = data.findIndex(d => d === item)
            return item.note_options?.map((_, noteIdx) => `${actualIndex}-${noteIdx}`)
          })
          .flat()
          .filter(Boolean)

        console.log('🔍 requiredKeys for noteOptionsAgreement:', requiredKeys)

        const result = requiredKeys.every((key) => {
          if (!key) {
            return true
          }
          const isValid = agreements[key] === true
          console.log(`🔍 agreement key "${key}": ${agreements[key]} -> ${isValid}`)
          return isValid
        })

        console.log('🔍 noteOptionsAgreement validation result:', result)
        return result
      },
      {
        message: 'Vui lòng đồng ý với tất cả điều khoản.',
      },
    ),
  })
  const { stepOrder, setStepOrder } = useStore((state) => state)
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const [showWarningDialog, setShowWarningDialog] = useState<boolean>(false)
  const [pendingSubmitData, setPendingSubmitData] = useState<z.infer<typeof FormSchema> | null>(null)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      note: Array.isArray(data)
        ? data?.map(() => false) // Always start with false, let user check manually
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
  }, [data, stepOrder, setStepOrder, handleClickcurrentTab])

  // Debug form state
  const formValues = form.watch()
  useEffect(() => {
    console.log('🚀 ~ form.formState:', {
      isValid: form.formState.isValid,
      errors: form.formState.errors,
      values: form.getValues(),
    })
  }, [form.formState.isValid, form.formState.errors, formValues, form])
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  useEffect(() => {
    if (triggerScroll) {
      scrollToTop()
      setTriggerScroll(false)
    }
  }, [triggerScroll])

  // Scroll to top when component mounts (when entering this step)
  useEffect(() => {
    scrollToTop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log('🚀 ~ onSubmit values:', values)
    console.log('🚀 ~ form.formState.isValid:', form.formState.isValid)
    console.log('🚀 ~ form.formState.errors:', form.formState.errors)
    if (values) {
      // Only show popup for Japan -> Vietnam direction (nhatviet)
      if (type === 'nhatviet' && dataNotePopupJapan) {
        // Store submit data and show warning dialog
        setPendingSubmitData(values)
        setShowWarningDialog(true)
      } else {
        // For other directions, proceed directly without popup
        handleConfirmAfterWarningDirectly(values)
      }
    }
  }

  // Handle confirmation after user acknowledges warning
  const handleConfirmAfterWarning = () => {
    if (!pendingSubmitData) return
    handleConfirmAfterWarningDirectly(pendingSubmitData)

    // Close dialog and reset pending data
    setShowWarningDialog(false)
    setPendingSubmitData(null)
  }

  // Direct confirmation without popup (for non-nhatviet directions)
  const handleConfirmAfterWarningDirectly = (values: z.infer<typeof FormSchema>) => {
    // Merge noteOptions to dataFromOrder instead of override
    setDataFromOrder((prev: IDataFromOrder) => {
      const mergedData = {
        ...prev,
        noteOptions: {
          ...((prev.noteOptions as Record<string, string | undefined>) || {}),
          ...values.noteOptions,
        },
        noteOptionsAgreement: {
          ...((prev.noteOptionsAgreement as Record<string, boolean>) || {}),
          ...values.noteOptionsAgreement,
        },
      }

      return mergedData
    })

    if (stepOrder < 4) {
      setStepOrder(4)
    }
    setIndexTab(indexTab + 1)
    form.reset()
    handleClickcurrentTab('4')
    setTriggerScroll(true)
  }

  const onError = (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
    console.log('🚀 ~ onError errors:', errors)
    const firstErrorField = Object.keys(errors)[0]
    if (!firstErrorField) {
      return
    }

    const el = document.querySelector(`[name="${firstErrorField}"]`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        ; (el as HTMLElement).focus({ preventScroll: true })
    }
  }

  return (
    <>
      <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <DialogContent className='custom_scrollbar max-w-[50.5rem] max-h-[90vh] overflow-y-auto rounded-[2rem] border-0 bg-white p-[2rem] shadow-[0_2px_10px_rgba(0,0,0,0.1)] xsm:max-w-[90%] xsm:rounded-[1.5rem] xsm:p-[1.25rem]'>
          <DialogHeader>
            <DialogTitle className='mb-[1rem] font-montserrat text-center text-[1.25rem] font-bold leading-[1.75rem] tracking-[-0.0375rem] text-[rgba(0,0,0,0.92)] xsm:text-[1rem] xsm:leading-[1.5rem] xsm:tracking-[-0.03rem]'>
              {dataNotePopupJapan?.title}
            </DialogTitle>
            <DialogDescription asChild>
              <div className='space-y-[1rem] text-left xsm:space-y-[0.75rem]' >
                <div className='[&_p]:text-[0.875rem] [&_*]:font-medium [&_*]:leading-[1.3125rem] [&_*]:tracking-[-0.02625rem] [&_*]:text-[rgba(0,0,0,0.92)] xsm:[&_p]:text-[0.8125rem] xsm:[&_p]:leading-[1.21875rem] xsm:[&_p]:tracking-[-0.02438rem] [&_ul]:list-disc [&_ul]:space-y-[0.5rem] [&_ul]:pl-[1.4rem] xsm:[&_ul]:pl-[1rem]' dangerouslySetInnerHTML={{ __html: dataNotePopupJapan?.description || '' }}>

                </div>
                {dataNotePopupJapan?.text_note &&
                  <div className='rounded-[1rem] !shadow-none border border-[#FFE4B3] bg-[#FFF4E6] p-[1rem]'>
                    <p className='text-[0.875rem] font-semibold leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] xsm:text-[0.8125rem] xsm:leading-[1.21875rem] xsm:tracking-[-0.02438rem]'>
                      {dataNotePopupJapan?.text_note}
                    </p>
                  </div>
                }
                <Image
                  src={dataNotePopupJapan?.image || ''}
                  alt='Hướng dẫn ghi mã 818HN'
                  width={500}
                  height={300}
                  className='h-auto w-full rounded-[1.5rem]'
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className='mt-[1.5rem] flex space-x-[1.25rem] xsm:flex-col xsm:space-x-0 xsm:space-y-[0.75rem]'>
            <Button
              type='button'
              onClick={() => {
                setShowWarningDialog(false)
                setPendingSubmitData(null)
              }}
              className='flex-1 rounded-[1.25rem] !shadow-none bg-[#D9F1FF] p-[0.75rem_1.5rem] text-black hover:bg-[#D9F1FF] hover:opacity-80'
            >
              <p className='text-pc-sub16m'>Đóng</p>
            </Button>
            <Button
              type='button'
              onClick={handleConfirmAfterWarning}
              className='flex-1 rounded-[1.25rem] !shadow-none bg-[#38B6FF] p-[0.75rem_1.5rem] text-white hover:bg-[#38B6FF] hover:opacity-90'
            >
              <p className='text-pc-sub16m'>Đã hiểu</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
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
                  <NoteContentSection
                    item={item}
                    index={index}
                    form={form}
                    containerRefs={containerRefs}
                    imgs={imgs}
                    content={content}
                  />

                  <NoteOptionsSection
                    item={item}
                    index={index}
                    form={form}
                    isMobile={isMobile}
                  />
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
    </>
  )
}
