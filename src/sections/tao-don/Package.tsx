'use client'

import {useEffect, useMemo, useState, useTransition} from 'react'
import {useForm} from 'react-hook-form'
import useStore from '@/app/(store)/store'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import {ICreateOder, IInformationOrder} from '@/sections/tao-don/oder.interface'
import PopupPaymentInfor from '@/sections/tao-don/PopupPaymentInfor'
import {zodResolver} from '@hookform/resolvers/zod'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ICStar from '@/components/icon/ICStar'

export default function Package({
  data,
  handleClickcurrentTab,
  setIndexTab,
  indexTab,
  setDataFromOrder,
  dataFromOrder,
  stepEnd = false,
  type,
  european,
  setSubmitting,
  setDataInformation,
  importantNote,
  paymentMethod,
  nation,
}: {
  data: IInformationOrder['package']
  handleClickcurrentTab: (nextTab: string) => void
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  dataFromOrder: IDataFromOrder
  stepEnd?: boolean
  type?: string
  european?: string
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  setDataInformation: React.Dispatch<
    React.SetStateAction<ICreateOder | undefined>
  >
  importantNote?: string
  paymentMethod?: {
    value: string
    title: string
  }[]
  nation?: string
}) {
  const isMobile = useIsMobile()
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const [isPending, setTransition] = useTransition()
  const FormSchema = z.object({
    package: z.string().min(1, 'Vui lòng chọn loại bảo hiểm'),
    packageMessage: z.string().min(0, 'Vui lòng nhập nội dung'),
    recipientPaymentInformation: z.string({
      required_error: 'Vui lòng nhập thông tin thanh toán',
    }),
  })
  const [selectPaymentInformation, setSelectPaymentInformation] =
    useState<boolean>(false)
  const [selectPaymentInformationValue, setSelectPaymentInformationValue] =
    useState<{value: string; title: string}>({value: '', title: ''})

  const isVietSec = useMemo(
    () =>
      dataFromOrder?.recipientAddressType === 'registeredAddress' &&
      dataFromOrder?.shipping === '1073',
    [dataFromOrder?.recipientAddressType, dataFromOrder?.shipping],
  )
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      package: data?.list_package
        ? (dataFromOrder?.package ?? '')
        : 'Chưa có thông tin',
      packageMessage: dataFromOrder?.packageMessage ?? '',
      recipientPaymentInformation:
        dataFromOrder?.recipientPaymentInformation ?? paymentMethod?.[0]?.value,
    },
  })
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'})
  useEffect(() => {
    if (triggerScroll) {
      scrollToTop()
      setTriggerScroll(false)
    }
  }, [triggerScroll])
  useEffect(() => {
    if (selectPaymentInformation) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [selectPaymentInformation])
  function handleCreateOrder() {
    const sanitize = (val: string) => (val && val !== 'un' ? val : '')
    setTransition(async () => {
      const currentDate = new Date()
      const formData = {
        ma_don: '',
        trang_thai_don_hang: '',

        tinh_thanh_nguoi_nhan: sanitize(dataFromOrder?.recipientCity),
        ma_tinh_thanh_nguoi_nhan: sanitize(dataFromOrder?.recipientCodeCity),
        quan_huyen_nguoi_nhan: isVietSec
          ? ''
          : dataFromOrder?.recipientAddressType === 'registeredAddress' &&
              (type === 'ducvn' || type === 'nhatviet')
            ? sanitize(dataFromOrder?.district)
            : '',
        phuong_xa_nguoi_nhan: isVietSec
          ? ''
          : dataFromOrder?.recipientAddressType === 'registeredAddress' &&
              (type === 'ducvn' || type === 'nhatviet')
            ? sanitize(dataFromOrder?.recipientWardsandcommunes)
            : '',
        so_nha_nguoi_nhan: isVietSec
          ? dataFromOrder?.housingNumber
          : type === 'vietduc' || type === 'viethan'
            ? sanitize(dataFromOrder?.housingNumber)
            : '',
        ten_duong_nguoi_nhan: isVietSec
          ? dataFromOrder?.roadName
          : type === 'vietduc' || type === 'viethan'
            ? sanitize(dataFromOrder?.roadName)
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
        brand_title: '',
        brand_address: '',
        brand_time: '',
        brand_phone: '',

        loai_thoi_gian_giao:
          Object.values(dataFromOrder?.userChoices || {})[0] ?? '',
        lua_chon_giao_hang:
          Object.values(dataFromOrder?.userChoices || {})[1] ?? '',
        loai_bao_hiem: dataFromOrder?.typeofinsurance ?? '',
        loai_dong_goi:
          form?.getValues('package') === 'note'
            ? form?.getValues('packageMessage')
            : (form?.getValues('package') ?? ''),
        yeu_cau_them: form?.getValues('packageMessage') ?? '',
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

  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (values) {
      if (stepOrder < 7) {
        setStepOrder(7)
      }
      setDataFromOrder({
        ...dataFromOrder,
        package: values.package,
        packageMessage: values.packageMessage,
      })
      handleClickcurrentTab('7')
      setTriggerScroll(true)
      setIndexTab(indexTab + 1)
    }
  }

  return (
    <Form {...form}>
      <form
        className='space-y-[1.75rem] xsm:space-y-[1.25rem]'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {data?.list_package && (
          <>
            <div className='rounded-[2.25rem] bg-white p-[1.5rem] shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)] xsm:rounded-[2rem] xsm:p-[1rem]'>
              <div className='mb-[1rem]'>
                <p className='mb-[0.38rem] font-montserrat text-[1rem] font-semibold leading-[1.625rem] tracking-[-0.03rem] text-[rgba(0,0,0,0.92)] xsm:text-[0.875rem] xsm:leading-[1.225rem] xsm:tracking-[-0.035rem]'>
                  {data?.title || 'Chọn cách đóng gói'}
                </p>
                <div
                  className='xsm:-[-0.0225rem] text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.80)] xsm:text-[0.75rem] xsm:leading-[1.05rem]'
                  dangerouslySetInnerHTML={{__html: data?.note_more ?? ''}}
                ></div>
              </div>

              <div className='flex flex-col space-y-[0.75rem] xsm:space-y-[0.5rem]'>
                {Array.isArray(data?.list_package) &&
                  data?.list_package?.map((packageItem, packageIndex) => (
                    <FormField
                      key={packageIndex}
                      control={form.control}
                      name='package'
                      render={({field}) => {
                        const value = packageItem?.separate_request
                          ? 'note'
                          : packageItem?.label
                        const isChecked = field.value === value

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
                                  field.value ===
                                  (packageItem?.separate_request
                                    ? 'note'
                                    : packageItem?.label)
                                }
                                onCheckedChange={(checked) => {
                                  field.onChange(
                                    checked
                                      ? packageItem?.separate_request
                                        ? 'note'
                                        : packageItem?.label
                                      : undefined,
                                  )
                                }}
                              />
                            </FormControl>
                            <div className='flex flex-col gap-y-[0.25rem] leading-none'>
                              <div className='flex sm:items-center sm:space-x-[0.5rem] xsm:flex-wrap xsm:gap-[0.19rem]'>
                                {isMobile && packageItem?.tag && (
                                  <div className='flex items-center space-x-[0.25rem] rounded-[62.5rem] bg-[#3FC371] p-[0.12rem_0.38rem] sm:hidden'>
                                    <ICStar className='size-[0.75rem]' />
                                    <p className='font-montserrat text-[0.625rem] font-semibold leading-[0.875rem] tracking-[-0.01875rem] text-white flex-center'>
                                      {packageItem?.tag}
                                    </p>
                                  </div>
                                )}
                                <FormLabel className='cursor-pointer font-montserrat text-[0.875rem] font-semibold leading-normal tracking-[-0.0175rem] text-[rgba(0,0,0,0.92)] xsm:line-clamp-2 xsm:text-[0.8125rem] xsm:tracking-[-0.01625rem]'>
                                  {packageItem?.label}
                                </FormLabel>
                                {!isMobile && packageItem?.tag && (
                                  <div className='flex items-center space-x-[0.25rem] rounded-[62.5rem] bg-[#3FC371] p-[0.25rem_0.75rem] xsm:hidden'>
                                    <ICStar className='size-[0.875rem]' />
                                    <p className='font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-white flex-center'>
                                      {packageItem?.tag}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {packageItem?.desc && (
                                <FormLabel
                                  className='cursor-pointer text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.80)] xsm:text-[0.8125rem] xsm:leading-[1.21875rem] xsm:tracking-[-0.02438rem]'
                                  dangerouslySetInnerHTML={{
                                    __html: packageItem?.desc,
                                  }}
                                ></FormLabel>
                              )}
                            </div>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
              </div>
            </div>
          </>
        )}

        <FormField
          control={form.control}
          name='packageMessage'
          render={({field}) => (
            <FormItem className='relative flex flex-col items-start space-y-[0.38rem]'>
              <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                Viết yêu cầu của bạn
              </FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder='Nhập nội dung'
                  className='!mt-[0.5rem] flex min-h-[4.5rem] w-full resize-none overflow-hidden rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[1rem] pl-[1rem] text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 xsm:!mt-[0.37rem]'
                  style={{
                    height: 'auto',
                    minHeight: '4.5rem',
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = 'auto'
                    target.style.height =
                      Math.max(4.5 * 16, target.scrollHeight) + 'px'
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {stepEnd && (
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
                <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                  Chọn thông tin thanh toán <strong>(*)</strong>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl
                    className={cn(
                      '!mt-[0.5rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[0.75rem_0.75rem_0.75rem_1rem] pl-[1rem] !shadow-none aria-[invalid=true]:!border-[#F00] xsm:pointer-events-none xsm:!mt-[0.37rem] [&_svg]:opacity-[1] [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:filter',
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
        )}

        <div className='mt-[1.5rem] flex w-full items-center justify-between space-x-[1.25rem] xsm:fixed xsm:bottom-0 xsm:left-0 xsm:right-0 xsm:z-[49] xsm:mt-0 xsm:space-x-[0.5rem] xsm:bg-[#FAFAFA] xsm:p-[1rem] disabled:xsm:opacity-[1]'>
          <div className='flex w-full items-center gap-[2rem] xsm:!mt-0 xsm:gap-[0.5rem]'>
            <div className='flex-1'>
              <div
                onClick={() => {
                  setIndexTab(indexTab - 1)
                  handleClickcurrentTab('5')
                }}
                className='cursor-pointer rounded-[1.25rem] bg-[#D9F1FF] p-[0.75rem_1.5rem] flex-center'
              >
                <p className='text-black text-pc-sub16m'>Quay lại</p>
              </div>
            </div>

            {stepEnd ? (
              <AlertDialog>
                <div className='flex-1'>
                  {form.formState.isValid ? (
                    <AlertDialogTrigger className='w-full'>
                      <div
                        className={cn(
                          'ml-auto mt-[0rem] h-[2.8125rem] rounded-[1.25rem] bg-[#38B6FF] p-[0.75rem_1.5rem] !shadow-none flex-center hover:bg-[#38B6FF]',
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
                    <div className='flex-1'>
                      <button
                        type='submit'
                        disabled={!form.formState.isValid}
                        className={cn(
                          'h-[2.8125rem] w-full rounded-[1.25rem] border-[rgba(255,255,255,0.80)] bg-[#F0F0F0] !shadow-none flex-center sm:p-[0.75rem_1.5rem] [&_p]:text-[rgba(0,0,0,0.30)]',
                        )}
                      >
                        <p className='text-white text-pc-sub16m'>Xác nhận</p>
                      </button>
                    </div>
                  )}
                </div>

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
                                  (isVietSec
                                    ? dataFromOrder?.housingNumber +
                                      ' - ' +
                                      dataFromOrder?.roadName
                                    : dataFromOrder?.recipientWardsandcommunes +
                                      ' - ' +
                                      dataFromOrder?.district) +
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
                        {/* <p className='capitalize text-[0.8125rem] sm:text-[0.875rem] font-medium text-[rgba(0,0,0,0.80)] leading-[1.5] tracking-[-0.02438rem] sm:tracking-[-0.02625rem] font-montserrat'>
                        <strong className='font-semibold sm:leading-[1.14]'>
                          Loại tiền tệ thanh toán:{' '}
                        </strong>
                        <span>
                          {form?.getValues('recipientPaymentInformation')}
                        </span>
                      </p> */}
                      </div>
                      {type === 'nhatviet' && (
                        <div className='mt-[1.75rem]'>
                          <div className='mb-[0.75rem] text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem] text-black xsm:text-[0.875rem] xsm:leading-[1.4] xsm:tracking-[-0.035rem]'>
                            Lưu ý quan trọng về mã bưu điện nội địa Nhật
                          </div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: importantNote || '',
                            }}
                            className={cn(
                              '*:text-[0.875rem] *:font-medium *:leading-[1.3125rem] *:tracking-[-0.02625rem] *:text-[rgba(0,0,0,0.80)] xsm:*:text-[0.8125rem] xsm:*:leading-[1.21875rem] xsm:*:tracking-[-0.02438rem]',
                              '[&_ul]:!my-3 [&_ul]:!list-disc [&_ul]:!pl-[1.35rem] [&_ul]:xsm:!pl-3',
                              '[&_ol]:!my-3 [&_ol]:!list-decimal [&_ol]:!pl-[1.35rem] [&_ol]:xsm:!pl-3',
                              '[&_p]:pt-[0.62rem] first:[&_p]:pt-0 [&_p]:xsm:pt-[0.38rem]',
                            )}
                          ></div>
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
            ) : (
              <div className='flex-1'>
                <Button
                  type='submit'
                  disabled={!form.formState.isValid}
                  className={cn(
                    'ml-auto mt-[0rem] h-[2.8125rem] w-full rounded-[1.25rem] bg-[#38B6FF] p-[0.75rem_1.5rem] !shadow-none flex-center hover:bg-[#38B6FF]',
                    !form.formState.isValid &&
                      'bg-[#F0F0F0] [&_p]:text-[rgba(0,0,0,0.30)]',
                  )}
                >
                  <p className='text-white text-pc-sub16m'>Tiếp tục</p>
                </Button>
              </div>
            )}
          </div>
        </div>

        {isMobile && stepEnd && (
          <PopupPaymentInfor
            form={form}
            selectPaymentInformation={selectPaymentInformation}
            setSelectPaymentInformation={setSelectPaymentInformation}
            setSelectPaymentInformationValue={setSelectPaymentInformationValue}
            paymentMethod={paymentMethod}
          />
        )}
      </form>
    </Form>
  )
}
