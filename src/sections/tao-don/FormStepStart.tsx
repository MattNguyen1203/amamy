'use client'

import {Fragment, useEffect, useState} from 'react'
import {FieldError, FieldErrors, useForm} from 'react-hook-form'
import useStore from '@/app/(store)/store'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import ICX from '@/sections/tao-don/ICX'
import {ICreateOder} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import ImageV2 from '@/components/image/ImageV2'
import {Button} from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  email: z.string().email({
    message: 'Địa chỉ email không đúng!',
  }),
  // whereToContact: z
  //   .string({
  //     required_error: 'Vui lòng chọn phương thức liên lạc',
  //   })
  //   .min(1, 'Vui lòng chọn phương thức liên lạc'),
  name: z
    .string({
      required_error: 'Vui lòng nhập tên người gửi',
    })
    .min(1, 'Vui lòng nhập tên người gửi'),
  shipping: z
    .string({
      required_error: 'Vui lòng chọn chiều dịch vụ',
    })
    .min(1, 'Vui lòng chọn chiều dịch vụ'),
  customercode: z
    .string({
      required_error: 'Vui lòng chọn Mã khách hàng',
    })
    .min(1, 'Vui lòng chọn Mã khách hàng'),
  nameFacebook: z
    .string({
      required_error: 'Vui lòng điền thông tin',
    })
    .min(1, 'Vui lòng chọn điền thông tin'),
})

const dataContactMethod = [
  {
    img: '/order/like.webp',
    title: 'Facebook Fanpage Amamy',
  },
  {
    img: '/order/zalo.webp',
    title: 'Zalo Amamy',
  },
  {
    img: '/order/kh.webp',
    title: 'Trang cá nhân của nhân viên',
  },
]

