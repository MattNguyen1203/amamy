'use client'
import useStore from '@/app/(store)/store'
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
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import ICAddress from '@/sections/tao-don/ICAddress'
import ICPhone from '@/sections/tao-don/ICPhone'
import ICTime from '@/sections/tao-don/ICTime'
import ICX from '@/sections/tao-don/ICX'
import PopupPaymentInfor from '@/sections/tao-don/PopupPaymentInfor'
import {
  ICreateOder,
  IInformationInstructOrder,
  IInformationInstructOrder_SelectBranch,
} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import Link from 'next/link'
import {useEffect, useRef, useState, useTransition} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'
import {z} from 'zod'
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
    setTransition(async () => {
      const currentDate = new Date()
      const formData = {
        ma_don: '',
        trang_thai_don_hang: '',

        tinh_thanh_nguoi_nhan:
          dataFromOrder?.recipientAddressType === 'registeredAddress' &&
          (type === 'ducvn' || type === 'nhatviet')
            ? dataFromOrder?.recipientCity
            : dataFromOrder?.recipientCity ?? '',
        ma_tinh_thanh_nguoi_nhan: dataFromOrder?.recipientCodeCity ?? '',
        quan_huyen_nguoi_nhan:
          dataFromOrder?.recipientAddressType === 'registeredAddress' &&
          (type === 'ducvn' || type === 'nhatviet')
            ? dataFromOrder?.district ?? ''
            : '',
        phuong_xa_nguoi_nhan:
          dataFromOrder?.recipientAddressType === 'registeredAddress' &&
          (type === 'ducvn' || type === 'nhatviet')
            ? dataFromOrder?.recipientWardsandcommunes ?? ''
            : '',
        so_nha_nguoi_nhan:
          type === 'vietduc' || type === 'viethan'
            ? dataFromOrder?.housingNumber ?? ''
            : '',
        ten_duong_nguoi_nhan:
          type === 'vietduc' || type === 'viethan'
            ? dataFromOrder?.roadName ?? ''
            : '',
        id_hoac_cmt:
          type === 'viethan' ? dataFromOrder?.passportNumber ?? '' : '',

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
        nation: european === 'vnEu' ? dataFromOrder?.nation : '',
        ma_khach_hang: dataFromOrder?.customercode ?? '',
        name_facebook: dataFromOrder?.nameFacebook ?? '',
        ma_buu_dien: type === 'vietnhat' ? dataFromOrder?.zipCode ?? '' : '',

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
            : dataFromOrder?.package ?? '',
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
    console.log(dataFromOrder)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <div className='space-y-[1.5rem] xsm:space-y-[0.75rem]'>
          <p className='text-[#33A6E8] text-pc-sub16b'>
            Hướng dẫn gửi hàng lên Amamy Post
          </p>
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
                      <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                        Chọn chi nhánh Amamy Post (*)
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl
                          className={cn(
                            '!shadow-none xsm:pointer-events-none aria-[invalid=true]:!border-[#F00] bg-white !mt-[0.37rem] p-[0.75rem_0.75rem_0.75rem_1rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] [&_svg]:filter [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:opacity-[1]',
                            data?.select_branch &&
                              data?.select_branch?.length < 2 &&
                              '[&_svg]:hidden',
                          )}
                        >
                          <SelectTrigger className='!shadow-none [&_.amamy-post]:hidden [&_.select-addres]:hidden [&_.select-time]:hidden [&_.select-phone]:hidden xsm:h-[2.5rem] h-[3rem] [&_span]:!text-black [&_span]:text-pc-sub14m [&_span]:xsm:text-mb-13M focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                            {!isMobile && (
                              <SelectValue placeholder='Chọn chi nhánh' />
                            )}
                            {isMobile && !selectBranchValue && (
                              <SelectValue placeholder='Chọn chi nhánh' />
                            )}
                            {isMobile && field.value && selectBranchValue && (
                              <div className='space-x-[0.75rem] flex items-center flex-1'>
                                <p className='text-black text-pc-sub14m '>
                                  {selectBranchValue}
                                </p>
                              </div>
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] bg-white'>
                          {Array.isArray(data?.select_branch) &&
                            data?.select_branch?.length > 0 &&
                            data?.select_branch?.map(
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
                      <FormMessage className='pl-[0.75rem] !text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
                    </FormItem>
                  )}
                />
              </div>
              {dataBranch && (
                <div className='!mt-[0.75rem] flex-1 space-y-[0.75rem] p-[1rem] bg-white rounded-[1.25rem]'>
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
          {data?.packing_instructions && (
            <div className='flex xsm:flex-col sm:space-x-[1rem] xsm:space-y-[1rem] p-[1rem] rounded-[1.25rem] bg-white'>
              <div
                className='[&_img]:my-2 [&_img]:w-full [&_img]:h-auto [&_img]:rounded-[1rem] flex-1 [&_a]:text-[#0084FF] [&_h3]:text-pc-tab-title [&_h3]: [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]: [&_strong]:text-black *:text-[rgba(0,0,0,0.60)] *:text-pc-sub14s *:xsm:text-mb-13 *: [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)] xsm:marker:[&_ul_li]:text-[0.5rem]'
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
                    className='rounded-[1rem] max-w-[18.75rem] xsm:max-w-full max-h-[12.5rem] xsm:max-h-[12.95831rem] object-contain'
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
                <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Chọn thông tin thanh toán (*)
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl
                    className={cn(
                      '!shadow-none xsm:pointer-events-none aria-[invalid=true]:!border-[#F00] bg-white !mt-[0.37rem] p-[0.75rem_0.75rem_0.75rem_1rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] [&_svg]:filter [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:opacity-[1]',
                      Array.isArray(paymentMethod) &&
                        paymentMethod?.length < 2 &&
                        '[&_svg]:hidden',
                    )}
                  >
                    <SelectTrigger className='!shadow-none xsm:h-[2.5rem] h-[3rem] [&_span]:!text-black [&_span]:text-pc-sub14m focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                      {!isMobile && (
                        <SelectValue placeholder='Chọn thông tin thanh toán' />
                      )}
                      {isMobile && !field.value && (
                        <SelectValue placeholder='Chọn thông tin thanh toán' />
                      )}
                      {isMobile && field.value && (
                        <div className='space-x-[0.75rem] flex items-center flex-1 w-full'>
                          <p className='text-black text-pc-sub14m text-start w-full line-clamp-1 '>
                            {selectPaymentInformationValue?.title ||
                              dataFromOrder?.recipientPaymentInformation ||
                              `Thanh toán bằng ${field.value}`}
                          </p>
                        </div>
                      )}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] bg-white'>
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
                            className='h-[3rem] rounded-[1.25rem] p-[0.75rem] bg-white flex items-center'
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

          <div className='space-x-[2rem] xsm:p-[1rem] xsm:bg-[#FAFAFA] xsm:space-x-[0.5rem] xsm:fixed xsm:bottom-0 xsm:z-[49] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0 flex items-center justify-between sm:w-full'>
            <div
              onClick={() => {
                setIndexTab(indexTab - 1)
                handleClickcurrentTab(prevStep)
              }}
              className='flex-1 cursor-pointer sm:p-[0.75rem_1.5rem] xsm:py-[0.75rem] flex-center rounded-[1.25rem] bg-[#D9F1FF]'
            >
              <p className='text-pc-sub16m text-black'>Quay lại</p>
            </div>
            <AlertDialog>
              {form.formState.isValid ? (
                <AlertDialogTrigger className='flex-1'>
                  <div
                    className={cn(
                      '!shadow-none flex-1 hover:bg-[#38B6FF] mt-[0rem] ml-auto h-[2.8125rem] flex-center p-[0.75rem_1.5rem] rounded-[1.25rem] bg-[#38B6FF]',
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
                    '!shadow-none flex-1 sm:p-[0.75rem_1.5rem] border-[rgba(255,255,255,0.80)] bg-[#F0F0F0] [&_p]:text-[rgba(0,0,0,0.30)] h-[2.8125rem] flex-center rounded-[1.25rem]',
                  )}
                >
                  <p className='text-white text-pc-sub16m'>Xác nhận</p>
                </button>
              )}
              <AlertDialogContent
                className={cn(
                  'gap-0 w-[21.4375rem] max-w-[21.4375rem] sm:w-[29.375rem] sm:max-w-[29.375rem] p-[2rem_1rem_1rem_1.25rem] xsm:p-[1.5rem_1rem_1rem_1rem] !rounded-[1.25rem] bg-white',
                  type === 'nhatviet' &&
                    'w-[21.4375rem] max-w-[21.4375rem] sm:w-[52.5rem] sm:max-w-[52.5rem]',
                )}
              >
                <div className='xsm:max-h-[28rem] xsm:overflow-auto xsm:overflow-y-auto '>
                  <ImageV2
                    alt=''
                    src={'/order/WarningCircle.svg'}
                    width={50 * 2}
                    height={50 * 2}
                    className='size-[2rem] sm:size-[2.5rem] mx-auto'
                  />
                  <AlertDialogTitle className='w-full text-center !mt-[1rem] !mb-[1.75rem] text-[1rem] sm:text-[1.25rem] font-bold leading-[1.2] tracking-[-0.04rem] sm:tracking-[-0.05rem] text-[#38B6FF] font-montserrat'>
                    Xác nhận đơn hàng & địa chỉ giao
                  </AlertDialogTitle>
                  <div className='xsm:px-[0.75rem] px-[1rem]'>
                    <div className='mb-[0.62rem] text-[0.875rem] sm:text-[1rem] font-semibold leading-[1.4] sm:leading-[1.62] tracking-[-0.035rem] sm:tracking-[-0.03rem] text-black font-montserrat'>
                      Thông tin nhận hàng
                    </div>
                    <div className='space-y-[0.25rem]'>
                      {dataFromOrder?.recipientName && (
                        <p className='capitalize text-[0.8125rem] sm:text-[0.875rem] font-medium text-[rgba(0,0,0,0.80)] leading-[1.5] tracking-[-0.02438rem] sm:tracking-[-0.02625rem] font-montserrat'>
                          <strong className='font-semibold sm:leading-[1.14]'>
                            Tên người nhận:{' '}
                          </strong>
                          <span>{dataFromOrder?.recipientName}</span>
                        </p>
                      )}
                      {dataFromOrder?.recipientAddress && (
                        <p className='capitalize text-[0.8125rem] sm:text-[0.875rem] font-medium text-[rgba(0,0,0,0.80)] leading-[1.5] tracking-[-0.02438rem] sm:tracking-[-0.02625rem] font-montserrat'>
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
                        <p className='capitalize text-[0.8125rem] sm:text-[0.875rem] font-medium text-[rgba(0,0,0,0.80)] leading-[1.5] tracking-[-0.02438rem] sm:tracking-[-0.02625rem] font-montserrat'>
                          <strong className='font-semibold sm:leading-[1.14]'>
                            Mã thông quan, ID hoặc CMT:{' '}
                          </strong>
                          <span>{dataFromOrder?.passportNumber}</span>
                        </p>
                      )}
                      {type === 'vietnhat' && (
                        <p className='capitalize text-[0.8125rem] sm:text-[0.875rem] font-medium text-[rgba(0,0,0,0.80)] leading-[1.5] tracking-[-0.02438rem] sm:tracking-[-0.02625rem] font-montserrat'>
                          <strong className='font-semibold sm:leading-[1.14]'>
                            Mã bưu điện:{' '}
                          </strong>
                          <span>{dataFromOrder?.zipCode}</span>
                        </p>
                      )}
                      {european === 'vnEu' && (
                        <p className='capitalize text-[0.8125rem] sm:text-[0.875rem] font-medium text-[rgba(0,0,0,0.80)] leading-[1.5] tracking-[-0.02438rem] sm:tracking-[-0.02625rem] font-montserrat'>
                          <strong className='font-semibold sm:leading-[1.14]'>
                            Quốc gia:{' '}
                          </strong>
                          <span>{dataFromOrder?.nation}</span>
                        </p>
                      )}
                      {dataFromOrder?.recipientPhone && (
                        <p className='capitalize text-[0.8125rem] sm:text-[0.875rem] font-medium text-[rgba(0,0,0,0.80)] leading-[1.5] tracking-[-0.02438rem] sm:tracking-[-0.02625rem] font-montserrat'>
                          <strong className='font-semibold sm:leading-[1.14]'>
                            Số điện thoại:{' '}
                          </strong>
                          <span>{dataFromOrder?.recipientPhone}</span>
                        </p>
                      )}
                      {dataFromOrder?.email && (
                        <p className='text-[0.8125rem] sm:text-[0.875rem] font-medium text-[rgba(0,0,0,0.80)] leading-[1.5] tracking-[-0.02438rem] sm:tracking-[-0.02625rem] font-montserrat'>
                          <strong className='font-semibold sm:leading-[1.14]'>
                            Email:{' '}
                          </strong>
                          <span>{dataFromOrder?.email}</span>
                        </p>
                      )}
                      <p className='capitalize text-[0.8125rem] sm:text-[0.875rem] font-medium text-[rgba(0,0,0,0.80)] leading-[1.5] tracking-[-0.02438rem] sm:tracking-[-0.02625rem] font-montserrat'>
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
                        <div className='mb-[0.75rem] text-black text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem] xsm:text-[0.875rem] xsm:leading-[1.4] xsm:tracking-[-0.035rem]'>
                          Lưu ý quan trọng về mã bưu điện nội địa Nhật
                        </div>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: importantNote || '',
                          }}
                          className='[&_img]:my-2 [&_img]:w-full [&_img]:h-auto [&_img]:rounded-[1rem] text-pc-sub14m text-[rgba(0,0,0,0.80)] flex-1 [&_a]:text-[#0084FF] [&_h3]:text-pc-tab-title [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]:text-black *:text-[rgba(0,0,0,0.90)] *:text-pc-sub14m *:xsm:text-mb-13 [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[#f00] xsm:marker:[&_ul_li]:text-[0.5rem]'
                        ></p>
                      </div>
                    )}
                    <div className='mt-[1.75rem] sm:mt-[1.25rem] mb-[1.5rem] sm:mb-[2rem] text-[#F00] text-[0.75rem] font-semibold leading-[1.4] sm:leading-[1.5] tracking-[-0.015rem] font-montserrat'>
                      *Sau khi xác nhận, bạn sẽ không thể chỉnh sửa đơn hàng.
                    </div>
                  </div>
                </div>
                <AlertDialogFooter
                  className={cn(
                    'flex xsm:flex-row !mt-0 space-x-[1rem] xsm:space-x-[0.75rem] xsm:space-y-0',
                    type === 'nhatviet' &&
                      'xsm:absolute xsm:bottom-0 xsm:left-0 xsm:right-0 xsm:bg-white xsm:px-[1rem] xsm:pb-[1rem] xsm:pt-[1.5rem] xsm:rounded-b-[1.25rem]',
                  )}
                >
                  <AlertDialogCancel className='!border-none !shadow-none xsm:p-0 xsm:mt-0 flex-1 text-black xsm:text-pc-sub16m flex-center rounded-[1.25rem] h-[2.625rem] bg-[#F0F0F0] hover:bg-[#38B6FF] transition-all duration-500 hover:text-white font-montserrat'>
                    Hủy
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleCreateOrder}
                    className='!border-none !shadow-none flex-1 xsm:p-0 xsm:text-pc-sub16m flex-center rounded-[1.25rem] h-[2.625rem] bg-[#38B6FF] hover:bg-[#38B6FF] transition-all duration-500 hover:text-white font-montserrat'
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
                        }}
                        className='absolute top-[0.5rem] right-[0.5rem]'
                      >
                        <ICX className='size-[1.5rem]' />
                      </div>
                    </div>
                    <div className='p-[1rem] bg-[#F6F6F6] space-y-[1rem] overflow-hidden overflow-y-auto max-h-[70vh] hidden_scroll'>
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
  )
}
