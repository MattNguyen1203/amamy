'use client'
import ImageV2 from '@/components/image/ImageV2'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {Label} from '@/components/ui/label'
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
  IInformationTimeOrder,
} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import {Fragment, useEffect, useRef, useState} from 'react'
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
    <div className='xsm:px-[0rem] sm:px-[8.5rem] pb-[1.5rem] pt-[1.5rem]'>
      <div className='min-h-[80vh] bg-[#F8F8F8] xsm:bg-[#FAFAFA] p-[1.5rem] xsm:p-[1rem] rounded-[1.25rem] space-y-[1.5rem] xsm:space-y-[0.75rem]'>
        <h1 className='text-[#33A6E8] text-pc-heading20b xsm:text-[1rem]'>
          Hướng dẫn gửi hàng lên Amamy Post
        </h1>
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
                  className='flex-1 space-y-0 !mb-[1.25rem]'
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
                    <FormControl className='xsm:pointer-events-none aria-[invalid=true]:!border-[#F00] bg-white !mt-[0.37rem] p-[0.75rem_0.75rem_0.75rem_1rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] [&_svg]:filter [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:opacity-[1]'>
                      <SelectTrigger className='!shadow-none xsm:h-[2.5rem] h-[3rem] [&_span]:!text-black [&_span]:text-pc-sub14m [&_span]:xsm:text-mb-13M focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                        {!isMobile && (
                          <SelectValue placeholder='Chọn chiều dịch vụ' />
                        )}
                        {isMobile && !field.value && (
                          <SelectValue placeholder='Chọn chiều dịch vụ' />
                        )}
                        {isMobile && field.value && (
                          <div className='space-x-[0.75rem] flex items-center flex-1'>
                            <ImageV2
                              src={selectServiceDimensionValue?.img || ''}
                              alt=''
                              height={100 * 2}
                              width={100 * 2}
                              className='size-[1.5rem] rounded-[100%] border-[0.5px] border-solid border-[rgba(0,0,0,0.25)]'
                            />
                            <p className=' text-black text-pc-sub14m'>
                              {selectServiceDimensionValue?.title}
                            </p>
                          </div>
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] bg-white'>
                      {Array.isArray(data) &&
                        data?.length > 0 &&
                        data?.map((item: ICreateOder, index: number) => (
                          <SelectItem
                            key={index}
                            className='cursor-pointer h-[3rem] rounded-[1.25rem] p-[0.75rem] bg-white flex items-center'
                            value={String(item?.id)}
                          >
                            <div className='space-x-[0.75rem] flex items-center flex-1'>
                              <ImageV2
                                src={
                                  item?.thumbnail || '/order/flag-germany.webp'
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
                        ))}
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
                        <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                          Chọn chi nhánh Amamy Post (*)
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
                              '!shadow-none xsm:pointer-events-none aria-[invalid=true]:!border-[#F00] bg-white !mt-[0.37rem] p-[0.75rem_0.75rem_0.75rem_1rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] [&_svg]:filter [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:opacity-[1]',
                              dataInformation?.information?.instruct
                                ?.select_branch &&
                                dataInformation?.information?.instruct
                                  ?.select_branch?.length < 1 &&
                                '[&_svg]:hidden',
                            )}
                          >
                            <SelectTrigger className='!shadow-none [&_.amamy-post]:hidden [&_.select-addres]:hidden [&_.select-time]:hidden [&_.select-phone]:hidden xsm:h-[2.5rem] h-[3rem] [&_span]:!text-black [&_span]:text-pc-sub14m [&_span]:xsm:text-mb-13M focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                              {!isMobile && (
                                <SelectValue placeholder='Các chi nhánh' />
                              )}
                              {isMobile && !selectBranchValue && (
                                <SelectValue placeholder='Các chi nhánh' />
                              )}
                              {isMobile && field.value && selectBranchValue && (
                                <div className='space-x-[0.75rem] flex items-center flex-1'>
                                  <p className='text-black text-pc-sub14m '>
                                    {selectBranchValue || 'Các chi nhánh'}
                                  </p>
                                </div>
                              )}
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] bg-white'>
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
                                    className='[&>span>span>svg]:hidden cursor-pointer h-auto rounded-[1.25rem] p-[0.75rem] bg-white flex items-center'
                                    value={String(item?.title)}
                                  >
                                    <div className='flex-1 space-y-[0.75rem]'>
                                      <p className='text-pc-tab-title text-black'>
                                        <span className='amamy-post'>
                                          Amamy Post{' '}
                                        </span>
                                        <span>{item?.title}</span>
                                      </p>
                                      <div className='select-addres flex space-x-[0.5rem] items-start'>
                                        <ICAddress className='size-[1.5rem]' />
                                        <p
                                          dangerouslySetInnerHTML={{
                                            __html: item?.address,
                                          }}
                                          className='text-black text-pc-sub14m '
                                        ></p>
                                      </div>
                                      <div className='select-time flex space-x-[0.5rem] items-start'>
                                        <ICTime className='size-[1.5rem]' />
                                        <p
                                          dangerouslySetInnerHTML={{
                                            __html: item?.time,
                                          }}
                                          className='text-black text-pc-sub14m '
                                        ></p>
                                      </div>
                                      <div className='select-phone flex space-x-[0.5rem] items-start'>
                                        <ICPhone className='size-[1.5rem]' />
                                        <p
                                          dangerouslySetInnerHTML={{
                                            __html: item?.phone,
                                          }}
                                          className='text-black text-pc-sub14m '
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
                  <div className='shadow-sm !mt-[0.75rem] flex-1 space-y-[0.75rem] p-[1rem] bg-white rounded-[1.25rem]'>
                    <p className='text-pc-tab-title text-black'>
                      <span className='amamy-post'>Amamy Post </span>
                      <span>{dataBranch?.title}</span>
                    </p>
                    {dataBranch?.address && (
                      <div className='select-addres flex space-x-[0.5rem] items-start'>
                        <ICAddress className='size-[1.5rem]' />
                        <p
                          dangerouslySetInnerHTML={{
                            __html: dataBranch?.address || '',
                          }}
                          className='flex-1 text-black text-pc-sub14m '
                        ></p>
                      </div>
                    )}
                    {dataBranch?.time && (
                      <div className='select-time flex space-x-[0.5rem] items-start'>
                        <ICTime className='size-[1.5rem]' />
                        <p
                          dangerouslySetInnerHTML={{
                            __html: dataBranch?.time || '',
                          }}
                          className='flex-1 text-black text-pc-sub14m '
                        ></p>
                      </div>
                    )}
                    {dataBranch?.phone && (
                      <Link
                        href={'tel:' + dataBranch?.phone}
                        className='select-phone flex space-x-[0.5rem] items-start'
                      >
                        <ICPhone className='size-[1.5rem]' />
                        <p
                          dangerouslySetInnerHTML={{
                            __html: dataBranch?.phone || '',
                          }}
                          className='flex-1 text-black text-pc-sub14m '
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
                    'fixed transition-all duration-1000 inset-0 bg-black/0 z-[51] pointer-events-none',
                    selectServiceDimension && 'bg-black/70 pointer-events-auto',
                  )}
                ></div>
                <div
                  className={cn(
                    'fixed transition-all duration-500 shadow-lg bottom-[-125%] z-[52] left-0 w-full rounded-t-[1.25rem] bg-white overflow-hidden',
                    selectServiceDimension && 'bottom-0',
                  )}
                >
                  <div className='border-b-[1px] border-solid border-b-[#DCDFE4] relative p-[0.5rem] flex-center '>
                    <p className='text-center text-[0.75rem] font-montserrat font-semibold tracking-[-0.015rem] text-black'>
                      Chọn chiều dịch vụ
                    </p>
                    <div
                      onClick={() => {
                        setSelectServiceDimension(false)
                        document.body.style.overflow = 'auto'
                      }}
                      className='absolute top-[0.5rem] right-[0.5rem]'
                    >
                      <ICX className='size-[1.5rem]' />
                    </div>
                  </div>
                  <div className='space-y-[0.5rem] pb-[2rem] overflow-hidden overflow-y-auto max-h-[70vh] hidden_scroll'>
                    {Array.isArray(data) &&
                      data?.length > 0 &&
                      data?.map((item: ICreateOder, index: number) => (
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
                            className='space-x-[0.75rem] flex items-center p-[0.75rem] bg-white'
                          >
                            <ImageV2
                              src={
                                item?.thumbnail || '/order/flag-germany.webp'
                              }
                              alt=''
                              height={50 * 2}
                              width={50 * 2}
                              className='size-[1.5rem] rounded-[100%] border-[0.5px] border-solid border-[rgba(0,0,0,0.25)]'
                            />
                            <p className='text-black text-pc-sub14m line-clamp-1'>
                              {item?.title}
                            </p>
                          </div>
                          <div className='h-[1px] w-full bg-[#F8F8F8]'></div>
                        </Fragment>
                      ))}
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
                          'fixed transition-all duration-1000 inset-0 bg-black/0 z-[51] pointer-events-none !mt-0',
                          selectBranch && 'bg-black/70 pointer-events-auto',
                        )}
                      ></div>
                      <div
                        className={cn(
                          'fixed transition-all duration-500 shadow-lg bottom-[-125%] z-[52] left-0 w-full rounded-t-[1.25rem] bg-[#F6F6F6] pb-[2rem]',
                          selectBranch && 'bottom-0',
                        )}
                      >
                        <div className='bg-white border-b-[1px] border-solid border-b-[#DCDFE4] rounded-t-[1.25rem] relative p-[0.5rem] flex-center '>
                          <p className='text-center text-[0.75rem] font-montserrat font-semibold tracking-[-0.015rem] text-black'>
                            Chọn chi nhánh Amamy Post
                          </p>
                          <div
                            onClick={() => {
                              setSelectBranch(false)
                              document.body.style.overflow = 'auto'
                            }}
                            className='absolute top-[0.5rem] right-[0.5rem]'
                          >
                            <ICX className='size-[1.5rem]' />
                          </div>
                        </div>
                        <div className='p-[1rem] bg-[#F6F6F6] space-y-[1rem] overflow-hidden overflow-y-auto max-h-[70vh] hidden_scroll'>
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
                                  className='bg-white rounded-[1.25rem] space-x-[0.75rem] flex items-center p-[0.75rem] border-[1px] border-solid border-[#F8F8F8]'
                                >
                                  <div className='flex-1 space-y-[0.75rem]'>
                                    <p className='text-pc-tab-title text-black xsm:text-pc-sub14s'>
                                      <span className='amamy-post'>
                                        Amamy Post{' '}
                                      </span>
                                      <span>{item?.title}</span>
                                    </p>
                                    <div className='select-addres flex space-x-[0.5rem] items-start'>
                                      <ICAddress className='size-[1.5rem] xsm:size-[1.125rem]' />
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: item?.address,
                                        }}
                                        className=' flex-1 text-black text-pc-sub14m xsm:text-mb-13M xsm:text-[rgba(0,0,0,0.80)]'
                                      ></p>
                                    </div>
                                    <div className='select-time flex space-x-[0.5rem] items-start'>
                                      <ICTime className='size-[1.5rem] xsm:size-[1.125rem]' />
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: item?.time,
                                        }}
                                        className=' flex-1 text-black text-pc-sub14m xsm:text-mb-13M xsm:text-[rgba(0,0,0,0.80)]'
                                      ></p>
                                    </div>
                                    <div className='select-phone flex space-x-[0.5rem] items-start'>
                                      <ICPhone className='size-[1.5rem] xsm:size-[1.125rem]' />
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: item?.phone,
                                        }}
                                        className=' flex-1 text-black text-pc-sub14m xsm:text-mb-13M xsm:text-[rgba(0,0,0,0.80)]'
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
          <div className='flex xsm:flex-col sm:space-x-[1rem] xsm:space-y-[1rem] p-[1rem] rounded-[1.25rem] bg-white'>
            <div
              className='[&_img]:my-2 [&_img]:w-full [&_img]:h-auto [&_img]:rounded-[1rem] flex-1 [&_a]:text-[#0084FF] [&_h3]:text-pc-tab-title [&_h3]: [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]: [&_strong]:text-black *:text-[rgba(0,0,0,0.60)] *:text-pc-sub14s *:xsm:text-mb-13 *: [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)] xsm:marker:[&_ul_li]:text-[0.5rem]'
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
                <ImageV2
                  src={dataInformation?.information?.instruct?.images}
                  alt=''
                  width={300 * 2}
                  height={200 * 2}
                  className='rounded-[1rem] max-w-[18.75rem] xsm:max-w-full max-h-[12.5rem] xsm:max-h-[12.95831rem] object-contain'
                />
              </div>
            )}
          </div>
        )}
        {Array.isArray(dataInformation?.information?.time) &&
          dataInformation?.information?.time?.map(
            (item: IInformationTimeOrder, index: number) => (
              <Fragment key={index}>
                <div className='p-[1rem] rounded-[1.25rem] bg-white mb-[1.5rem]'>
                  <p className='xsm:text-pc-sub14s mb-[0.75rem] xsm:!font-bold text-black font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
                    {item?.time_content}
                  </p>
                  {item?.user_chooses ? (
                    <>
                      <div className='space-y-[0.875rem] mb-[0.875rem]'>
                        {item?.stock_user?.map((stockItem, stockIndex) => (
                          <div
                            key={stockIndex}
                            className='leading-none space-y-[0rem] flex flex-col'
                          >
                            <div className='flex xsm:flex-wrap sm:items-center xsm:gap-[0.5rem] sm:space-x-[0.3875rem]'>
                              <Label className='text-pc-sub14s !font-semibold xsm:text-mb-13S xsm:!font-semibold xsm:line-clamp-2 text-black/[0.92] cursor-pointer'>
                                {stockItem?.label}
                              </Label>
                              {stockItem?.tag && (
                                <p className='xsm:w-max p-[0.25rem_0.75rem] flex-center rounded-[62.5rem] bg-[#5DAF46] text-pc-sub14m xsm:text-[0.625rem] xsm:font-semibold xsm:leading-[1.4] xsm:tracking-[-0.01875rem] text-white'>
                                  {stockItem?.tag}
                                </p>
                              )}
                            </div>
                            {stockItem?.desc && (
                              <Label className='pt-[0.5rem] text-pc-sub14m text-[rgba(0,0,0,0.80)] cursor-pointer'>
                                <p
                                  className='text-pc-sub14m text-[rgba(0,0,0,0.80)]'
                                  dangerouslySetInnerHTML={{
                                    __html: stockItem?.desc,
                                  }}
                                ></p>
                              </Label>
                            )}
                          </div>
                        ))}
                      </div>
                      {item?.note_more && (
                        <p
                          className='text-pc-sub14m text-[#F00] mb-[1rem]'
                          dangerouslySetInnerHTML={{
                            __html: item?.note_more,
                          }}
                        ></p>
                      )}
                    </>
                  ) : (
                    <div
                      className='[&_img]:my-2 [&_img]:w-full [&_img]:h-auto [&_img]:rounded-[1rem] [&_a]:text-[#0084FF] mb-[1rem] [&_h3]:text-pc-tab-title [&_strong]:text-pc-sub14s *:text-black/[0.92] *:text-pc-14 *:font-medium *:xsm:text-mb-13 [&>p>span]:font-medium [&_ul]:content-ul [&_ol]:content-ol [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 marker:[&_ul_li]:text-[0.65rem] xsm:marker:[&_ul_li]:text-[0.5rem] [&_em]:not-italic [&_em]:text-[0.75rem] [&_em]:font-semibold [&_em]:tracking-[-0.015rem] [&_em]:text-[#8F8F8F]'
                      dangerouslySetInnerHTML={{
                        __html: item?.stock || '',
                      }}
                    ></div>
                  )}
                </div>
              </Fragment>
            ),
          )}
        {dataInformation?.note_page_huong_dan && (
          <div className='flex flex-col sm:space-x-[1rem] xsm:space-y-[1rem] p-[1rem] rounded-[1.25rem] bg-white'>
            <p className='xsm:text-pc-sub14s mb-[0.75rem] xsm:!font-bold text-black font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
              Lưu ý quan trọng
            </p>
            <div
              className='[&_img]:my-2 [&_img]:w-full [&_img]:h-auto [&_img]:rounded-[1rem] flex-1 [&_a]:text-[#0084FF] [&_h3]:text-pc-tab-title [&_h3]: [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]: [&_strong]:text-black *:text-[rgba(0,0,0,0.60)] *:text-pc-sub14s *:xsm:text-mb-13 *: [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)] xsm:marker:[&_ul_li]:text-[0.5rem]'
              dangerouslySetInnerHTML={{
                __html: dataInformation?.note_page_huong_dan || '',
              }}
            ></div>
          </div>
        )}
        {selectedImage && (
          <div
            className='fixed !mt-0 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in'
            onClick={() => setSelectedImage(null)}
          >
            <div
              onClick={(e) => {
                e.stopPropagation() // Ngăn việc click vào ảnh đóng popup
              }}
              className='relative xsm:overflow-x-auto overflow-hidden max-w-[100vw] sm:max-w-[80vw] max-h-[100vh] flex flex-col items-center animate-scale-in'
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
                        className='max-w-full h-auto object-contain transition-transform duration-300 rounded-[1rem]'
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
