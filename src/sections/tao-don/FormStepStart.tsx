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
import {useScrollToTop} from '@/hooks/useScrollToTop'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import ICX from '@/sections/tao-don/ICX'
import {ICreateOder} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
const formSchema = z.object({
  email: z.string().email({
    message: 'Địa chỉ email không đúng!',
  }),
  shipping: z
    .string({
      required_error: 'Vui lòng chọn chiều dịch vụ',
    })
    .min(1, 'Vui lòng chọn chiều dịch vụ'),
  customercode: z.string().optional(),
})

export default function FormStepStart({
  data,
  onSuccess,
  setDataFromOrder,
  dataFromOrder,
  dataInformation,
  sentGoodsAtAmamy,
}: {
  data: ICreateOder[]
  onSuccess: (nextTab: string) => void
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  dataFromOrder: IDataFromOrder
  dataInformation?: ICreateOder
  sentGoodsAtAmamy: boolean
}) {
  const isMobile = useIsMobile()
  const [selectServiceDimension, setSelectServiceDimension] =
    useState<boolean>(false)
  const [selectServiceDimensionValue, setSelectServiceDimensionValue] =
    useState<{img: string; title: string}>({img: '', title: ''})
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: dataFromOrder?.email || '',
      shipping: dataFromOrder?.shipping || '',
      customercode: dataFromOrder?.customercode || '',
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (sentGoodsAtAmamy) {
    }
    setDataFromOrder({...dataFromOrder, ...values})
    if (stepOrder < 2) {
      setStepOrder(2)
    }
    onSuccess('2')
    useScrollToTop()
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
                    className='xsm:h-[2.5rem] aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m xsm:text-mb-13M mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='Email@email'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='shipping'
            render={({field}) => (
              <FormItem
                onClick={() => setSelectServiceDimension(true)}
                className='flex-1 space-y-0'
              >
                <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Chọn chiều dịch vụ (*)
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='xsm:pointer-events-none aria-[invalid=true]:!border-[#F00] bg-white mt-[0.37rem] p-[0.75rem_0.75rem_0.75rem_1rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] [&_svg]:filter [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:opacity-[1]'>
                    <SelectTrigger className='xsm:h-[2.5rem] h-[3rem] [&_span]:!text-black [&_span]:text-pc-sub14m [&_span]:xsm:text-mb-13M focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
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
                          className='h-[3rem] rounded-[1.25rem] p-[0.75rem] bg-white flex items-center'
                          value={String(item?.id)}
                        >
                          <div className='space-x-[0.75rem] flex items-center flex-1'>
                            <ImageV2
                              src={
                                item?.thumbnail || '/order/flag-germany.webp'
                              }
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
        </div>
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
                  className='xsm:h-[2.5rem] aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m xsm:text-mb-13M mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                  placeholder='Nhập mã khách hàng'
                  {...field}
                />
              </FormControl>
              <FormMessage className='!text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={isMobile ? false : !form.formState.isValid}
          className={cn(
            'xsm:fixed xsm:bottom-[1rem] xsm:z-[51] disabled:xsm:opacity-[1] xsm:left-[1rem] xsm:right-[1rem] hover:bg-[#38B6FF] mt-[1.5rem] xsm:mt-0 ml-auto h-[2.8125rem] flex-center p-[0.75rem_1.5rem] rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]',
            !form.formState.isValid &&
              'sm:bg-[#F0F0F0] [&_p]:sm:text-[rgba(0,0,0,0.30)]',
          )}
        >
          <p className='text-white text-pc-sub16m xsm:text-pc-sub14m'>
            Tiếp tục
          </p>
        </Button>
        {isMobile && (
          <>
            <div
              onClick={() => setSelectServiceDimension(false)}
              className={cn(
                'fixed transition-all duration-700 inset-0 bg-black/70 z-[51] hidden',
                selectServiceDimension && 'block',
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
                  onClick={() => setSelectServiceDimension(false)}
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
          </>
        )}
      </form>
    </Form>
  )
}
