'use client'

import ImageV2, {IImageProps} from '@/components/image/ImageV2'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import ICAddress from '@/sections/tao-don/ICAddress'
import ICPhone from '@/sections/tao-don/ICPhone'
import ICTime from '@/sections/tao-don/ICTime'
import ICX from '@/sections/tao-don/ICX'
import {
  ICreateOder,
  IInformationInstructOrder_SelectBranch,
} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import React, {Fragment, useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch'
import {z} from 'zod'

const formSchema = z.object({
  shipping: z
    .string({
      required_error: 'Vui lòng chọn chiều dịch vụ',
    })
    .min(1, 'Vui lòng chọn chiều dịch vụ'),
  branch: z
    .string({
      required_error: 'Vui lòng nhập thông tin tên đường',
    })
    .min(1, 'Vui lòng nhập thông tin tên đường'),
})

export default function ShippingInstructions({data}: {data: ICreateOder[]}) {
  const isMobile = useIsMobile()
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [selectServiceDimension, setSelectServiceDimension] =
    useState<boolean>(false)
  const [selectServiceDimensionValue, setSelectServiceDimensionValue] =
    useState<{img: string; title: string}>({img: '', title: ''})
  const [dataInformation, setDataInformation] = useState<
    ICreateOder | undefined
  >()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectBranch, setSelectBranch] = useState<boolean>(false)
  const [dataBranch, setDataBranch] =
    useState<IInformationInstructOrder_SelectBranch | null>(null)
  const [selectBranchValue, setSelectBranchValue] = useState<string>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      shipping: '',
      branch: '',
    },
  })
  const handleSetDataInformation = (shipping: string) => {
    setDataInformation(undefined)
    const foundItem = data?.find((item) => item.id === Number(shipping))
    setDataInformation(foundItem)
  }
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
    if (
      form?.getValues('branch') &&
      dataInformation?.information?.instruct?.select_branch
    ) {
      const foundItem =
        dataInformation?.information?.instruct?.select_branch?.find(
          (item) => item?.title === form?.getValues('branch'),
        )
      if (foundItem) {
        setDataBranch({
          title: foundItem?.title,
          address: foundItem?.address,
          time: foundItem?.time,
          phone: foundItem?.phone,
        })
      }
    }
  }, [dataInformation, form.getValues('branch')])
  return (
    <div className='pb-[1.5rem] pt-[1.5rem] sm:px-[8.5rem] xsm:px-[0rem]'>
      <div className='min-h-[80vh] space-y-[1.5rem] rounded-[1.25rem] bg-[#F8F8F8] p-[1.5rem] xsm:space-y-[0.75rem] xsm:bg-[#FAFAFA] xsm:p-[1rem]'>
        {!isMobile && (
          <h1 className='text-[#33A6E8] text-pc-heading20b xsm:text-[1rem]'>
            Hướng dẫn gửi hàng lên Amamy Post
          </h1>
        )}
        <Form {...form}>
          <form
            onSubmit={() => {}}
            className=''
          >
            <FormField
              control={form.control}
              name='shipping'
              render={({field}) => (
                <FormItem
                  onClick={() => {
                    if (isMobile) {
                      setSelectServiceDimension(true)
                      document.body.style.overflow = 'hidden'
                    }
                  }}
                  className='!mb-[1.25rem] flex-1 space-y-0'
                >
                  <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                    Chọn chiều dịch vụ (*)
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      handleSetDataInformation(value)
                      setDataBranch(null)
                      setSelectBranchValue('')
                      form.setValue('branch', '')
                      form.clearErrors('branch')
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl className='!mt-[0.37rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[0.75rem_0.75rem_0.75rem_1rem] aria-[invalid=true]:!border-[#F00] xsm:pointer-events-none [&_svg]:opacity-[1] [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:filter'>
                      <SelectTrigger className='h-[3rem] !shadow-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xsm:h-[2.5rem] [&_span]:!text-black [&_span]:text-pc-sub14m [&_span]:xsm:text-mb-13M'>
                        {!isMobile && (
                          <SelectValue placeholder='Chọn chiều dịch vụ' />
                        )}
                        {isMobile && !field.value && (
                          <SelectValue placeholder='Chọn chiều dịch vụ' />
                        )}
                        {isMobile && field.value && (
                          <div className='flex flex-1 items-center space-x-[0.75rem]'>
                            <ImageV2
                              src={selectServiceDimensionValue?.img || ''}
                              alt=''
                              height={100 * 2}
                              width={100 * 2}
                              className='size-[1.5rem] rounded-[100%] border-[0.5px] border-solid border-[rgba(0,0,0,0.25)]'
                            />
                            <p className='text-black text-pc-sub14m'>
                              {selectServiceDimensionValue?.title}
                            </p>
                          </div>
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)]'>
                      {Array.isArray(data) &&
                        data?.length > 0 &&
                        data?.map(
                          (item: ICreateOder, index: number) =>
                            !item?.information?.hidden_shipping && (
                              <SelectItem
                                key={index}
                                className='flex h-[3rem] cursor-pointer items-center rounded-[1.25rem] bg-white p-[0.75rem]'
                                value={String(item?.id)}
                              >
                                <div className='flex flex-1 items-center space-x-[0.75rem]'>
                                  <ImageV2
                                    src={
                                      item?.thumbnail ||
                                      '/order/flag-germany.webp'
                                    }
                                    alt=''
                                    height={100 * 2}
                                    width={100 * 2}
                                    className='size-[1.5rem] rounded-[100%] border-[0.5px] border-solid border-[rgba(0,0,0,0.25)]'
                                  />
                                  <p className='text-black text-pc-sub14m'>
                                    {item?.title}
                                  </p>
                                </div>
                              </SelectItem>
                            ),
                        )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {dataInformation?.information?.instruct?.select_branch && (
              <>
                <div className='rounded-[1.25rem]'>
                  <FormField
                    control={form.control}
                    name='branch'
                    render={({field}) => (
                      <FormItem
                        onClick={() => {
                          if (isMobile) {
                            setSelectBranch(true)
                            document.body.style.overflow = 'hidden'
                          }
                        }}
                        className={cn('flex-1 space-y-0')}
                      >
                        <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                          Chọn chi nhánh Amamy Post <strong>(*)</strong>
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            setSelectBranchValue(value)
                            form.setValue('branch', value)
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl
                            className={cn(
                              '!mt-[0.37rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[0.75rem_0.75rem_0.75rem_1rem] !shadow-none aria-[invalid=true]:!border-[#F00] xsm:pointer-events-none [&_svg]:opacity-[1] [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:filter',
                              dataInformation?.information?.instruct
                                ?.select_branch &&
                                dataInformation?.information?.instruct
                                  ?.select_branch?.length < 1 &&
                                '[&_svg]:hidden',
                            )}
                          >
                            <SelectTrigger className='h-[3rem] !shadow-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xsm:h-[2.5rem] [&_.amamy-post]:hidden [&_.select-addres]:hidden [&_.select-phone]:hidden [&_.select-time]:hidden [&_span]:!text-black [&_span]:text-pc-sub14m [&_span]:xsm:text-mb-13M'>
                              {!isMobile && (
                                <SelectValue placeholder='Các chi nhánh' />
                              )}
                              {isMobile && !selectBranchValue && (
                                <SelectValue placeholder='Các chi nhánh' />
                              )}
                              {isMobile && field.value && selectBranchValue && (
                                <div className='flex flex-1 items-center space-x-[0.75rem]'>
                                  <p className='text-black text-pc-sub14m'>
                                    {selectBranchValue || 'Các chi nhánh'}
                                  </p>
                                </div>
                              )}
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)]'>
                            {Array.isArray(
                              dataInformation?.information?.instruct
                                ?.select_branch,
                            ) &&
                              dataInformation?.information?.instruct
                                ?.select_branch?.length > 0 &&
                              dataInformation?.information?.instruct?.select_branch?.map(
                                (
                                  item: IInformationInstructOrder_SelectBranch,
                                  index: number,
                                ) => (
                                  <SelectItem
                                    key={index}
                                    className='flex h-auto cursor-pointer items-center rounded-[1.25rem] bg-white p-[0.75rem] [&>span>span>svg]:hidden'
                                    value={String(item?.title)}
                                  >
                                    <div className='flex-1 space-y-[0.75rem]'>
                                      <p className='text-black text-pc-tab-title'>
                                        <span className='amamy-post'>
                                          Amamy Post{' '}
                                        </span>
                                        <span>{item?.title}</span>
                                      </p>
                                      <div className='select-addres flex items-start space-x-[0.5rem]'>
                                        <ICAddress className='size-[1.5rem]' />
                                        <p
                                          dangerouslySetInnerHTML={{
                                            __html: item?.address,
                                          }}
                                          className='text-[0.8125rem] text-black text-pc-sub14m'
                                        ></p>
                                      </div>
                                      <div className='select-time flex items-start space-x-[0.5rem]'>
                                        <ICTime className='size-[1.5rem]' />
                                        <p
                                          dangerouslySetInnerHTML={{
                                            __html: item?.time,
                                          }}
                                          className='text-[0.8125rem] text-black text-pc-sub14m'
                                        ></p>
                                      </div>
                                      <div className='select-phone flex items-start space-x-[0.5rem]'>
                                        <ICPhone className='size-[1.5rem]' />
                                        <p
                                          dangerouslySetInnerHTML={{
                                            __html: item?.phone,
                                          }}
                                          className='text-[0.8125rem] text-black text-pc-sub14m'
                                        ></p>
                                      </div>
                                    </div>
                                  </SelectItem>
                                ),
                              )}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                {dataBranch && (
                  <div className='!mt-[0.75rem] flex-1 space-y-[0.75rem] rounded-[1.25rem] bg-white p-[1rem] shadow-sm'>
                    <p className='text-black text-pc-tab-title'>
                      <span className='amamy-post'>Amamy Post </span>
                      <span>{dataBranch?.title}</span>
                    </p>
                    {dataBranch?.address && (
                      <div className='select-addres flex items-start space-x-[0.5rem]'>
                        <ICAddress className='size-[1.5rem]' />
                        <p
                          dangerouslySetInnerHTML={{
                            __html: dataBranch?.address || '',
                          }}
                          className='flex-1 !text-[0.8125rem] !text-[rgba(0,0,0,0.80)] text-black text-pc-sub14m'
                        ></p>
                      </div>
                    )}
                    {dataBranch?.time && (
                      <div className='select-time flex items-start space-x-[0.5rem]'>
                        <ICTime className='size-[1.5rem]' />
                        <p
                          dangerouslySetInnerHTML={{
                            __html: dataBranch?.time || '',
                          }}
                          className='flex-1 !text-[0.8125rem] !text-[rgba(0,0,0,0.80)] text-black text-pc-sub14m'
                        ></p>
                      </div>
                    )}
                    {dataBranch?.phone && (
                      <Link
                        href={'tel:' + dataBranch?.phone}
                        className='select-phone flex items-start space-x-[0.5rem]'
                      >
                        <ICPhone className='size-[1.5rem]' />
                        <p
                          dangerouslySetInnerHTML={{
                            __html: dataBranch?.phone || '',
                          }}
                          className='flex-1 !text-[0.8125rem] !text-[rgba(0,0,0,0.80)] text-black text-pc-sub14m'
                        ></p>
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
            {isMobile && (
              <>
                <div
                  onClick={() => {
                    setSelectServiceDimension(false)
                    document.body.style.overflow = 'auto'
                  }}
                  className={cn(
                    'pointer-events-none invisible fixed inset-0 z-[51] bg-black/0 transition-all duration-700 ease-in-out',
                    selectServiceDimension &&
                      'pointer-events-auto visible bg-black/50',
                  )}
                ></div>
                <div
                  className={cn(
                    'fixed bottom-0 left-0 z-[52] w-full translate-y-full overflow-hidden rounded-t-[1.25rem] bg-white shadow-lg transition-all duration-700 ease-in-out',
                    selectServiceDimension && 'translate-y-0',
                  )}
                >
                  <div className='relative border-b-[1px] border-solid border-b-[#DCDFE4] p-[0.5rem] flex-center'>
                    <p className='text-center font-montserrat text-[0.75rem] font-semibold tracking-[-0.015rem] text-black'>
                      Chọn chiều dịch vụ
                    </p>
                    <div
                      onClick={() => {
                        setSelectServiceDimension(false)
                        document.body.style.overflow = 'auto'
                      }}
                      className='absolute right-[0.5rem] top-[0.5rem]'
                    >
                      <ICX className='size-[1.5rem]' />
                    </div>
                  </div>
                  <div className='hidden_scroll max-h-[70vh] space-y-[0.5rem] overflow-hidden overflow-y-auto pb-[2rem]'>
                    {Array.isArray(data) &&
                      data?.length > 0 &&
                      data?.map(
                        (item: ICreateOder, index: number) =>
                          !item?.information?.hidden_shipping && (
                            <Fragment key={index}>
                              <div
                                onClick={() => {
                                  form.setValue('shipping', String(item?.id), {
                                    shouldValidate: true, // Kích hoạt validate ngay sau khi set value
                                  })
                                  setSelectServiceDimensionValue({
                                    img: item?.thumbnail,
                                    title: item?.title,
                                  })
                                  setSelectServiceDimension(false)
                                  handleSetDataInformation(String(item?.id))
                                  document.body.style.overflow = 'auto'
                                  setDataBranch(null)
                                  setSelectBranchValue('')
                                  form.setValue('branch', '')
                                  form.clearErrors('branch')
                                }}
                                className='flex items-center space-x-[0.75rem] bg-white p-[0.75rem]'
                              >
                                <ImageV2
                                  src={
                                    item?.thumbnail ||
                                    '/order/flag-germany.webp'
                                  }
                                  alt=''
                                  height={50 * 2}
                                  width={50 * 2}
                                  className='size-[1.5rem] rounded-[100%] border-[0.5px] border-solid border-[rgba(0,0,0,0.25)]'
                                />
                                <p className='line-clamp-1 text-black text-pc-sub14m'>
                                  {item?.title}
                                </p>
                              </div>
                              <div className='h-[1px] w-full bg-[#F8F8F8]'></div>
                            </Fragment>
                          ),
                      )}
                  </div>
                </div>
                {Array.isArray(
                  dataInformation?.information?.instruct?.select_branch,
                ) &&
                  dataInformation?.information?.instruct?.select_branch &&
                  dataInformation?.information?.instruct?.select_branch
                    ?.length > 0 && (
                    <>
                      <div
                        onClick={() => {
                          setSelectBranch(false)
                          document.body.style.overflow = 'auto'
                        }}
                        className={cn(
                          'pointer-events-none invisible fixed inset-0 z-[51] !mt-0 bg-black/0 transition-all duration-700 ease-in-out',
                          selectBranch &&
                            'pointer-events-auto visible bg-black/50',
                        )}
                      ></div>
                      <div
                        className={cn(
                          'fixed bottom-0 left-0 z-[52] w-full translate-y-full rounded-t-[1.25rem] bg-[#F6F6F6] pb-[2rem] shadow-lg transition-all duration-700 ease-in-out',
                          selectBranch && 'translate-y-0',
                        )}
                      >
                        <div className='relative rounded-t-[1.25rem] border-b-[1px] border-solid border-b-[#DCDFE4] bg-white p-[0.5rem] flex-center'>
                          <p className='text-center font-montserrat text-[0.75rem] font-semibold tracking-[-0.015rem] text-black'>
                            Chọn chi nhánh Amamy Post
                          </p>
                          <div
                            onClick={() => {
                              setSelectBranch(false)
                              document.body.style.overflow = 'auto'
                            }}
                            className='absolute right-[0.5rem] top-[0.5rem]'
                          >
                            <ICX className='size-[1.5rem]' />
                          </div>
                        </div>
                        <div className='hidden_scroll max-h-[70vh] space-y-[1rem] overflow-hidden overflow-y-auto bg-[#F6F6F6] p-[1rem]'>
                          {Array.isArray(
                            dataInformation?.information?.instruct
                              ?.select_branch,
                          ) &&
                            dataInformation?.information?.instruct?.select_branch?.map(
                              (
                                item: IInformationInstructOrder_SelectBranch,
                                index: number,
                              ) => (
                                <div
                                  key={index}
                                  onClick={() => {
                                    form.setValue(
                                      'branch',
                                      String(item?.title),
                                      {
                                        shouldValidate: true, // Kích hoạt validate ngay sau khi set value
                                      },
                                    )
                                    setSelectBranchValue(item?.title)
                                    setSelectBranch(false)
                                    document.body.style.overflow = 'auto'
                                  }}
                                  className='flex items-center space-x-[0.75rem] rounded-[1.25rem] border-[1px] border-solid border-[#F8F8F8] bg-white p-[0.75rem]'
                                >
                                  <div className='flex-1 space-y-[0.75rem]'>
                                    <p className='text-black text-pc-tab-title xsm:text-pc-sub14s'>
                                      <span className='amamy-post'>
                                        Amamy Post{' '}
                                      </span>
                                      <span>{item?.title}</span>
                                    </p>
                                    <div className='select-addres flex items-start space-x-[0.5rem]'>
                                      <ICAddress className='size-[1.5rem] xsm:size-[1.125rem]' />
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: item?.address,
                                        }}
                                        className='flex-1 !text-[0.8125rem] !text-[rgba(0,0,0,0.80)] text-black text-pc-sub14m xsm:text-[rgba(0,0,0,0.80)] xsm:text-mb-13M'
                                      ></p>
                                    </div>
                                    <div className='select-time flex items-start space-x-[0.5rem]'>
                                      <ICTime className='size-[1.5rem] xsm:size-[1.125rem]' />
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: item?.time,
                                        }}
                                        className='flex-1 !text-[0.8125rem] !text-[rgba(0,0,0,0.80)] text-black text-pc-sub14m xsm:text-[rgba(0,0,0,0.80)] xsm:text-mb-13M'
                                      ></p>
                                    </div>
                                    <div className='select-phone flex items-start space-x-[0.5rem]'>
                                      <ICPhone className='size-[1.5rem] xsm:size-[1.125rem]' />
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: item?.phone,
                                        }}
                                        className='flex-1 !text-[0.8125rem] !text-[rgba(0,0,0,0.80)] text-black text-pc-sub14m xsm:text-[rgba(0,0,0,0.80)] xsm:text-mb-13M'
                                      ></p>
                                    </div>
                                  </div>
                                </div>
                              ),
                            )}
                        </div>
                      </div>
                    </>
                  )}
              </>
            )}
          </form>
        </Form>
        {dataInformation?.information?.instruct?.packing_instructions && (
          <div className='flex rounded-[1.25rem] bg-white p-[1rem] sm:space-x-[1rem] xsm:flex-col xsm:space-y-[1rem]'>
            <div
              className='[&_h3]: [&_strong]: *: [&_ul]:content-ul flex-1 *:text-[rgba(0,0,0,0.60)] *:text-pc-sub14s *:xsm:text-mb-13 [&_*]:text-[0.8125rem] [&_a]:text-[#0084FF] [&_h3]:text-black [&_h3]:text-pc-tab-title [&_img]:my-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[1rem] [&_strong]:text-black [&_strong]:text-pc-sub14s [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)] xsm:marker:[&_ul_li]:text-[0.5rem]'
              dangerouslySetInnerHTML={{
                __html:
                  dataInformation?.information?.instruct
                    ?.packing_instructions || '',
              }}
            ></div>
            {dataInformation?.information?.instruct?.images && (
              <div
                ref={(el) => {
                  containerRefs.current[0] = el
                }}
              >
                <ImageMemo
                  src={dataInformation?.information?.instruct?.images}
                  alt=''
                  width={300 * 2}
                  height={200 * 2}
                  className='max-h-[12.5rem] max-w-[18.75rem] rounded-[1rem] object-contain xsm:max-h-[12.95831rem] xsm:max-w-full'
                />
              </div>
            )}
          </div>
        )}
        {dataInformation?.note_page_huong_dan && (
          <div className='flex flex-col rounded-[1.25rem] bg-white p-[1rem] sm:space-x-[1rem] xsm:space-y-[1rem]'>
            <p className='mb-[0.75rem] font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem] text-black xsm:!font-bold xsm:text-pc-sub14s'>
              Lưu ý quan trọng
            </p>
            <div
              className='[&_h3]: [&_strong]: *: [&_ul]:content-ul flex-1 *:text-[rgba(0,0,0,0.60)] *:text-pc-sub14s *:xsm:text-mb-13 [&_a]:text-[#0084FF] [&_h3]:text-black [&_h3]:text-pc-tab-title [&_img]:my-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[1rem] [&_strong]:text-black [&_strong]:text-pc-sub14s [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)] xsm:marker:[&_ul_li]:text-[0.5rem]'
              dangerouslySetInnerHTML={{
                __html: dataInformation?.note_page_huong_dan || '',
              }}
            ></div>
          </div>
        )}
        {selectedImage && (
          <div
            className='fixed inset-0 z-50 !mt-0 flex animate-fade-in items-center justify-center bg-black bg-opacity-50'
            onClick={() => setSelectedImage(null)}
          >
            <div
              onClick={(e) => {
                e.stopPropagation() // Ngăn việc click vào ảnh đóng popup
              }}
              className='relative flex max-h-[100vh] max-w-[100vw] animate-scale-in flex-col items-center overflow-hidden sm:max-w-[80vw] xsm:overflow-x-auto'
            >
              <TransformWrapper
                initialScale={1}
                initialPositionX={200}
                initialPositionY={100}
              >
                {() => (
                  <>
                    <TransformComponent>
                      <Image
                        width={1000 * 2}
                        height={800 * 2}
                        src={selectedImage}
                        alt='Zoomed Image'
                        quality={100}
                        className='h-auto max-w-full rounded-[1rem] object-contain transition-transform duration-300'
                      />
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Memoized component for image item
export const ImageMemo = React.memo(function ImageMemo(props: IImageProps) {
  return <ImageV2 {...props} />
})
