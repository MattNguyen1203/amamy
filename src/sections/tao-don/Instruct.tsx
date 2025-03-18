'use client'
import useStore from '@/app/(store)/store'
import {ICLoading} from '@/components/icon/ICLoading'
import ImageV2 from '@/components/image/ImageV2'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
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
  IInformationInstructOrder,
  IInformationInstructOrder_SelectBranch,
} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import Link from 'next/link'
import {useEffect, useState, useTransition} from 'react'
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
}: {
  data?: IInformationInstructOrder
  handleClickcurrentTab: (nextTab: string) => void
  dataFromOrder?: IDataFromOrder
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  type?: string
  importantNote?: string
}) {
  const isMobile = useIsMobile()
  const {setStepOrder} = useStore((state) => state)
  const [isPending, setTransition] = useTransition()
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
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
      branch: dataFromOrder?.branch || data?.select_branch?.[0]?.title,
      recipientPaymentInformation:
        dataFromOrder?.recipientPaymentInformation || '',
    },
  })
  useEffect(() => {
    if (form?.getValues('branch')) {
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
  }, [form?.getValues('branch')])
  useEffect(() => {
    if (selectBranch || selectPaymentInformation) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [selectBranch, selectPaymentInformation])
  function handleCreateOrder() {
    setTransition(async () => {
      const formData = new FormData()
      formData.append('ten_nguoi_nhan', dataFromOrder?.recipientName || '')
      formData.append('ten_nguoi_gui', dataFromOrder?.name || '')
      formData.append(
        'dia_chi_nguoi_nhan',
        dataFromOrder?.recipientAddress || '',
      )
      formData.append('user', dataFromOrder?.email || '')
      formData.append(
        'loai_tien_te',
        form?.getValues('recipientPaymentInformation') || '',
      )
      formData.append('sdt', dataFromOrder?.recipientPhone)
      formData.append('chieu_van_don', dataFromOrder?.shipping)
      if (dataFromOrder?.customercode) {
        formData.append('ma_khach_hang', dataFromOrder?.customercode)
      }
      if (dataFromOrder?.recipientCity) {
        formData.append('thanh_pho', dataFromOrder?.recipientCity)
      }
      if (dataFromOrder?.recipientCodeCity) {
        formData.append('ma_thanh_pho', dataFromOrder?.recipientCodeCity)
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ORDER}v1/add`,
        {
          method: 'POST',
          body: formData,
        },
      )
      if (response?.ok) {
        setDataFromOrder({})
        setSubmitting(true)
        setStepOrder(1)
        handleClickcurrentTab('1')
        setTriggerScroll(true)
      } else {
        toast.error('Có lỗi sãy ra')
      }
    })
  }
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <div className='space-y-[1.5rem] xsm:space-y-[0.75rem]'>
          <p className='text-black text-pc-sub16b'>
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
                        <FormControl className='xsm:pointer-events-none aria-[invalid=true]:!border-[#F00] bg-white !mt-[0.37rem] p-[0.75rem_0.75rem_0.75rem_1rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] [&_svg]:filter [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:opacity-[1]'>
                          <SelectTrigger className='[&_.amamy-post]:hidden [&_.select-addres]:hidden [&_.select-time]:hidden [&_.select-phone]:hidden xsm:h-[2.5rem] h-[3rem] [&_span]:!text-black [&_span]:text-pc-sub14m [&_span]:xsm:text-mb-13M focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                            {!isMobile && (
                              <SelectValue placeholder='Chọn chi nhánh' />
                            )}
                            {isMobile && !selectBranch && (
                              <SelectValue placeholder='Chọn chi nhánh' />
                            )}
                            {isMobile && field.value && selectBranch && (
                              <div className='space-x-[0.75rem] flex items-center flex-1'>
                                <p className='text-black text-pc-sub14m'>
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
                                        className='text-black text-pc-sub14m'
                                      ></p>
                                    </div>
                                    <div className='select-time flex space-x-[0.5rem] items-start'>
                                      <ICTime className='size-[1.5rem]' />
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: item?.time,
                                        }}
                                        className='text-black text-pc-sub14m'
                                      ></p>
                                    </div>
                                    <div className='select-phone flex space-x-[0.5rem] items-start'>
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
                      <FormMessage className='!text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
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
                        className='flex-1 text-black text-pc-sub14m'
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
                        className='flex-1 text-black text-pc-sub14m'
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
                        className='flex-1 text-black text-pc-sub14m'
                      ></p>
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
          <div className='flex xsm:flex-col sm:space-x-[1rem] xsm:space-y-[1rem] p-[1rem] rounded-[1.25rem] bg-white'>
            <div
              className='flex-1 [&_a]:text-[#0084FF] [&_h3]:text-pc-tab-title [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]:text-black *:text-[rgba(0,0,0,0.90)] *:text-pc-sub14m *:xsm:text-mb-13 [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)] xsm:marker:[&_ul_li]:text-[0.5rem]'
              dangerouslySetInnerHTML={{
                __html: data?.packing_instructions || '',
              }}
            ></div>
            {data?.images && (
              <ImageV2
                src={data?.images}
                alt=''
                width={300 * 2}
                height={200 * 2}
                className='rounded-[0.5rem] w-[18.75rem] xsm:w-full h-[12.5rem] xsm:h-[12.95831rem] object-cover'
              />
            )}
          </div>
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
                className='flex-1 space-y-0'
              >
                <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Chọn thông tin thanh toán (*)
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='xsm:pointer-events-none aria-[invalid=true]:!border-[#F00] bg-white !mt-[0.37rem] p-[0.75rem_0.75rem_0.75rem_1rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] [&_svg]:filter [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:opacity-[1]'>
                    <SelectTrigger className='xsm:h-[2.5rem] h-[3rem] [&_span]:!text-black [&_span]:text-pc-sub14m focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                      {!isMobile && (
                        <SelectValue placeholder='Chọn thông tin thanh toán' />
                      )}
                      {isMobile && !field.value && (
                        <SelectValue placeholder='Chọn thông tin thanh toán' />
                      )}
                      {isMobile && field.value && (
                        <div className='space-x-[0.75rem] flex items-center flex-1 w-full'>
                          <p className='text-black text-pc-sub14m text-start w-full line-clamp-1'>
                            {selectPaymentInformationValue?.title ||
                              dataFromOrder?.recipientPaymentInformation}
                          </p>
                        </div>
                      )}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] bg-white'>
                    <SelectItem
                      className='h-[3rem] rounded-[1.25rem] p-[0.75rem] bg-white flex items-center'
                      value={'VND'}
                    >
                      <p className='text-black text-pc-sub14m'>
                        Thanh toán bằng VNĐ (theo tỷ giá bán ra Vietcombank)
                      </p>
                    </SelectItem>
                    <SelectItem
                      className='h-[3rem] rounded-[1.25rem] p-[0.75rem] bg-white flex items-center'
                      value={'Euro'}
                    >
                      <p className='text-black text-pc-sub14m'>
                        Thanh toán bằng Euro
                      </p>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className='!text-[#F00] text-pc-sub12m' />
              </FormItem>
            )}
          />

          <div className='xsm:p-[1rem] xsm:bg-[#FAFAFA] xsm:shadow-lg xsm:space-x-[0.5rem] xsm:fixed xsm:bottom-0 xsm:z-[49] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0 flex items-center justify-between sm:w-full'>
            <div
              onClick={() => handleClickcurrentTab('5')}
              className='xsm:flex-1 cursor-pointer sm:p-[0.75rem_1.5rem] xsm:py-[0.75rem] flex-center rounded-[1.25rem] bg-[#D9F1FF]'
            >
              <p className='text-pc-sub16m text-black'>Quay lại</p>
            </div>
            <AlertDialog>
              {form.formState.isValid ? (
                <AlertDialogTrigger className='xsm:flex-1'>
                  <div
                    className={cn(
                      'xsm:flex-1 hover:bg-[#38B6FF] mt-[0rem] ml-auto h-[2.8125rem] flex-center p-[0.75rem_1.5rem] rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]',
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
                    'border-[rgba(255,255,255,0.80)] bg-[#F0F0F0] [&_p]:text-[rgba(0,0,0,0.30)]  h-[2.8125rem] flex-center p-[0.75rem_1.5rem] rounded-[1.25rem]',
                  )}
                >
                  <p className='text-white text-pc-sub16m'>Xác nhận</p>
                </button>
              )}
              <AlertDialogContent
                className={cn(
                  'space-y-0 w-[29.375rem] p-[2rem_1.25rem_1.25rem_1.25rem] xsm:w-[21.4375rem] xsm:p-[1.5rem_1rem_1rem_1rem] xsm:rounded-[1.25rem] z-[55]',
                  type === 'nhatviet' && 'w-[52.5rem] xsm:w-full max-w-max',
                )}
              >
                <AlertDialogHeader className='flex-center flex-col'>
                  <ImageV2
                    src={'/order/error.png'}
                    alt=''
                    width={50 * 2}
                    height={50 * 2}
                    className='size-[2.5rem] xsm:size-[3rem] mb-[1.5rem]'
                  />
                  <AlertDialogTitle className='!mt-0 xsm:text-pc-sub16b xsm:mb-[0.5rem]'>
                    Xác nhận đơn hàng & địa chỉ giao
                  </AlertDialogTitle>
                  <AlertDialogDescription className='w-full'>
                    <p className='w-full xsm:text-start my-[0.75rem] rounded-[1.25rem] p-[1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'>
                      <p className='text-pc-tab-title text-black mb-[0.75rem]'>
                        Thông tin nhận hàng
                      </p>
                      {dataFromOrder?.recipientName && (
                        <p className='mb-[0.37rem] text-[0.875rem] font-semibold leading-[1rem] tracking-[-0.02625rem]'>
                          <strong className='text-[rgba(0,0,0,0.80)]'>
                            Tên người nhận:{' '}
                          </strong>
                          <span>{dataFromOrder?.recipientName}</span>
                        </p>
                      )}
                      {dataFromOrder?.recipientAddress && (
                        <p className='mb-[0.37rem] text-[0.875rem] font-semibold leading-[1rem] tracking-[-0.02625rem]'>
                          <strong className='text-[rgba(0,0,0,0.80)]'>
                            Địa chỉ:{' '}
                          </strong>
                          <span>{dataFromOrder?.recipientAddress}</span>
                        </p>
                      )}
                      {dataFromOrder?.recipientPhone && (
                        <p className='mb-[0.37rem] text-[0.875rem] font-semibold leading-[1rem] tracking-[-0.02625rem]'>
                          <strong className='text-[rgba(0,0,0,0.80)]'>
                            Số điện thoại:{' '}
                          </strong>
                          <span>{dataFromOrder?.recipientPhone}</span>
                        </p>
                      )}
                      {/* <p className='mb-[0.37rem] text-[0.875rem] font-semibold leading-[1rem] tracking-[-0.02625rem]'>
                        <strong className='text-[rgba(0,0,0,0.80)]'>
                          Email:{' '}
                        </strong>
                        <span>{dataFromOrder?.recipientName}</span>
                      </p> */}
                    </p>
                    {type === 'nhatviet' && (
                      <div className='w-full xsm:text-start my-[0.75rem] rounded-[1.25rem] p-[1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'>
                        <p className='text-pc-tab-title text-black mb-[0.75rem]'>
                          Lưu ý quan trọng về mã bưu điện nội địa Nhật
                        </p>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: importantNote || '',
                          }}
                          className='text-pc-sub14m text-[rgba(0,0,0,0.80)] flex-1 [&_a]:text-[#0084FF] [&_h3]:text-pc-tab-title [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]:text-black *:text-[rgba(0,0,0,0.90)] *:text-pc-sub14m *:xsm:text-mb-13 [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[#f00] xsm:marker:[&_ul_li]:text-[0.5rem]'
                        ></p>
                      </div>
                    )}
                    <p className='text-[#F00] text-pc-sub12s w-full text-start'>
                      *Sau khi xác nhận, bạn sẽ không thể chỉnh sửa đơn hàng.
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex !mt-[3rem] space-x-[1rem]'>
                  <AlertDialogCancel className='flex-1 xsm:text-pc-sub16m flex-center rounded-[1.25rem] h-[3rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#F0F0F0] hover:bg-[#38B6FF] transition-all duration-500 hover:text-white'>
                    Hủy
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleCreateOrder}
                    className='flex-1 xsm:text-pc-sub16m flex-center rounded-[1.25rem] h-[3rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]'
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
                      'fixed transition-all duration-700 inset-0 bg-black/70 z-[51] hidden !mt-0',
                      selectBranch && 'block',
                    )}
                  ></div>
                  <div
                    className={cn(
                      'fixed transition-all duration-500 shadow-lg bottom-[-125%] z-[52] left-0 w-full rounded-t-[1.25rem] bg-white pb-[4rem] overflow-hidden overflow-y-auto max-h-[70vh]',
                      selectBranch && 'bottom-0',
                    )}
                  >
                    <div className='border-b-[1px] border-solid border-b-[#DCDFE4] relative p-[0.5rem] flex-center '>
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
                    <div className=''>
                      {Array.isArray(data?.select_branch) &&
                        data?.select_branch?.map(
                          (
                            item: IInformationInstructOrder_SelectBranch,
                            index: number,
                          ) => (
                            <div
                              key={index}
                              onClick={() => {
                                form.setValue('branch', String(item?.title))
                                setSelectBranchValue(item?.title)
                                setSelectBranch(false)
                              }}
                              className='space-x-[0.75rem] flex items-center p-[0.75rem] border-[1px] border-solid border-[#F8F8F8] bg-white'
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
                                    className='flex-1 text-black text-pc-sub14m xsm:text-mb-13M xsm:text-[rgba(0,0,0,0.80)]'
                                  ></p>
                                </div>
                                <div className='select-time flex space-x-[0.5rem] items-start'>
                                  <ICTime className='size-[1.5rem] xsm:size-[1.125rem]' />
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: item?.time,
                                    }}
                                    className='flex-1 text-black text-pc-sub14m xsm:text-mb-13M xsm:text-[rgba(0,0,0,0.80)]'
                                  ></p>
                                </div>
                                <div className='select-phone flex space-x-[0.5rem] items-start'>
                                  <ICPhone className='size-[1.5rem] xsm:size-[1.125rem]' />
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: item?.phone,
                                    }}
                                    className='flex-1 text-black text-pc-sub14m xsm:text-mb-13M xsm:text-[rgba(0,0,0,0.80)]'
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
