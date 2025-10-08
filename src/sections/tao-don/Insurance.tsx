'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import useStore from '@/app/(store)/store'
import { cn } from '@/lib/utils'
import { IDataFromOrder } from '@/sections/tao-don/CreateOrder'
import {
  IInformationInsurance,
  IInformationInsurance_CargoInsuranceJapanvn,
  IInformationInsurance_policy,
} from '@/sections/tao-don/oder.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ImageV2 from '@/components/image/ImageV2'
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
  const { stepOrder, setStepOrder } = useStore((state) => state)
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
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-[1.5rem] pb-[4rem] xsm:space-y-[0.75rem]'
      >
        {data?.compensation && (
          <>
            {!data?.user_chooses &&
              Array.isArray(data?.compensation?.policy) &&
              data?.compensation?.policy?.map(
                (item: IInformationInsurance_policy, index: number) => (
                  <div
                    key={index}
                    className='space-y-[1.2rem] rounded-[1.25rem] bg-white p-[1rem] '
                  >
                    <div
                      ref={(el) => {
                        containerRefs.current[index] = el
                      }}
                      className='[&_ul]:content-ul [&_ol]:content-ol *:font-medium *:text-black/[0.92] *:text-pc-14 *:xsm:text-mb-13 [&_a]:text-[#0084FF] [&_h3]:text-pc-tab-title [&_img]:my-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[1rem] [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 [&_p]:pt-[0.75rem] first:[&_p]:pt-0 [&_ul]:!my-0 xsm:marker:[&_ul_li]:text-[0.5rem]'
                      dangerouslySetInnerHTML={{
                        __html: item?.content || '',
                      }}
                    ></div>

                    <FormField
                      control={form.control}
                      name={`order.${index}`}
                      render={({ field }) => (
                        <FormItem className='relative flex flex-row items-center space-x-[0.5rem] space-y-0 border-none'>
                          <FormControl>
                            <Checkbox
                              className='size-[1.875rem] border-none bg-[#FFEC1F] text-[#000000] flex-center data-[state=checked]:bg-[#FFEC1F] data-[state=checked]:text-[#000000] xsm:size-[1.5rem] [&>span>svg]:size-[1.25rem] [&_.svg-none-check]:aria-[checked=false]:block [&_svg]:size-[1rem]'
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className='space-y-1 leading-none'>
                            <FormLabel className='cursor-pointer !font-semibold text-black/[0.92] text-pc-sub14m xsm:line-clamp-2 xsm:text-mb-13M'>
                              {item?.clause ||
                                'Tôi đã đọc và đồng ý với chính sách về kiện hàng'}
                            </FormLabel>
                          </div>
                          <FormMessage className='absolute bottom-[-80%] left-0 pl-[0.75rem] !text-[#F00] text-pc-sub12m' />
                        </FormItem>
                      )}
                    />
                  </div>
                ),
              )}

            {data?.user_chooses && (
              <div className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[1rem] xsm:rounded-[2.125rem] xsm:border-0 xsm:shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)]'>
                {/* title */}
                <div className='mb-[1rem]'>
                  <p
                    className={cn(
                      '!font-bold text-[#33A6E8] text-pc-tab-title',
                      data?.user_chooses && 'text-[rgba(0,0,0,0.92)]',
                    )}
                  >
                    {data?.compensation?.title}
                  </p>
                  <div
                    className='text-[rgba(0,0,0,0.92)] text-pc-sub14m xsm:[&_*]:!text-[rgba(0,0,0,0.60)]'
                    dangerouslySetInnerHTML={{ __html: data?.compensation?.desc }}
                  ></div>
                </div>

                <div className='flex flex-col space-y-[0.62rem]'>
                  {Array.isArray(data?.insurance_types?.list_insurance_types) &&
                    data?.insurance_types?.list_insurance_types?.map(
                      (insuranceItem, insuranceIndex) => (
                        <FormField
                          key={insuranceIndex}
                          control={form.control}
                          name={`typeofinsurance`}
                          render={({ field }) => {
                            const isChecked =
                              field.value === insuranceItem?.label

                            return (
                              <FormItem
                                className={cn(
                                  'relative flex flex-row items-center space-x-[0.5rem] space-y-0 border-[0px] transition-all duration-150 xsm:rounded-[2rem] xsm:border-[1.2px] xsm:p-[0.625rem_0.75rem]',
                                  isChecked
                                    ? 'xsm:border-[#38B6FF] xsm:bg-[#F1F9FF]'
                                    : 'xsm:border-transparent xsm:bg-[#EFEFEF99]',
                                )}
                              >
                                <FormControl>
                                  <Checkbox
                                    className='size-[1.25rem] rounded-[100%] border-[1.66667px] border-solid border-[#000000] !bg-white transition-all duration-150 flex-center data-[state=checked]:!border-[#38B6FF] xsm:border-[#A3DDFF] xsm:!bg-[#EFEFEF99] xsm:shadow-none [&>span]:size-[0.75rem] [&>span]:rounded-[100%] [&>span]:bg-transparent [&>span]:data-[state=checked]:!bg-[#38B6FF] [&_svg]:!hidden'
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
                                <div className='flex flex-col space-y-[0rem] leading-none'>
                                  <div className='flex sm:items-center sm:space-x-[0.3875rem] xsm:flex-wrap xsm:gap-[0.5rem]'>
                                    {isMobile && insuranceItem?.tag && (
                                      <div className='flex items-center space-x-[0.25rem] rounded-[62.5rem] bg-[#3FC371] p-[0.13rem_0.38rem] sm:hidden'>
                                        <ICStar />
                                        <p className='text-white flex-center text-pc-sub14m xsm:w-max xsm:text-[0.625rem] xsm:font-semibold xsm:leading-[1.4] xsm:tracking-[-0.01875rem]'>
                                          {insuranceItem?.tag}
                                        </p>
                                      </div>
                                    )}
                                    <FormLabel className='cursor-pointer !font-semibold text-black/[0.92] text-pc-sub14s xsm:line-clamp-2 xsm:!font-semibold xsm:text-mb-13S'>
                                      {insuranceItem?.label}
                                    </FormLabel>
                                    {!isMobile && insuranceItem?.tag && (
                                      <div className='flex items-center space-x-[0.25rem] rounded-[62.5rem] bg-[#3FC371] p-[0.13rem_0.38rem] xsm:hidden'>
                                        <ICStar />
                                        <p className='text-white flex-center text-pc-sub14m xsm:w-max xsm:text-[0.625rem] xsm:font-semibold xsm:leading-[1.4] xsm:tracking-[-0.01875rem]'>
                                          {insuranceItem?.tag}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  {insuranceItem?.desc && (
                                    <FormLabel className='cursor-pointer pt-[0.5rem] text-[rgba(0,0,0,0.80)] text-pc-sub14m xsm:[&_*]:!text-[rgba(0,0,0,0.60)]'>
                                      <p
                                        className='text-[rgba(0,0,0,0.80)] text-pc-sub14m xsm:[&_*]:!text-[rgba(0,0,0,0.60)]'
                                        dangerouslySetInnerHTML={{
                                          __html: insuranceItem?.desc,
                                        }}
                                      ></p>
                                    </FormLabel>
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
                  render={({ field }) => (
                    <FormItem className='relative mt-[1rem] flex flex-row items-center space-x-[0.5rem] space-y-0 border-none'>
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
                        <FormLabel className='cursor-pointer !font-semibold text-black/[0.92] text-pc-sub14m xsm:line-clamp-2 xsm:text-mb-13M'>
                          {data?.insurance_types?.clause ||
                            'Tôi đã đọc và đồng ý với chính sách về kiện hàng'}
                        </FormLabel>
                      </div>
                      <FormMessage className='absolute bottom-[-80%] left-0 pl-[0.75rem] !text-[#F00] text-pc-sub12m' />
                    </FormItem>
                  )}
                />
              </div>
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
                className='space-y-[1.2rem] rounded-[1.25rem] bg-white p-[1rem]   '
              >
                <p className='mb-[0.88rem] font-montserrat text-[1rem] !font-bold leading-[1.625] tracking-[-0.03rem] text-black xsm:text-pc-sub14s'>
                  {item?.title}
                </p>
                <div className='flex bg-white sm:space-x-[1rem] xsm:flex-col-reverse xsm:[&_*]:!text-[rgba(0,0,0,0.60)]'>
                  <div
                    ref={(el) => {
                      containerRefs.current[index] = el
                    }}
                    className='[&_ul]:content-ul flex-1 *:font-medium *:text-black/[0.92] *:text-pc-14 *:xsm:text-mb-13 [&_a]:text-[#0084FF] [&_h3]:text-pc-tab-title [&_img]:my-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[1rem] [&_strong]:text-pc-sub14s [&_ul]:!my-0 xsm:marker:[&_ul_li]:text-[0.5rem]'
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
                  render={({ field }) => (
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
                        <FormLabel className='cursor-pointer !font-semibold text-black/[0.92] text-pc-sub14m xsm:line-clamp-2 xsm:text-mb-13M'>
                          {item?.clause ||
                            'Tôi đã đọc và đồng ý với chính sách về kiện hàng'}
                        </FormLabel>
                      </div>
                      <FormMessage className='absolute bottom-[-80%] left-0 pl-[0.75rem] !text-[#F00] text-pc-sub12m' />
                    </FormItem>
                  )}
                />
              </div>
            ),
          )}
        <div className='flex items-center justify-between space-x-[2rem] sm:w-full xsm:fixed xsm:bottom-0 xsm:left-0 xsm:right-0 xsm:z-[49] xsm:space-x-[0.5rem] xsm:bg-[#FAFAFA] xsm:p-[1rem] disabled:xsm:opacity-[1]'>
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
