'use client'
import useStore from '@/app/(store)/store'
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
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import {zodResolver} from '@hookform/resolvers/zod'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
const formSchema = z.object({
  recipientName: z
    .string({
      required_error: 'Vui lòng tên người nhận',
    })
    .min(1, 'Vui lòng tên người nhận'),
  recipientPhone: z.string().optional(),
  recipientAddress: z
    .string({
      required_error: 'Vui lòng nhập địa chỉ (Tên đường, số nhà) người nhận',
    })
    .min(1, 'Vui lòng nhập địa chỉ (Tên đường, số nhà) người nhận'),
  zipCode: z
    .string({
      required_error: 'Vui lòng nhập mã bưu điện',
    })
    .min(1, 'Vui lòng nhập mã bưu điện'),
})

export default function FormDeliveryInformationVNJapan({
  handleClickcurrentTab,
  setDataFromOrder,
  dataFromOrder,
  prevStep,
  nextStep,
  setIndexTab,
  indexTab,
}: {
  handleClickcurrentTab: (nextTab: string) => void
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  dataFromOrder: IDataFromOrder
  prevStep: string
  nextStep: string
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
}) {
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      recipientName: dataFromOrder?.recipientName ?? '',
      recipientPhone: dataFromOrder?.recipientPhone ?? '',
      recipientAddress: dataFromOrder?.recipientAddress ?? '',
      zipCode: dataFromOrder?.zipCode ?? '',
    },
  })
  const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'})
  useEffect(() => {
    if (triggerScroll) {
      scrollToTop()
      setTriggerScroll(false)
    }
  }, [triggerScroll])
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setDataFromOrder({...dataFromOrder, ...values})
    if (stepOrder < 5) {
      setStepOrder(Number(nextStep))
    }
    setIndexTab(indexTab + 1)
    handleClickcurrentTab(nextStep)
    setTriggerScroll(true)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-[1.75rem] xsm:space-y-[1.25rem]'
      >
        <p className='text-black text-pc-sub16b !mb-[1.5rem] xsm:!mb-[1rem]'>
          Thông tin nhận hàng
        </p>
        <FormField
          control={form.control}
          name='recipientName'
          render={({field}) => (
            <FormItem className='flex-1 space-y-0'>
              <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                Tên người nhận (*)
              </FormLabel>
              <FormControl>
                <Input
                  className='shadow-none xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                  placeholder={'Bich Ngoc (ビック ゴック)'}
                  {...field}
                />
              </FormControl>
              <FormMessage className='pl-[0.75rem] !mt-[0.25rem] !text-[#F00] text-pc-sub12m' />
              <p className='!font-roboto pl-[0.75rem] text-[rgba(0,0,0,0.60)] text-pc-sub12m !mt-[0.25rem]'>
                *Điền chữ tiếng Anh và Kanji hoặc Romanji.
              </p>
            </FormItem>
          )}
        />
        <div className='flex xsm:flex-col xsm:space-y-[1.25rem] sm:space-x-[1.5rem]'>
          <FormField
            control={form.control}
            name='zipCode'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Mã bưu điện (*)
                </FormLabel>
                <FormControl>
                  <Input
                    className='shadow-none xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='939-2716'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='pl-[0.75rem] xsm:text-mb-sub10m !mt-[0.25rem] !text-[#F00] text-pc-sub12m' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='recipientPhone'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Số điện thoại (nếu có)
                </FormLabel>
                <FormControl>
                  <Input
                    className='shadow-none xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='0987654321'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='pl-[0.75rem] xsm:text-mb-sub10m !mt-[0.25rem] !text-[#F00] text-pc-sub12m' />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='recipientAddress'
          render={({field}) => (
            <FormItem className={cn('flex-1 space-y-0')}>
              <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                Địa chỉ chi tiết
              </FormLabel>
              <FormControl>
                <Input
                  className='shadow-none disabled:opacity-[1] xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                  placeholder={'Nhập địa chỉ nhận hàng'}
                  {...field}
                />
              </FormControl>
              <FormMessage className='pl-[0.75rem] !mt-[0.25rem] !text-[#F00] text-pc-sub12m' />
              <p className='!font-roboto pl-[0.75rem] text-[rgba(0,0,0,0.60)] text-pc-sub12m !mt-[0.25rem]'>
                *Điền chữ tiếng Anh và Kanji hoặc Romanji.
                <br />
                *Quý khách vui lòng cung cấp thông tin chi tiết: số phòng, toà
                nhà nếu có <br />
                <span className='!font-roboto'></span>
                <br />
                <span className='italic !font-roboto'>
                  Ví dụ: 富⼭県富⼭市 婦中町下管⽥137番地⼯ ⼘婦中305号
                  (Excellent Funauchi 444, 137 Shimo-Kutsuta, Funauchi cho,
                  Toyama-shi, Toyama Prefecture) 939-2716
                </span>
              </p>
            </FormItem>
          )}
        />
        <div className='space-x-[2rem] xsm:p-[1rem] xsm:bg-[#FAFAFA] xsm:shadow-lg xsm:space-x-[0.5rem] xsm:fixed xsm:bottom-0 xsm:z-[49] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0 flex items-center justify-between sm:w-full'>
          <div
            onClick={() => {
              setIndexTab(indexTab - 1)
              handleClickcurrentTab(prevStep)
            }}
            className='flex-1 cursor-pointer p-[0.75rem_1.5rem] flex-center rounded-[1.25rem] bg-[#D9F1FF]'
          >
            <p className='text-pc-sub16m text-black'>Quay lại</p>
          </div>
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
        </div>
      </form>
    </Form>
  )
}