export default function FormStepStart({
  data,
  onSuccess,
  setDataFromOrder,
  dataFromOrder,
  dataInformation,
  // sentGoodsAtAmamy,
  nextStep,
  setIndexTab,
  indexTab,
  handlesetDataInformation,
}: {
  data: ICreateOder[]
  onSuccess: (nextTab: string) => void
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  dataFromOrder: IDataFromOrder
  dataInformation?: ICreateOder
  // sentGoodsAtAmamy: boolean
  nextStep: string
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
  handlesetDataInformation: (shipping: string) => void
}) {
  const isMobile = useIsMobile()
  const [selectServiceDimension, setSelectServiceDimension] =
    useState<boolean>(false)
  const [selectServiceDimensionValue, setSelectServiceDimensionValue] =
    useState<{img: string; title: string}>({img: '', title: ''})
  const [howToContactAmamy, setHowToContactAmamy] = useState<boolean>(false)
  const [howToContactAmamyValue, setHowToContactAmamyValue] = useState<{
    img: string
    title: string
  }>({img: '', title: ''})
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: dataFromOrder?.email ?? '',
      name: dataFromOrder?.name ?? '',
      shipping: dataFromOrder?.shipping ?? '',
      customercode: dataFromOrder?.customercode ?? '',
      // whereToContact:
      //   dataFromOrder?.whereToContact ?? dataContactMethod?.[0]?.title,
      nameFacebook: dataFromOrder?.nameFacebook ?? '',
    },
  })
  // useEffect(() => {
  //   if (sentGoodsAtAmamy && localStorage.getItem('user_email')) {
  //     form.setValue('email', String(localStorage.getItem('user_email')))
  //   }
  // }, [sentGoodsAtAmamy])
  const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'})
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
  useEffect(() => {
    if (selectServiceDimension || howToContactAmamy) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [selectServiceDimension, howToContactAmamy])
  async function onSubmit(values: z.infer<typeof formSchema>) {
    handlesetDataInformation(values?.shipping)
    
    // Calculate nextStep based on the newly selected service
    const foundItem = data?.find((item) => item.id === Number(values?.shipping))
    let calculatedNextStep = '4' // Default to step 4
    
    if (foundItem) {
      // Check if time is valid non-empty array
      const hasValidTime =
        foundItem?.information?.time &&
        Array.isArray(foundItem.information.time) &&
        foundItem.information.time.length > 0

      if (hasValidTime) {
        calculatedNextStep = '2'
      } else if (
        ['nhatviet', 'ducvn', 'viethan', 'vietnhat'].includes(
          foundItem.type,
        ) &&
        foundItem.information?.note
      ) {
        calculatedNextStep = '3'
      } else {
        calculatedNextStep = '4'
      }
    }
    
    // localStorage.setItem('user_email', values?.email)
    if (stepOrder < 2) {
      setStepOrder(Number(calculatedNextStep))
    }
    if (dataFromOrder?.shipping !== values?.shipping) {
      setStepOrder(Number(calculatedNextStep))
    }
    setIndexTab(indexTab + 1)
    onSuccess(calculatedNextStep)
    setTriggerScroll(true)
    const formData = new FormData()
    formData.append('user', values?.email)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ORDER}v1/customer`,
      {
        method: 'POST',
        body: formData,
      },
    )
    if (response?.ok) {
      const preview = await response.text()
      if (preview) {
        const previewJson = JSON.parse(preview)
        if (dataInformation?.id !== Number(values?.shipping)) {
          setDataFromOrder({
            recipientName: previewJson?.ten_nguoi_nhan,
            recipientPhone: previewJson?.sdt,
            recipientAddress: previewJson?.dia_chi_nguoi_nhan,
            recipientAddressDetail: previewJson?.dia_chi_nguoi_nhan_chi_tiet,
            recipientPaymentInformation: previewJson?.loai_tien_te,
            recipientCity: previewJson?.tinh_thanh_nguoi_nhan,
            recipientCodeCity: previewJson?.ma_tinh_thanh_nguoi_nhan,
            district: previewJson?.ma_tinh_thanh_nguoi_nhan,
            housingNumber: previewJson?.so_nha_nguoi_nhan,
            nation: previewJson?.nation,
            ...values,
          })
        } else {
          setDataFromOrder({
            ...dataFromOrder,
            recipientName: previewJson?.ten_nguoi_nhan,
            recipientPhone: previewJson?.sdt,
            recipientAddress: previewJson?.dia_chi_nguoi_nhan,
            recipientAddressDetail: previewJson?.dia_chi_nguoi_nhan_chi_tiet,
            recipientPaymentInformation: previewJson?.loai_tien_te,
            recipientCity: previewJson?.tinh_thanh_nguoi_nhan,
            recipientCodeCity: previewJson?.ma_tinh_thanh_nguoi_nhan,
            district: previewJson?.ma_tinh_thanh_nguoi_nhan,
            housingNumber: previewJson?.so_nha_nguoi_nhan,
            nation: previewJson?.nation,
            ...values,
          })
        }
        return
      }
    }
    if (dataInformation?.id !== Number(values?.shipping)) {
      setDataFromOrder({...values})
    } else {
      setDataFromOrder({...dataFromOrder, ...values})
    }
  }

  const onError = (errors: FieldErrors<z.infer<typeof formSchema>>) => {
    const firstErrorField = Object.keys(errors)[0]
    if (!firstErrorField) {
      return
    }

    const el = document.querySelector(`[name="${firstErrorField}"]`)
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'center'})
      ;(el as HTMLElement).focus({preventScroll: true})
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        {!isMobile && (
          <h2 className='mb-[1.5rem] font-montserrat text-[1rem] font-bold leading-[1.3rem] tracking-[-0.03rem] text-[#33A6E8] xsm:hidden'>
            Thông tin gửi hàng
          </h2>
        )}
        <div className='mb-[1.75rem] flex space-x-[1.5rem] xsm:mb-[1.25rem] xsm:flex-col xsm:space-x-0 xsm:space-y-[1.25rem]'>
          {/* email */}
          <FormField
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                  Email của bạn <strong>(*)</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                    placeholder='Email@email'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                <p className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] text-[rgba(0,0,0,0.80)]'>
                  *Bạn sẽ nhận thông báo mã vận đơn qua Email
                </p>
              </FormItem>
            )}
          />
          {/* 
          <FormField
            control={form.control}
            name='whereToContact'
            render={({field}) => (
              <FormItem
                onClick={() => {
                  setHowToContactAmamy(true)
                }}
                className='flex-1 space-y-0'
              >
                <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Bạn đã liên hệ Amamy qua đâu? (*)
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='xsm:pointer-events-none aria-[invalid=true]:!border-[#F00] bg-white !mt-[0.37rem] p-[0.75rem_0.75rem_0.75rem_1rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] [&_svg]:filter [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:opacity-[1]'>
                    <SelectTrigger className='!shadow-none xsm:h-[2.5rem] h-[3rem] [&_span]:!text-black [&_span]:text-pc-sub14m [&_span]:xsm:text-mb-13M focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                      {!isMobile && (
                        <SelectValue placeholder='Chọn chiều dịch vụ' />
                      )}
                      {isMobile &&
                        field.value &&
                        !howToContactAmamyValue?.title && (
                          <SelectValue placeholder='Chọn chiều dịch vụ' />
                        )}
                      {isMobile &&
                        field.value &&
                        howToContactAmamyValue?.title && (
                          <div className='space-x-[0.75rem] flex items-center flex-1'>
                            <ImageV2
                              src={howToContactAmamyValue?.img || ''}
                              alt=''
                              height={100 * 2}
                              width={100 * 2}
                              className='size-[1.5rem] rounded-[100%] border-[0.5px] border-solid border-[rgba(0,0,0,0.25)]'
                            />
                            <p className='text-black text-pc-sub14m'>
                              {howToContactAmamyValue?.title ||
                                dataInformation?.title}
                            </p>
                          </div>
                        )}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] bg-white'>
                    {Array.isArray(dataContactMethod) &&
                      dataContactMethod?.length > 0 &&
                      dataContactMethod?.map(
                        (
                          item: {
                            img: string
                            title: string
                          },
                          index: number,
                        ) => (
                          <SelectItem
                            key={index}
                            className='cursor-pointer h-[3rem] rounded-[1.25rem] p-[0.75rem] bg-white flex items-center'
                            value={String(item?.title)}
                          >
                            <div className='space-x-[0.75rem] flex items-center flex-1'>
                              <ImageV2
                                src={item?.img || '/order/flag-germany.webp'}
                                alt=''
                                height={50 * 2}
                                width={50 * 2}
                                className='size-[1.5rem] rounded-[100%] border-[0.5px] border-solid border-[rgba(0,0,0,0.25)]'
                              />
                              <p className='text-black text-pc-sub14m '>
                                {item?.title}
                              </p>
                            </div>
                          </SelectItem>
                        ),
                      )}
                  </SelectContent>
                </Select>
                <FormMessage className='pl-[0.75rem] !text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
                {/* <p className='pl-[0.75rem] text-pc-sub12m text-[rgba(0,0,0,0.80)] !mt-[0.25rem]'>
                  *Chọn đúng kênh đã từng liên hệ: "Facebook Page Amamy" khác
                  với "Vận chuyển Amamy"
                </p> 
              </FormItem>
            )}
          />
         */}
        </div>
        <div className='mb-[1.75rem] flex space-x-[1.5rem] xsm:mb-[1.25rem] xsm:flex-col xsm:space-x-0 xsm:space-y-[1.25rem]'>
          {/* name */}
          <FormField
            control={form.control}
            name='name'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                  Tên người gửi <strong>(*)</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                    placeholder='Nhập tên người gửi'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
              </FormItem>
            )}
          />

          {/* facebook */}
          <FormField
            control={form.control}
            name='nameFacebook'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                  Tên Facebook <strong>(*)</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                    placeholder='Nhập tên Facebook'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                <p className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] text-[rgba(0,0,0,0.80)]'>
                  *Ghi đúng tên Facebook bạn đã dùng để liên hệ Amamy trước đó -
                  Amamy sẽ phản hồi theo tên này.
                </p>
              </FormItem>
            )}
          />
        </div>

        {/* services */}
        <FormField
          control={form.control}
          name='shipping'
          render={({field}) => (
            <FormItem
              onClick={() => {
                if (isMobile) {
                  setSelectServiceDimension(true)
                }
              }}
              className='mb-[1.75rem] flex-1 space-y-0 xsm:mb-[1.25rem]'
            >
              <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                Chọn chiều dịch vụ <strong>(*)</strong>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl className='!mt-[0.5rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] aria-[invalid=true]:!border-[#F00] xsm:pointer-events-none xsm:!mt-[0.38rem] [&_svg]:opacity-[1] [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:filter'>
                  <SelectTrigger className='h-[3rem] shadow-none placeholder:opacity-[0.3] focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xsm:h-[2.5rem] [&_span]:font-montserrat [&_span]:text-[0.875rem] [&_span]:font-medium [&_span]:leading-[1.3125rem] [&_span]:tracking-[-0.02625rem] [&_span]:text-[rgba(0,0,0,0.92)] [&_span]:xsm:text-[0.8125rem] [&_span]:xsm:leading-[1rem] [&_span]:xsm:tracking-[-0.02438rem]'>
                    {!isMobile && (
                      <SelectValue placeholder='Chọn dịch vụ gửi hàng' />
                    )}
                    {isMobile && !field.value && (
                      <SelectValue placeholder='Chọn dịch vụ gửi hàng' />
                    )}
                    {isMobile && field.value && (
                      <div className='flex flex-1 items-center space-x-[0.75rem]'>
                        <ImageV2
                          src={
                            selectServiceDimensionValue?.img ||
                            dataInformation?.thumbnail ||
                            ''
                          }
                          alt=''
                          height={100 * 2}
                          width={100 * 2}
                          className='size-[1.5rem] rounded-[100%] border-[0.5px] border-solid border-[rgba(0,0,0,0.25)]'
                        />
                        <p className='text-black text-pc-sub14m'>
                          {selectServiceDimensionValue?.title ||
                            dataInformation?.title}
                        </p>
                      </div>
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)]'>
                  {Array.isArray(data) &&
                    data?.length > 0 &&
                    data?.map((item: ICreateOder, index: number) => (
                      <SelectItem
                        key={index}
                        className='flex h-[3rem] cursor-pointer items-center rounded-[1.25rem] bg-white p-[0.75rem]'
                        value={String(item?.id)}
                      >
                        <div className='flex flex-1 items-center space-x-[0.75rem]'>
                          <ImageV2
                            src={item?.thumbnail || '/order/flag-germany.webp'}
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
              <FormMessage className='!mt-[0.25rem] pl-[0.75rem] !text-[#F00] text-pc-sub12m xsm:text-mb-sub10m' />
            </FormItem>
          )}
        />

        {/* code */}
        <FormField
          control={form.control}
          name='customercode'
          render={({field}) => (
            <FormItem className='flex-1 space-y-0'>
              <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                Mã khách hàng <strong>(*)</strong>
              </FormLabel>
              <FormControl>
                <Input
                  className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                  placeholder='Nhập mã khách hàng'
                  {...field}
                />
              </FormControl>
              <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
              <p className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] text-[rgba(0,0,0,0.80)]'>
                *Nếu chưa có mã khách hàng vui lòng liên hệ nhân viên tư vấn để
                nhận mã.
              </p>
              <p className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] text-[rgba(0,0,0,0.80)]'>
                *Mỗi mã sẽ tương ứng với 1 địa chỉ giao hàng, nếu 1 mã 2 địa chỉ
                giao hàng khác nhau sẽ giao sai.
              </p>
            </FormItem>
          )}
        />

        {/* footer */}
        <div className='mt-[1.5rem] space-x-[2rem] xsm:fixed xsm:bottom-0 xsm:left-0 xsm:right-0 xsm:z-[49] xsm:space-x-[0.5rem] xsm:bg-[#FAFAFA] xsm:p-[1rem] disabled:xsm:opacity-[1]'>
          <Button
            type='submit'
            disabled={isMobile ? false : !form.formState.isValid}
            className={cn(
              'ml-auto mt-[1.5rem] h-[2.8125rem] rounded-[1.25rem] bg-[#38B6FF] p-[0.75rem_1.5rem] !shadow-none flex-center hover:bg-[#38B6FF] sm:w-[50%] xsm:mt-0 xsm:w-full',
              !form.formState.isValid &&
                'sm:bg-[#F0F0F0] [&_p]:sm:text-[rgba(0,0,0,0.30)]',
            )}
          >
            <p className='text-white text-pc-sub16m xsm:text-pc-sub14m'>
              Tiếp tục
            </p>
          </Button>
        </div>

        {isMobile && (
          <>
            <div
              onClick={() => {
                setSelectServiceDimension(false)
                setHowToContactAmamy(false)
              }}
              className={cn(
                'pointer-events-none invisible fixed inset-0 z-[51] bg-black/0 transition-all duration-700 ease-in-out',
                (selectServiceDimension || howToContactAmamy) &&
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
                  }}
                  className='absolute right-[0.5rem] top-[0.5rem]'
                >
                  <ICX className='size-[1.5rem]' />
                </div>
              </div>
              <div className='hidden_scroll max-h-[70vh] space-y-[0.5rem] overflow-hidden overflow-y-auto pb-[2rem]'>
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
                        }}
                        className='flex items-center space-x-[0.75rem] bg-white p-[0.75rem]'
                      >
                        <ImageV2
                          src={item?.thumbnail || '/order/flag-germany.webp'}
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
                  ))}
              </div>
            </div>
            {/* <div
              className={cn(
                'fixed transition-all duration-500 shadow-lg bottom-[-125%] z-[52] left-0 w-full rounded-t-[1.25rem] bg-white overflow-hidden',
                howToContactAmamy && 'bottom-0',
              )}
            >
              <div className='border-b-[1px] border-solid border-b-[#DCDFE4] relative p-[0.5rem] flex-center '>
                <p className='text-center text-[0.75rem] font-montserrat font-semibold tracking-[-0.015rem] text-black'>
                  Chọn phương thức liên hệ
                </p>
                <div
                  onClick={() => {
                    setHowToContactAmamy(false)
                  }}
                  className='absolute top-[0.5rem] right-[0.5rem]'
                >
                  <ICX className='size-[1.5rem]' />
                </div>
              </div>
              <div className='space-y-[0.5rem] pb-[2rem] overflow-hidden overflow-y-auto max-h-[70vh] hidden_scroll'>
                {Array.isArray(dataContactMethod) &&
                  dataContactMethod?.length > 0 &&
                  dataContactMethod?.map(
                    (
                      item: {
                        img: string
                        title: string
                      },
                      index: number,
                    ) => (
                      <Fragment key={index}>
                        <div
                          onClick={() => {
                            form.setValue(
                              'whereToContact',
                              String(item?.title),
                              {
                                shouldValidate: true, // Kích hoạt validate ngay sau khi set value
                              },
                            )
                            setHowToContactAmamyValue({
                              img: item?.img,
                              title: item?.title,
                            })
                            setHowToContactAmamy(false)
                          }}
                          className='space-x-[0.75rem] flex items-center p-[0.75rem] bg-white'
                        >
                          <ImageV2
                            src={item?.img || ''}
                            alt=''
                            height={24 * 2}
                            width={24 * 2}
                            className='size-[1.5rem] rounded-[100%] border-[0.5px] border-solid border-[rgba(0,0,0,0.25)]'
                          />
                          <p className='text-black text-pc-sub14m line-clamp-1'>
                            {item?.title}
                          </p>
                        </div>
                        <div className='h-[1px] w-full bg-[#F8F8F8]'></div>
                      </Fragment>
                    ),
                  )}
              </div>
            </div> */}
          </>
        )}
      </form>
    </Form>
  )
}
