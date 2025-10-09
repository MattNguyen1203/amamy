'use client'

import {useEffect, useRef, useState, useTransition} from 'react'
import {useForm} from 'react-hook-form'
import useStore from '@/app/(store)/store'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import ICAddress from '@/sections/tao-don/ICAddress'
import ICPhone from '@/sections/tao-don/ICPhone'
import ICTime from '@/sections/tao-don/ICTime'
import ICX from '@/sections/tao-don/ICX'
import {
  ICreateOder,
  IInformationInstructOrder,
  IInformationInstructOrder_SelectBranch,
} from '@/sections/tao-don/oder.interface'
import PopupPaymentInfor from '@/sections/tao-don/PopupPaymentInfor'
import {zodResolver} from '@hookform/resolvers/zod'
import Link from 'next/link'
import {toast} from 'sonner'
import {z} from 'zod'
import {ICLoading} from '@/components/icon/ICLoading'
import ImageV2 from '@/components/image/ImageV2'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  branch: z
    .string({
      required_error: 'Vui lòng nhập thông tin tên đường',
    })
    .min(1, 'Vui lòng nhập thông tin tên đường'),
  recipientPaymentInformation: z
    .string({
      required_error: 'Vui lòng nhập thông tin thanh toán',
    })
    .min(1, 'Vui lòng nhập thông tin thanh toán'),
})
export default function Instruct({
  data,
  handleClickcurrentTab,
  dataFromOrder,
  setSubmitting,
  setDataFromOrder,
  type,
  importantNote,
  prevStep,
  setDataInformation,
  paymentMethod,
  setIndexTab,
  indexTab,
  european,
  setSelectedImage,
  nation,
}: {
  data?: IInformationInstructOrder
  handleClickcurrentTab: (nextTab: string) => void
  dataFromOrder?: IDataFromOrder
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  type?: string
  importantNote?: string
  prevStep: string
  setDataInformation: React.Dispatch<
    React.SetStateAction<ICreateOder | undefined>
  >
  paymentMethod?: {
    value: string
    title: string
  }[]
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
  european?: string
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
  nation?: string
}) {
  const isMobile = useIsMobile()
  const {setStepOrder} = useStore((state) => state)
  const [isPending, setTransition] = useTransition()
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [selectPaymentInformation, setSelectPaymentInformation] =
    useState<boolean>(false)
  const [selectPaymentInformationValue, setSelectPaymentInformationValue] =
    useState<{value: string; title: string}>({value: '', title: ''})
  const [selectBranch, setSelectBranch] = useState<boolean>(false)
  const [dataBranch, setDataBranch] =
    useState<IInformationInstructOrder_SelectBranch | null>(null)
  const [selectBranchValue, setSelectBranchValue] = useState<string>()
  const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'})
  useEffect(() => {
    if (triggerScroll) {
      scrollToTop()
      setTriggerScroll(false)
    }
  }, [triggerScroll])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      branch:
        dataFromOrder?.branch ??
        data?.select_branch?.[0]?.title ??
        'chưa có thông tin',
      recipientPaymentInformation:
        dataFromOrder?.recipientPaymentInformation ?? paymentMethod?.[0]?.value,
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
    if (
      (form?.getValues('branch') || dataFromOrder?.branch) &&
      Array.isArray(data?.select_branch)
    ) {
      const foundItem = data?.select_branch?.find(
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
  }, [form?.getValues('branch'), dataFromOrder?.branch])
  useEffect(() => {
    if (selectBranch || selectPaymentInformation) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [selectBranch, selectPaymentInformation])
  function handleCreateOrder() {
    const sanitize = (val: string) => (val && val !== 'un' ? val : '')
    setTransition(async () => {
      const currentDate = new Date()
      const formData = {
        ma_don: '',
        trang_thai_don_hang: '',

        tinh_thanh_nguoi_nhan: sanitize(dataFromOrder?.recipientCity),
        ma_tinh_thanh_nguoi_nhan: sanitize(dataFromOrder?.recipientCodeCity),
        quan_huyen_nguoi_nhan:
          dataFromOrder?.recipientAddressType === 'registeredAddress' &&
          (type === 'ducvn' || type === 'nhatviet')
            ? sanitize(dataFromOrder?.district)
            : '',
        phuong_xa_nguoi_nhan:
          dataFromOrder?.recipientAddressType === 'registeredAddress' &&
          (type === 'ducvn' || type === 'nhatviet')
            ? sanitize(dataFromOrder?.recipientWardsandcommunes)
            : '',
        so_nha_nguoi_nhan:
          type === 'vietduc' || type === 'viethan'
            ? (sanitize(dataFromOrder?.housingNumber) ?? '')
            : '',
        ten_duong_nguoi_nhan:
          type === 'vietduc' || type === 'viethan'
            ? (sanitize(dataFromOrder?.roadName) ?? '')
            : '',
        id_hoac_cmt:
          type === 'viethan' ? (dataFromOrder?.passportNumber ?? '') : '',

        nguoi_gui_lien_he: dataFromOrder?.whereToContact ?? '',
        ten_nguoi_gui: dataFromOrder?.name ?? '',
        ten_nguoi_nhan: dataFromOrder?.recipientName ?? '',
        dia_chi_nguoi_gui: '',
        dia_chi_nguoi_nhan: dataFromOrder?.recipientAddress ?? '',

        tien_trinh_giao_hang: '',
        text_tracking_thu_ba: '',
        link_tracking_thu_ba: '',
        ma_van_don_thu_ba: '',
        user: dataFromOrder?.email,
        gia_don_hang: '',
        khoi_luong_don_hang: '',
        loai_tien_te: form?.getValues('recipientPaymentInformation') ?? 'VND',
        date: currentDate.toISOString().slice(0, 10),
        sdt: dataFromOrder?.recipientPhone ?? '',
        dia_chi_nguoi_nhan_chi_tiet: dataFromOrder?.recipientAddress ?? '',
        chieu_van_don: dataFromOrder?.shipping,
        expected_date: '',
        nation: european === 'vnEu' ? dataFromOrder?.nation : (nation ?? ''),
        ma_khach_hang: dataFromOrder?.customercode ?? '',
        name_facebook: dataFromOrder?.nameFacebook ?? '',
        ma_buu_dien: type === 'vietnhat' ? (dataFromOrder?.zipCode ?? '') : '',

        // data branch
        brand_title: dataBranch?.title ?? '',
        brand_address: dataBranch?.address ?? '',
        brand_time: dataBranch?.time ?? '',
        brand_phone: dataBranch?.phone ?? '',

        loai_thoi_gian_giao:
          Object.values(dataFromOrder?.userChoices || {})[0] ?? '',
        lua_chon_giao_hang:
          Object.values(dataFromOrder?.userChoices || {})[1] ?? '',
        loai_bao_hiem: dataFromOrder?.typeofinsurance ?? '',
        loai_dong_goi:
          dataFromOrder?.package === 'note'
            ? dataFromOrder?.packageMessage
            : (dataFromOrder?.package ?? ''),
        yeu_cau_them: dataFromOrder?.packageMessage ?? '',
      }
      if (formData) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ORDER}v1/add`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData, null, 2),
            },
          )
          if (response?.ok) {
            setIndexTab(0)
            setDataFromOrder({})
            setSubmitting(true)
            setStepOrder(1)
            handleClickcurrentTab('1')
            setTriggerScroll(true)
            setDataInformation(undefined)
          } else {
            toast.error('Có lỗi xảy ra')
          }
        } catch {
          toast.error('Có lỗi xảy ra')
        }
      }
    })
  }
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('🚀 ~ onSubmit values:', values)
    // console.log(dataFromOrder)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <div className='space-y-[1.5rem] xsm:space-y-[0.75rem]'>
          {!isMobile && (
            <p className='text-[#33A6E8] text-pc-sub16b'>
              Hướng dẫn gửi hàng lên Amamy Post
            </p>
          )}
          {data?.select_branch && (
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
                        }
                      }}
                      className={cn(
                        'flex-1 space-y-0',
                        Array.isArray(data?.select_branch) &&
                          data?.select_branch?.length < 2 &&
                          'pointer-events-none',
                      )}
                    >
                      <FormLabel className='pl-[1rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                        Chọn chi nhánh Amamy Post (*)
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl
                          className={cn(
                            '!mt-[0.37rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[0.75rem_0.75rem_0.75rem_1rem] !shadow-none aria-[invalid=true]:!border-[#F00] xsm:pointer-events-none [&_svg]:opacity-[1] [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:filter',
                            data?.select_branch &&
                              data?.select_branch?.length < 2 &&
                              '[&_svg]:hidden',
                          )}
                        >
                          <SelectTrigger className='h-[3rem] pl-[1rem] !shadow-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xsm:h-[2.5rem] [&_.amamy-post]:hidden [&_.select-addres]:hidden [&_.select-phone]:hidden [&_.select-time]:hidden [&_span]:!text-black [&_span]:text-pc-sub14m [&_span]:xsm:text-mb-13M'>
                            {!isMobile && (
                              <SelectValue placeholder='Chọn chi nhánh' />
                            )}
                            {isMobile && !selectBranchValue && (
                              <SelectValue placeholder='Chọn chi nhánh' />
                            )}
                            {isMobile && field.value && selectBranchValue && (
                              <div className='flex flex-1 items-center space-x-[0.75rem]'>
                                <p className='text-black text-pc-sub14m'>
                                  {selectBranchValue}
                                </p>
                              </div>
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)]'>
                          {Array.isArray(data?.select_branch) &&
                            data?.select_branch?.length > 0 &&
                            data?.select_branch?.map(
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
                                        className='text-black text-pc-sub14m'
                                      ></p>
                                    </div>
                                    <div className='select-time flex items-start space-x-[0.5rem]'>
                                      <ICTime className='size-[1.5rem]' />
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: item?.time,
                                        }}
                                        className='text-black text-pc-sub14m'
                                      ></p>
                                    </div>
                                    <div className='select-phone flex items-start space-x-[0.5rem]'>
                                      <ICPhone className='size-[1.5rem]' />
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: item?.phone,
                                        }}
                                        className='text-black text-pc-sub14m'
                                      ></p>
                                    </div>
                                  </div>
                                </SelectItem>
                              ),
                            )}
                        </SelectContent>
                      </Select>
                      <FormMessage className='pl-[0.75rem] !text-[#F00] text-pc-sub12m xsm:mt-[0.25rem] xsm:text-mb-sub10m' />
                    </FormItem>
                  )}
                />
              </div>
              {dataBranch && (
                <div className='!mt-[0.75rem] flex-1 space-y-[0.75rem] rounded-[1.25rem] bg-white p-[1rem]'>
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
                        className='flex-1 text-black text-pc-sub14m'
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
                        className='flex-1 text-black text-pc-sub14m'
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
                        className='flex-1 text-black text-pc-sub14m'
                      ></p>
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
          {data?.packing_instructions && (
            <div className='flex rounded-[1.25rem] bg-white p-[1rem] sm:space-x-[1rem] xsm:flex-col xsm:space-y-[1rem]'>
              <div
                className='[&_h3]: [&_strong]: *: [&_ul]:content-ul flex-1 *:text-[rgba(0,0,0,0.60)] *:text-pc-sub14s *:xsm:text-mb-13 [&_a]:text-[#0084FF] [&_h3]:text-black [&_h3]:text-pc-tab-title [&_img]:my-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[1rem] [&_strong]:text-black [&_strong]:text-pc-sub14s [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)] xsm:marker:[&_ul_li]:text-[0.5rem]'
                dangerouslySetInnerHTML={{
                  __html: data?.packing_instructions || '',
                }}
              ></div>
              {data?.images && (
                <div
                  ref={(el) => {
                    containerRefs.current[0] = el
                  }}
                >
                  <ImageV2
                    src={data?.images}
                    alt=''
                    width={300 * 2}
                    height={200 * 2}
                    className='max-h-[12.5rem] max-w-[18.75rem] rounded-[1rem] object-contain xsm:max-h-[12.95831rem] xsm:max-w-full'
                  />
                </div>
              )}
            </div>
          )}
          <FormField
            control={form.control}
            name='recipientPaymentInformation'
            render={({field}) => (
              <FormItem
                onClick={() => {
                  if (isMobile) {
                    setSelectPaymentInformation(true)
                  }
                }}
                className={cn(
                  'flex-1 space-y-0',
                  Array.isArray(paymentMethod) &&
                    paymentMethod?.length < 2 &&
                    'pointer-events-none',
                )}
              >
                <FormLabel className='pl-[1rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Chọn thông tin thanh toán (*)
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl
                    className={cn(
                      '!mt-[0.37rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[0.75rem_0.75rem_0.75rem_1rem] !shadow-none aria-[invalid=true]:!border-[#F00] xsm:pointer-events-none [&_svg]:opacity-[1] [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:filter',
                      Array.isArray(paymentMethod) &&
                        paymentMethod?.length < 2 &&
                        '[&_svg]:hidden',
                    )}
                  >
                    <SelectTrigger className='h-[3rem] !shadow-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xsm:h-[2.5rem] [&_span]:!text-black [&_span]:text-pc-sub14m'>
                      {!isMobile && (
                        <SelectValue placeholder='Chọn thông tin thanh toán' />
                      )}
                      {isMobile && !field.value && (
                        <SelectValue placeholder='Chọn thông tin thanh toán' />
                      )}
                      {isMobile && field.value && (
                        <div className='flex w-full flex-1 items-center space-x-[0.75rem]'>
                          <p className='line-clamp-1 w-full text-start text-black text-pc-sub14m'>
                            {selectPaymentInformationValue?.title ||
                              dataFromOrder?.recipientPaymentInformation ||
                              `Thanh toán bằng ${field.value}`}
                          </p>
                        </div>
                      )}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)]'>
                    {Array.isArray(paymentMethod) &&
                      paymentMethod?.map(
                        (
                          item: {
                            value: string
                            title: string
                          },
                          index: number,
                        ) => (
                          <SelectItem
                            key={index}
                            className='flex h-[3rem] items-center rounded-[1.25rem] bg-white p-[0.75rem]'
                            value={item?.value ?? item?.title}
                          >
                            <p className='text-black text-pc-sub14m'>
                              {item?.title}
                            </p>
                          </SelectItem>
                        ),
                      )}
                  </SelectContent>
                </Select>
                <FormMessage className='pl-[0.75rem] !text-[#F00] text-pc-sub12m' />
              </FormItem>
            )}
          />

          <div className='flex items-center justify-between space-x-[1.25rem] sm:w-full xsm:fixed xsm:bottom-0 xsm:left-0 xsm:right-0 xsm:z-[49] xsm:space-x-[0.5rem] xsm:bg-[#FAFAFA] xsm:p-[1rem] disabled:xsm:opacity-[1]'>
            <div
              onClick={() => {
                setIndexTab(indexTab - 1)
                handleClickcurrentTab(prevStep)
              }}
              className='flex-1 cursor-pointer rounded-[1.25rem] bg-[#D9F1FF] flex-center sm:p-[0.75rem_1.5rem] xsm:py-[0.75rem]'
            >
              <p className='text-black text-pc-sub16m'>Quay lại</p>
            </div>
            <AlertDialog>
              {form.formState.isValid ? (
                <AlertDialogTrigger className='flex-1'>
                  <div
                    className={cn(
                      'ml-auto mt-[0rem] h-[2.8125rem] flex-1 rounded-[1.25rem] bg-[#38B6FF] p-[0.75rem_1.5rem] !shadow-none flex-center hover:bg-[#38B6FF]',
                    )}
                  >
                    {isPending ? (
                      <ICLoading />
                    ) : (
                      <p className='text-white text-pc-sub16m'>Xác nhận</p>
                    )}
                  </div>
                </AlertDialogTrigger>
              ) : (
                <button
                  type='submit'
                  disabled={!form.formState.isValid}
                  className={cn(
                    'h-[2.8125rem] flex-1 rounded-[1.25rem] border-[rgba(255,255,255,0.80)] bg-[#F0F0F0] !shadow-none flex-center sm:p-[0.75rem_1.5rem] [&_p]:text-[rgba(0,0,0,0.30)]',
                  )}
                >
                  <p className='text-white text-pc-sub16m'>Xác nhận</p>
                </button>
              )}
              <AlertDialogContent
                className={cn(
                  'w-[21.4375rem] max-w-[21.4375rem] gap-0 !rounded-[1.25rem] bg-white p-[2rem_1rem_1rem_1.25rem] sm:w-[29.375rem] sm:max-w-[29.375rem] xsm:p-[1.5rem_1rem_1rem_1rem]',
                  type === 'nhatviet' &&
                    'w-[21.4375rem] max-w-[21.4375rem] sm:w-[52.5rem] sm:max-w-[52.5rem]',
                )}
              >
                <div className='max-h-[60vh] overflow-hidden overflow-y-auto xsm:max-h-[28rem]'>
                  <ImageV2
                    alt=''
                    src={'/order/WarningCircle.svg'}
                    width={50 * 2}
                    height={50 * 2}
                    className='mx-auto size-[2rem] sm:size-[2.5rem]'
                  />
                  <AlertDialogTitle className='!mb-[1.75rem] !mt-[1rem] w-full text-center font-montserrat text-[1rem] font-bold leading-[1.2] tracking-[-0.04rem] text-[#38B6FF] sm:text-[1.25rem] sm:tracking-[-0.05rem]'>
                    Xác nhận đơn hàng & địa chỉ giao
                  </AlertDialogTitle>
                  <div className='px-[1rem] xsm:px-[0.75rem]'>
                    <div className='mb-[0.62rem] font-montserrat text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.035rem] text-black sm:text-[1rem] sm:leading-[1.62] sm:tracking-[-0.03rem]'>
                      Thông tin nhận hàng
                    </div>
                    <div className='space-y-[0.25rem]'>
                      {dataFromOrder?.recipientName && (
                        <p className='font-montserrat text-[0.8125rem] font-medium capitalize leading-[1.5] tracking-[-0.02438rem] text-[rgba(0,0,0,0.80)] sm:text-[0.875rem] sm:tracking-[-0.02625rem]'>
                          <strong className='font-semibold sm:leading-[1.14]'>
                            Tên người nhận:{' '}
                          </strong>
                          <span>{dataFromOrder?.recipientName}</span>
                        </p>
                      )}
                      {dataFromOrder?.recipientAddress && (
                        <p className='font-montserrat text-[0.8125rem] font-medium capitalize leading-[1.5] tracking-[-0.02438rem] text-[rgba(0,0,0,0.80)] sm:text-[0.875rem] sm:tracking-[-0.02625rem]'>
                          <strong className='font-semibold sm:leading-[1.14]'>
                            Địa chỉ chi tiết:{' '}
                          </strong>
                          <span>
                            {dataFromOrder?.recipientAddress}
                            {(type === 'ducvn' || type === 'nhatviet') &&
                              dataFromOrder?.recipientAddressType ===
                                'registeredAddress' &&
                              ' - ' +
                                dataFromOrder?.recipientWardsandcommunes +
                                ' - ' +
                                dataFromOrder?.district +
                                ' - ' +
                                dataFromOrder?.recipientCity}
                            {(type === 'vietduc' || type === 'viethan') &&
                              ' - ' +
                                dataFromOrder?.housingNumber +
                                ' - ' +
                                dataFromOrder?.roadName +
                                ' - ' +
                                dataFromOrder?.recipientCity}
                          </span>
                        </p>
                      )}
                      {/* {dataFromOrder?.recipientAddressType ===
                        'registeredAddress' &&
                        (type === 'ducvn' || type === 'nhatviet') && (
                          <p className='capitalize text-[0.8125rem] sm:text-[0.875rem] font-medium text-[rgba(0,0,0,0.80)] leading-[1.5] tracking-[-0.02438rem] sm:tracking-[-0.02625rem] font-montserrat'>
                            <strong className='font-semibold sm:leading-[1.14]'>
                              Địa chỉ:{' '}
                            </strong>
                            <span>
                              {dataFromOrder?.recipientWardsandcommunes} -{' '}
                              {dataFromOrder?.district} -{' '}
                              {dataFromOrder?.recipientCity}
                            </span>
                          </p>
                        )}
                      {(type === 'vietduc' || type === 'viethan') && (
                        <p className='capitalize text-[0.8125rem] sm:text-[0.875rem] font-medium text-[rgba(0,0,0,0.80)] leading-[1.5] tracking-[-0.02438rem] sm:tracking-[-0.02625rem] font-montserrat'>
                          <strong className='font-semibold sm:leading-[1.14]'>
                            Địa chỉ:{' '}
                          </strong>
                          <span>
                            {dataFromOrder?.housingNumber} -{' '}
                            {dataFromOrder?.roadName} -{' '}
                            {dataFromOrder?.recipientCity}{' '}
                            {dataFromOrder?.recipientCodeCity &&
                              '- ' + dataFromOrder?.recipientCodeCity}
                          </span>
                        </p>
                      )} */}
                      {type === 'viethan' && (
                        <p className='font-montserrat text-[0.8125rem] font-medium capitalize leading-[1.5] tracking-[-0.02438rem] text-[rgba(0,0,0,0.80)] sm:text-[0.875rem] sm:tracking-[-0.02625rem]'>
                          <strong className='font-semibold sm:leading-[1.14]'>
                            Mã thông quan, ID hoặc CMT:{' '}
                          </strong>
                          <span>{dataFromOrder?.passportNumber}</span>
                        </p>
                      )}
                      {type === 'vietnhat' && (
                        <p className='font-montserrat text-[0.8125rem] font-medium capitalize leading-[1.5] tracking-[-0.02438rem] text-[rgba(0,0,0,0.80)] sm:text-[0.875rem] sm:tracking-[-0.02625rem]'>
                          <strong className='font-semibold sm:leading-[1.14]'>
                            Mã bưu điện:{' '}
                          </strong>
                          <span>{dataFromOrder?.zipCode}</span>
                        </p>
                      )}
                      {european === 'vnEu' && (
                        <p className='font-montserrat text-[0.8125rem] font-medium capitalize leading-[1.5] tracking-[-0.02438rem] text-[rgba(0,0,0,0.80)] sm:text-[0.875rem] sm:tracking-[-0.02625rem]'>
                          <strong className='font-semibold sm:leading-[1.14]'>
                            Quốc gia:{' '}
                          </strong>
                          <span>{dataFromOrder?.nation}</span>
                        </p>
                      )}
                      {dataFromOrder?.recipientPhone && (
                        <p className='font-montserrat text-[0.8125rem] font-medium capitalize leading-[1.5] tracking-[-0.02438rem] text-[rgba(0,0,0,0.80)] sm:text-[0.875rem] sm:tracking-[-0.02625rem]'>
                          <strong className='font-semibold sm:leading-[1.14]'>
                            Số điện thoại:{' '}
                          </strong>
                          <span>{dataFromOrder?.recipientPhone}</span>
                        </p>
                      )}
                      {dataFromOrder?.email && (
                        <p className='font-montserrat text-[0.8125rem] font-medium leading-[1.5] tracking-[-0.02438rem] text-[rgba(0,0,0,0.80)] sm:text-[0.875rem] sm:tracking-[-0.02625rem]'>
                          <strong className='font-semibold sm:leading-[1.14]'>
                            Email:{' '}
                          </strong>
                          <span>{dataFromOrder?.email}</span>
                        </p>
                      )}
                      <p className='font-montserrat text-[0.8125rem] font-medium capitalize leading-[1.5] tracking-[-0.02438rem] text-[rgba(0,0,0,0.80)] sm:text-[0.875rem] sm:tracking-[-0.02625rem]'>
                        <strong className='font-semibold sm:leading-[1.14]'>
                          Loại tiền tệ thanh toán:{' '}
                        </strong>
                        <span>
                          {form?.getValues('recipientPaymentInformation')}
                        </span>
                      </p>
                    </div>
                    {type === 'nhatviet' && (
                      <div className='mt-[1.75rem]'>
                        <div className='mb-[0.75rem] text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem] text-black xsm:text-[0.875rem] xsm:leading-[1.4] xsm:tracking-[-0.035rem]'>
                          Lưu ý quan trọng về mã bưu điện nội địa Nhật
                        </div>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: importantNote || '',
                          }}
                          className='[&_ul]:content-ul flex-1 text-[rgba(0,0,0,0.80)] text-pc-sub14m *:text-[rgba(0,0,0,0.90)] *:text-pc-sub14m *:xsm:text-mb-13 [&_a]:text-[#0084FF] [&_h3]:text-black [&_h3]:text-pc-tab-title [&_img]:my-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[1rem] [&_strong]:text-black [&_strong]:text-pc-sub14s [&_ul]:!my-0 marker:[&_ul_li]:text-[#f00] xsm:marker:[&_ul_li]:text-[0.5rem]'
                        ></p>
                      </div>
                    )}
                    <div className='mb-[1.5rem] mt-[1.75rem] font-montserrat text-[0.75rem] font-semibold leading-[1.4] tracking-[-0.015rem] text-[#F00] sm:mb-[2rem] sm:mt-[1.25rem] sm:leading-[1.5]'>
                      *Sau khi xác nhận, bạn sẽ không thể chỉnh sửa đơn hàng.
                    </div>
                  </div>
                </div>
                <AlertDialogFooter
                  className={cn(
                    '!mt-0 flex space-x-[1rem] xsm:flex-row xsm:space-x-[0.75rem] xsm:space-y-0',
                    type === 'nhatviet' &&
                      'xsm:absolute xsm:bottom-0 xsm:left-0 xsm:right-0 xsm:rounded-b-[1.25rem] xsm:bg-white xsm:px-[1rem] xsm:pb-[1rem] xsm:pt-[1.5rem]',
                  )}
                >
                  <AlertDialogCancel className='h-[2.625rem] flex-1 rounded-[1.25rem] !border-none bg-[#F0F0F0] font-montserrat text-black !shadow-none transition-all duration-500 flex-center hover:bg-[#38B6FF] hover:text-white xsm:mt-0 xsm:p-0 xsm:text-pc-sub16m'>
                    Hủy
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleCreateOrder}
                    className='h-[2.625rem] flex-1 rounded-[1.25rem] !border-none bg-[#38B6FF] font-montserrat !shadow-none transition-all duration-500 flex-center hover:bg-[#38B6FF] hover:text-white xsm:p-0 xsm:text-pc-sub16m'
                  >
                    Xác nhận
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        {isMobile && (
          <>
            <PopupPaymentInfor
              form={form}
              selectPaymentInformation={selectPaymentInformation}
              setSelectPaymentInformation={setSelectPaymentInformation}
              setSelectPaymentInformationValue={
                setSelectPaymentInformationValue
              }
              paymentMethod={paymentMethod}
            />
            {Array.isArray(data?.select_branch) &&
              data?.select_branch &&
              data?.select_branch?.length > 1 && (
                <>
                  <div
                    onClick={() => {
                      setSelectBranch(false)
                    }}
                    className={cn(
                      'pointer-events-none invisible fixed inset-0 z-[51] !mt-0 bg-black/0 transition-all duration-700 ease-in-out',
                      selectBranch && 'pointer-events-auto visible bg-black/50',
                    )}
                  ></div>
                  <div
                    className={cn(
                      'fixed bottom-0 left-0 z-[52] w-full translate-y-full rounded-t-[1.25rem] bg-[#F6F6F6] pb-[2rem] shadow-lg transition-all duration-700',
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
                        }}
                        className='absolute right-[0.5rem] top-[0.5rem]'
                      >
                        <ICX className='size-[1.5rem]' />
                      </div>
                    </div>
                    <div className='hidden_scroll max-h-[70vh] space-y-[1rem] overflow-hidden overflow-y-auto bg-[#F6F6F6] p-[1rem]'>
                      {Array.isArray(data?.select_branch) &&
                        data?.select_branch?.map(
                          (
                            item: IInformationInstructOrder_SelectBranch,
                            index: number,
                          ) => (
                            <div
                              key={index}
                              onClick={() => {
                                form.setValue('branch', String(item?.title), {
                                  shouldValidate: true, // Kích hoạt validate ngay sau khi set value
                                })
                                setSelectBranchValue(item?.title)
                                setSelectBranch(false)
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
                                    className='flex-1 text-black text-pc-sub14m xsm:text-[rgba(0,0,0,0.80)] xsm:text-mb-13M'
                                  ></p>
                                </div>
                                <div className='select-time flex items-start space-x-[0.5rem]'>
                                  <ICTime className='size-[1.5rem] xsm:size-[1.125rem]' />
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: item?.time,
                                    }}
                                    className='flex-1 text-black text-pc-sub14m xsm:text-[rgba(0,0,0,0.80)] xsm:text-mb-13M'
                                  ></p>
                                </div>
                                <div className='select-phone flex items-start space-x-[0.5rem]'>
                                  <ICPhone className='size-[1.5rem] xsm:size-[1.125rem]' />
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: item?.phone,
                                    }}
                                    className='flex-1 text-black text-pc-sub14m xsm:text-[rgba(0,0,0,0.80)] xsm:text-mb-13M'
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
  )
}
