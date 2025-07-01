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
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import {ICreateOder, IInformationOrder} from '@/sections/tao-don/oder.interface'
import PopupPaymentInfor from '@/sections/tao-don/PopupPaymentInfor'
import {zodResolver} from '@hookform/resolvers/zod'
import {useEffect, useState, useTransition} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'
import {z} from 'zod'
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      package: data?.list_package
        ? dataFromOrder?.package ?? ''
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
            : form?.getValues('package') ?? '',
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
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-[1.5rem] xsm:space-y-[0.75rem]'
      >
        {data?.list_package && (
          <>
            <div className='p-[1rem] rounded-[1.25rem] bg-white border-[1px] border-solid border-[#DCDFE4]'>
              <p className='mb-[1rem] text-[rgba(0,0,0,0.92)] font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
                {data?.title || 'Chọn cách đóng gói'}
              </p>
              {data?.note_more && (
                <p
                  className='my-[1rem] text-pc-sub14m text-[#F00] [&_ul_li]:list-disc [&_ul]:pl-[1rem]'
                  dangerouslySetInnerHTML={{__html: data?.note_more ?? ''}}
                ></p>
              )}
              <div className='flex flex-col space-y-[1rem]'>
                {Array.isArray(data?.list_package) &&
                  data?.list_package?.map((packageItem, packageIndex) => (
                    <FormField
                      key={packageIndex}
                      control={form.control}
                      name={`package`}
                      render={({field}) => (
                        <FormItem className='xsm:pt-[0.5rem] xsm:border-t-[1px] xsm:border-solid xsm:border-[#DCDFE4] xsm:first:border-t-0 xsm:first:pt-0 relative flex flex-row items-center space-y-0 space-x-[0.5rem] border-none'>
                          <FormControl>
                            <Checkbox
                              className='[&_svg]:!hidden size-[1.25rem] rounded-[100%] border-[1.66667px] border-solid border-[#000000] data-[state=checked]:!border-[#38B6FF] !bg-white flex-center [&>span]:data-[state=checked]:!bg-[#38B6FF] [&>span]:bg-transparent [&>span]:size-[0.75rem] [&>span]:rounded-[100%]'
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
                          <div className='leading-none space-y-[0rem] flex flex-col'>
                            <div className='flex xsm:flex-wrap sm:items-center xsm:gap-[0.5rem] sm:space-x-[0.3875rem]'>
                              <FormLabel className='text-pc-sub14s !font-semibold xsm:text-mb-13S xsm:!font-semibold xsm:line-clamp-2 text-black/[0.92] cursor-pointer'>
                                {packageItem?.label}
                              </FormLabel>
                              {packageItem?.tag && (
                                <p className='xsm:w-max p-[0.25rem_0.75rem] flex-center rounded-[62.5rem] bg-[#5DAF46] text-pc-sub14m xsm:text-[0.625rem] xsm:font-semibold xsm:leading-[1.4] xsm:tracking-[-0.01875rem] text-white'>
                                  {packageItem?.tag}
                                </p>
                              )}
                            </div>
                            {packageItem?.desc && (
                              <FormLabel className='pt-[0.5rem] text-pc-sub14m text-[rgba(0,0,0,0.80)] cursor-pointer'>
                                <p
                                  className='text-pc-sub14m text-[rgba(0,0,0,0.80)]'
                                  dangerouslySetInnerHTML={{
                                    __html: packageItem?.desc,
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
            </div>
          </>
        )}

        <FormField
          control={form.control}
          name={`packageMessage`}
          render={({field}) => (
            <FormItem className='relative flex flex-col items-start space-y-[0.38rem]'>
              <FormLabel className='pt-[0.5rem] text-pc-sub14m text-[rgba(0,0,0,0.80)] cursor-pointer'>
                <p className='text-pc-sub12s text-[rgba(0,0,0,0.80)]'>
                  Viết yêu cầu của bạn
                </p>
              </FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder='Nhập nội dung'
                  className='overflow-hidden flex min-h-[4.5rem] w-full rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[1rem] text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none'
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
        )}

        <div className='space-x-[2rem] xsm:p-[1rem] xsm:bg-[#FAFAFA] xsm:space-x-[0.5rem] xsm:fixed xsm:bottom-0 xsm:z-[49] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0 flex items-center justify-between sm:w-full'>
          <div
            onClick={() => {
              setIndexTab(indexTab - 1)
              handleClickcurrentTab('5')
            }}
            className='flex-1 cursor-pointer p-[0.75rem_1.5rem] flex-center rounded-[1.25rem] bg-[#D9F1FF]'
          >
            <p className='text-pc-sub16m text-black'>Quay lại</p>
          </div>
          {stepEnd ? (
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
          ) : (
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
          )}
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
