'use client'

import {useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import useStore from '@/app/(store)/store'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import {
  IInformationInsurance,
  IInformationInsurance_CargoInsuranceJapanvn,
  IInformationInsurance_policy,
} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import ImageV2 from '@/components/image/ImageV2'
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
import ICStar from '@/components/icon/ICStar'
import useIsMobile from '@/hooks/useIsMobile'

export default function Insurance({
  data,
  handleClickcurrentTab,
  setIndexTab,
  indexTab,
  setSelectedImage,
  dataFromOrder,
  setDataFromOrder,
  type,
}: {
  data?: IInformationInsurance
  handleClickcurrentTab: (nextTab: string) => void
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
  dataFromOrder: IDataFromOrder
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  type: string
}) {
  const isMobile = useIsMobile()
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const FormSchema = z.object({
    order: z
      .array(
        z.boolean().refine((value) => value === true, {
          message: 'Vui lòng đồng ý với điều khoản của chúng tôi.',
        }),
      )
      .refine((values) => values.some((value) => value === true), {
        message: 'Vui lòng đồng ý với ít nhất một điều khoản.',
      }),
    typeofinsurance: data?.user_chooses
      ? z.string().min(1, 'Vui lòng chọn loại bảo hiểm').optional()
      : z.string().optional(),
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      order: data?.user_chooses
        ? stepOrder > 5
          ? [true]
          : [false]
        : Array.isArray(data?.compensation?.policy)
          ? data?.compensation?.policy?.map(() =>
              stepOrder > 5 ? true : false,
            )
          : Array.isArray(data?.cargo_insurance_japanvn)
            ? data?.cargo_insurance_japanvn?.map(() =>
                stepOrder > 5 ? true : false,
              )
            : [false],
      typeofinsurance: dataFromOrder?.typeofinsurance || '',
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
  const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'})
  useEffect(() => {
    if (triggerScroll) {
      scrollToTop()
      setTriggerScroll(false)
    }
  }, [triggerScroll])
  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (values) {
      if (stepOrder < 6) {
        setStepOrder(6)
      }
      handleClickcurrentTab('6')
      setTriggerScroll(true)
      setIndexTab(indexTab + 1)
      setDataFromOrder({
        ...dataFromOrder,
        typeofinsurance: values?.typeofinsurance,
      })
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {data?.compensation && (
          <>
            {!data?.user_chooses &&
              Array.isArray(data?.compensation?.policy) &&
              data?.compensation?.policy?.map(
                (item: IInformationInsurance_policy, index: number) => (
                  <div
                    key={index}
                    className='space-y-[1.2rem] rounded-[1.25rem] bg-white p-[1rem]'
                  >
                    <div
                      ref={(el) => {
                        containerRefs.current[index] = el
                      }}
                      className={cn(
                        '*:text-[0.875rem] *:font-medium *:leading-[1.3125rem] *:tracking-[-0.02625rem] *:text-[rgba(0,0,0,0.80)] xsm:*:text-[0.8125rem] xsm:*:leading-[1.21875rem] xsm:*:tracking-[-0.02438rem]',
                        '[&_ul]:!my-3 [&_ul]:!list-disc [&_ul]:!pl-[1.35rem] [&_ul]:xsm:!pl-3',
                        '[&_ol]:!my-3 [&_ol]:!list-decimal [&_ol]:!pl-[1.35rem] [&_ol]:xsm:!pl-3',
                        '[&_p]:pt-[0.62rem] first:[&_p]:pt-0 [&_p]:xsm:pt-[0.38rem]',
                      )}
                      dangerouslySetInnerHTML={{
                        __html: item?.content || '',
                      }}
                    ></div>

                    <FormField
                      control={form.control}
                      name={`order.${index}`}
                      render={({field}) => (
                        <FormItem className='relative flex flex-row items-center space-x-[0.5rem] space-y-0 border-none'>
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
                                'Tôi đã đọc và đồng ý với chính sách về kiện hàng'}
                            </FormLabel>
                          </div>
                          <FormMessage className='absolute bottom-[-80%] left-0 pl-[0.75rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                        </FormItem>
                      )}
                    />
                  </div>
                ),
              )}

            {data?.user_chooses && (
              <>
                {/* title */}
                {!isMobile && (
                  <>
                    <p
                      className={cn(
                        'mb-[0.38rem] font-montserrat text-[1rem] font-semibold leading-[1.625rem] tracking-[-0.03rem] text-[rgba(0,0,0,0.92)]',
                        data?.user_chooses,
                      )}
                    >
                      {data?.compensation?.title}
                    </p>
                    <div
                      className='text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.80)] xsm:text-[0.8125rem] xsm:leading-[1.21875rem] xsm:tracking-[-0.02438rem]'
                      dangerouslySetInnerHTML={{
                        __html: data?.compensation?.desc,
                      }}
                    ></div>
                  </>
                )}

                <div className='mt-[1rem] flex flex-col items-start rounded-[2.5rem] bg-white p-[1.5rem] shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)] xsm:mb-[0.5rem] xsm:mt-0 xsm:p-[1rem]'>
                  {/* title */}
                  {isMobile && (
                    <div className='xsm:mb-[1rem]'>
                      <h3
                        className={cn(
                          'mb-[0.37rem] font-montserrat text-[1rem] font-semibold leading-[1.625rem] tracking-[-0.03rem] text-[rgba(0,0,0,0.92)] xsm:text-[0.875rem] xsm:leading-[1.225rem] xsm:tracking-[-0.035rem]',
                          data?.user_chooses,
                        )}
                      >
                        {data?.compensation?.title}
                      </h3>

                      <div
                        className='text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.80)] xsm:text-[0.8125rem] xsm:leading-[1.21875rem] xsm:tracking-[-0.02438rem]'
                        dangerouslySetInnerHTML={{
                          __html: data?.compensation?.desc,
                        }}
                      ></div>
                    </div>
                  )}

                  {!isMobile && (
                    <div className='mb-[1rem]'>
                      <h4 className='font-montserrat text-[1rem] font-semibold leading-[1.625rem] tracking-[-0.03rem] text-[rgba(0,0,0,0.92)] xsm:text-[0.875rem] xsm:leading-[1.225rem] xsm:tracking-[-0.035rem]'>
                        Chọn bảo hiểm
                      </h4>
                    </div>
                  )}

                  <div className='flex w-full flex-1 flex-col space-y-[0.75rem] xsm:space-y-[0.5rem]'>
                    {Array.isArray(
                      data?.insurance_types?.list_insurance_types,
                    ) &&
                      data?.insurance_types?.list_insurance_types?.map(
                        (insuranceItem, insuranceIndex) => (
                          <FormField
                            key={insuranceIndex}
                            control={form.control}
                            name={`typeofinsurance`}
                            render={({field}) => {
                              const isChecked =
                                field.value === insuranceItem?.label

                              return (
                                <FormItem
                                  className={cn(
                                    'relative flex flex-row items-center space-x-[0.75rem] space-y-0 rounded-[2.25rem] border-[0.075rem] px-[1.25rem] py-[0.88rem] transition-all duration-150 xsm:space-x-[0.5rem] xsm:rounded-[2rem] xsm:px-[0.75rem] xsm:py-[0.62rem]',
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
                                      checked={
                                        field.value === insuranceItem?.label
                                      }
                                      onCheckedChange={(checked) => {
                                        field.onChange(
                                          checked ? insuranceItem?.label : '',
                                        )
                                      }}
                                    />
                                  </FormControl>
                                  <div className='flex flex-col gap-y-[0.25rem] leading-none'>
                                    <div className='flex sm:items-center sm:space-x-[0.5rem] xsm:flex-wrap xsm:gap-[0.19rem]'>
                                      {isMobile && insuranceItem?.tag && (
                                        <div className='flex items-center space-x-[0.25rem] rounded-[62.5rem] bg-[#3FC371] p-[0.12rem_0.38rem] sm:hidden'>
                                          <ICStar className='size-[0.75rem]' />
                                          <p className='font-montserrat text-[0.625rem] font-semibold leading-[0.875rem] tracking-[-0.01875rem] text-white flex-center'>
                                            {insuranceItem?.tag}
                                          </p>
                                        </div>
                                      )}
                                      <FormLabel className='cursor-pointer font-montserrat text-[0.875rem] font-semibold leading-normal tracking-[-0.0175rem] text-[rgba(0,0,0,0.92)] xsm:line-clamp-2 xsm:text-[0.8125rem] xsm:tracking-[-0.01625rem]'>
                                        {insuranceItem?.label}
                                      </FormLabel>
                                      {!isMobile && insuranceItem?.tag && (
                                        <div className='flex items-center space-x-[0.25rem] rounded-[62.5rem] bg-[#3FC371] p-[0.25rem_0.75rem] xsm:hidden'>
                                          <ICStar className='size-[0.875rem]' />
                                          <p className='font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-white flex-center'>
                                            {insuranceItem?.tag}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                    {insuranceItem?.desc && (
                                      <FormLabel
                                        className='cursor-pointer text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.80)] xsm:text-[0.8125rem] xsm:leading-[1.21875rem] xsm:tracking-[-0.02438rem]'
                                        dangerouslySetInnerHTML={{
                                          __html: insuranceItem?.desc,
                                        }}
                                      ></FormLabel>
                                    )}
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                        ),
                      )}
                  </div>

                  <FormField
                    control={form.control}
                    name={`order.0`}
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
                            {data?.insurance_types?.clause ||
                              'Tôi đã đọc và đồng ý với chính sách về kiện hàng'}
                          </FormLabel>
                        </div>
                        <FormMessage className='absolute bottom-[-80%] left-0 pl-[0.75rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
          </>
        )}

        {(!data?.user_chooses || type === 'ducvn') &&
          Array.isArray(data?.cargo_insurance_japanvn) &&
          data?.cargo_insurance_japanvn?.map(
            (
              item: IInformationInsurance_CargoInsuranceJapanvn,
              index: number,
            ) => (
              <div
                key={index}
                className={cn(
                  'space-y-[1.2rem] rounded-[2.25rem] bg-white p-[1.5rem] shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)] xsm:rounded-[2.125rem] xsm:p-[1rem]',
                  index > 0 ? 'mt-[1rem] xsm:mt-[0.88rem]' : '',
                )}
              >
                <p className='mb-[0.88rem] font-montserrat text-[1rem] !font-bold leading-[1.625] tracking-[-0.03rem] text-black xsm:mb-[0.38rem] xsm:text-pc-sub14s'>
                  {item?.title}
                </p>
                <div className='flex bg-white sm:space-x-[1rem] xsm:!mt-0 xsm:flex-col-reverse xsm:[&_*]:!text-[rgba(0,0,0,0.60)]'>
                  <div
                    ref={(el) => {
                      containerRefs.current[index] = el
                    }}
                    className={cn(
                      '*:text-[0.875rem] *:font-medium *:leading-[1.3125rem] *:tracking-[-0.02625rem] *:text-[rgba(0,0,0,0.80)] xsm:*:text-[0.8125rem] xsm:*:leading-[1.21875rem] xsm:*:tracking-[-0.02438rem]',
                      '[&_ul]:!my-3 [&_ul]:!list-disc [&_ul]:!pl-[1.35rem] [&_ul]:xsm:!pl-3',
                      '[&_ol]:!my-3 [&_ol]:!list-decimal [&_ol]:!pl-[1.35rem] [&_ol]:xsm:!pl-3',
                      '[&_p]:pt-[0.62rem] first:[&_p]:pt-0 [&_p]:xsm:pt-[0.38rem]',
                    )}
                    dangerouslySetInnerHTML={{
                      __html: item?.content || '',
                    }}
                  ></div>
                  {item?.image && (
                    <div
                      className='flex-1'
                      ref={(el) => {
                        containerRefs.current[index] = el
                      }}
                    >
                      <ImageV2
                        src={item?.image}
                        alt=''
                        width={500 * 2}
                        height={300 * 2}
                        className='h-auto rounded-[0.5rem] object-contain xsm:mb-[0.5rem] xsm:w-full'
                      />
                    </div>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name={`order.${data?.user_chooses ? index + 1 : index}`}
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
                            'Tôi đã đọc và đồng ý với chính sách về kiện hàng'}
                        </FormLabel>
                      </div>
                      <FormMessage className='absolute bottom-[-80%] left-0 pl-[0.75rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                    </FormItem>
                  )}
                />
              </div>
            ),
          )}

        {/* footer */}
        <div className='mt-[1.5rem] flex w-full items-center justify-between space-x-[1.25rem] xsm:fixed xsm:bottom-0 xsm:left-0 xsm:right-0 xsm:z-[49] xsm:mt-0 xsm:space-x-[0.5rem] xsm:bg-[#FAFAFA] xsm:p-[1rem] disabled:xsm:opacity-[1]'>
          <div
            onClick={() => {
              setIndexTab(indexTab - 1)
              handleClickcurrentTab('4')
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
