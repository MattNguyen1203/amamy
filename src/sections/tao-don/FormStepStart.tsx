'use client'
import useStore from '@/app/(store)/store'
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
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import ICX from '@/sections/tao-don/ICX'
import {ICreateOder} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
const formSchema = z.object({
  email: z.string().email({
    message: 'Địa chỉ email không đúng!',
  }),
  whereToContact: z
    .string({
      required_error: 'Vui lòng chọn phương thức liên lạc',
    })
    .min(1, 'Vui lòng chọn phương thức liên lạc'),
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
    img: '/order/like.svg',
    title: 'Facebook Fanpage Amamy',
  },
  {
    img: '/order/fb.svg',
    title: 'Facebook Amamy vận chuyển',
  },
  {
    img: '/order/zalo.svg',
    title: 'Zalo Amamy',
  },
  {
    img: '/order/infor.svg',
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
}: {
  data: ICreateOder[]
  onSuccess: (nextTab: string) => void
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  dataFromOrder: IDataFromOrder
  dataInformation?: ICreateOder
  // sentGoodsAtAmamy: boolean
  nextStep: string
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
      email: dataFromOrder?.email || '',
      name: dataFromOrder?.name || '',
      shipping: dataFromOrder?.shipping || '',
      customercode: dataFromOrder?.customercode || '',
      whereToContact:
        dataFromOrder?.whereToContact || dataContactMethod?.[0]?.title,
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
  useEffect(() => {
    if (selectServiceDimension || howToContactAmamy) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [selectServiceDimension, howToContactAmamy])
  async function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem('user_email', values?.email)
    if (stepOrder < 2) {
      setStepOrder(Number(nextStep))
    }
    if (dataFromOrder?.shipping !== values?.shipping) {
      setStepOrder(Number(nextStep))
    }
    onSuccess(nextStep)
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
        return
      }
    }
    setDataFromOrder({...dataFromOrder, ...values})
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=''
      >
        <p className='text-black text-pc-sub16b mb-[1.5rem]'>
          Thông tin gửi hàng
        </p>
        <div className='flex xsm:flex-col xsm:space-y-[1.25rem] sm:space-x-[1.5rem] mb-[1.75rem] xsm:mb-[1.25rem]'>
          <FormField
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Email của bạn(*)
                </FormLabel>
                <FormControl>
                  <Input
                    className='shadow-none xsm:h-[2.5rem] aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m xsm:text-mb-13M !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='Email@email'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
                <p className='text-pc-sub12m text-[rgba(0,0,0,0.60)] !mt-[0.25rem]'>
                  *Bạn sẽ nhận thông báo mã vận đơn qua Email
                </p>
              </FormItem>
            )}
          />
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
                <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
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
                              height={50 * 2}
                              width={50 * 2}
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
                              <p className='text-black text-pc-sub14m'>
                                {item?.title}
                              </p>
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
        <div className='flex xsm:flex-col xsm:space-y-[1.25rem] sm:space-x-[1.5rem] mb-[1.75rem] xsm:mb-[1.25rem]'>
          <FormField
            control={form.control}
            name='name'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Tên người gửi (*)
                </FormLabel>
                <FormControl>
                  <Input
                    className='shadow-none xsm:h-[2.5rem] aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m xsm:text-mb-13M !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='Nhập tên người gửi'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='nameFacebook'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Tên đã liên hệ (*)
                </FormLabel>
                <FormControl>
                  <Input
                    className='shadow-none xsm:h-[2.5rem] aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m xsm:text-mb-13M !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='Nhập tên đã liên hệ'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='shipping'
          render={({field}) => (
            <FormItem
              onClick={() => {
                setSelectServiceDimension(true)
              }}
              className='flex-1 space-y-0 !mb-[1.25rem]'
            >
              <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                Chọn chiều dịch vụ (*)
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
                    {isMobile && !field.value && (
                      <SelectValue placeholder='Chọn chiều dịch vụ' />
                    )}
                    {isMobile && field.value && (
                      <div className='space-x-[0.75rem] flex items-center flex-1'>
                        <ImageV2
                          src={
                            selectServiceDimensionValue?.img ||
                            dataInformation?.thumbnail ||
                            ''
                          }
                          alt=''
                          height={24 * 2}
                          width={24 * 2}
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
                            src={item?.thumbnail || '/order/flag-germany.webp'}
                            alt=''
                            height={24 * 2}
                            width={24 * 2}
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
              <FormMessage className='!text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='customercode'
          render={({field}) => (
            <FormItem className='flex-1 space-y-0'>
              <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                Mã khách hàng
              </FormLabel>
              <FormControl>
                <Input
                  className='shadow-none xsm:h-[2.5rem] aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m xsm:text-mb-13M !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                  placeholder='Nhập mã khách hàng'
                  {...field}
                />
              </FormControl>
              <FormMessage className='!text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
              <p className='text-pc-sub12m text-[rgba(0,0,0,0.60)] !mt-[0.25rem]'>
                *Nếu chưa có mã khách hàng vui lòng liên hệ nhân viên tư vấn để
                nhận mã.
              </p>
              <p className='text-pc-sub12m text-[rgba(0,0,0,0.60)]'>
                *Mỗi mã sẽ tương ứng với 1 địa chỉ giao hàng, nếu 1 mã 2 địa chỉ
                giao hàng khách nhau sẽ giao sai.
              </p>
            </FormItem>
          )}
        />
        <div className='xsm:p-[1rem] xsm:bg-[#FAFAFA] xsm:fixed xsm:bottom-0 xsm:z-[49] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0'>
          <Button
            type='submit'
            disabled={isMobile ? false : !form.formState.isValid}
            className={cn(
              'xsm:w-full hover:bg-[#38B6FF] mt-[1.5rem] xsm:mt-0 ml-auto h-[2.8125rem] flex-center p-[0.75rem_1.5rem] rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]',
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
                'fixed transition-all duration-700 inset-0 bg-black/70 z-[51] hidden',
                selectServiceDimension && 'block',
                howToContactAmamy && 'block',
              )}
            ></div>
            <div
              className={cn(
                'fixed transition-all duration-500 shadow-lg bottom-[-125%] z-[52] left-0 w-full rounded-t-[1.25rem] bg-white pb-[4rem] overflow-hidden',
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
                  }}
                  className='absolute top-[0.5rem] right-[0.5rem]'
                >
                  <ICX className='size-[1.5rem]' />
                </div>
              </div>
              <div className=''>
                {Array.isArray(data) &&
                  data?.length > 0 &&
                  data?.map((item: ICreateOder, index: number) => (
                    <div
                      key={index}
                      onClick={() => {
                        form.setValue('shipping', String(item?.id))
                        setSelectServiceDimensionValue({
                          img: item?.thumbnail,
                          title: item?.title,
                        })
                        setSelectServiceDimension(false)
                      }}
                      className='space-x-[0.75rem] flex items-center p-[0.75rem] border-[1px] border-solid border-[#F8F8F8] bg-white'
                    >
                      <ImageV2
                        src={item?.thumbnail || '/order/flag-germany.webp'}
                        alt=''
                        height={24 * 2}
                        width={24 * 2}
                        className='size-[1.5rem] rounded-[100%] border-[0.5px] border-solid border-[rgba(0,0,0,0.25)]'
                      />
                      <p className='text-black text-pc-sub14m line-clamp-1'>
                        {item?.title}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <div
              className={cn(
                'fixed transition-all duration-500 shadow-lg bottom-[-125%] z-[52] left-0 w-full rounded-t-[1.25rem] bg-white pb-[4rem] overflow-hidden',
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
              <div className=''>
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
                      <div
                        key={index}
                        onClick={() => {
                          form.setValue('whereToContact', String(item?.title))
                          setHowToContactAmamyValue({
                            img: item?.img,
                            title: item?.title,
                          })
                          setHowToContactAmamy(false)
                        }}
                        className='space-x-[0.75rem] flex items-center p-[0.75rem] border-[1px] border-solid border-[#F8F8F8] bg-white'
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
                    ),
                  )}
              </div>
            </div>
          </>
        )}
      </form>
    </Form>
  )
}
