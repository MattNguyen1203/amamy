'use client'

import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import useStore from '@/app/(store)/store'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
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
        <h2 className='mb-[1.5rem] font-montserrat text-[1rem] font-bold leading-[1.3rem] tracking-[-0.03rem] text-[#33A6E8] xsm:hidden'>
          Thông tin nhận hàng
        </h2>
        <div className='!mt-0 mb-[1.75rem] flex space-x-[1.5rem] xsm:mb-[1.25rem] xsm:flex-col xsm:space-x-0 xsm:space-y-[1.25rem]'>
          {/* name */}
          <FormField
            control={form.control}
            name='recipientName'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                  Tên người nhận <strong>(*)</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                    placeholder={'Bich Ngoc (ビック ゴック)'}
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                <p className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] text-[rgba(0,0,0,0.80)]'>
                  *Điền chữ tiếng Anh và Kanji hoặc Romanji.
                </p>
              </FormItem>
            )}
          />
        </div>

        <div className='mb-[1.75rem] flex space-x-[1.5rem] xsm:mb-[1.25rem] xsm:flex-col xsm:space-x-0 xsm:space-y-[1.25rem]'>
          <FormField
            control={form.control}
            name='zipCode'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                  Mã bưu điện <strong>(*)</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                    placeholder='939-2716'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='recipientPhone'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                  Số điện thoại <strong>(nếu có)</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                    placeholder='0987654321'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
              </FormItem>
            )}
          />
        </div>

        <div className='mb-[1.75rem] flex space-x-[1.5rem] xsm:mb-[1.25rem] xsm:flex-col xsm:space-x-0 xsm:space-y-[1.25rem]'>
          <FormField
            control={form.control}
            name='recipientAddress'
            render={({field}) => (
              <FormItem className={cn('flex-1 space-y-0')}>
                <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                  Địa chỉ chi tiết
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                    placeholder={'Nhập địa chỉ nhận hàng'}
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                <p className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] text-[rgba(0,0,0,0.80)]'>
                  *Điền chữ tiếng Anh và Kanji hoặc Romanji.
                  <br />
                  *Quý khách vui lòng cung cấp thông tin chi tiết: số phòng, toà
                  nhà nếu có
                  <br />
                  <br />
                  <span className='italic'>
                    Ví dụ: 富⼭県富⼭市 婦中町下管⽥137番地⼯ ⼘婦中305号
                    (Excellent Funauchi 444, 137 Shimo-Kutsuta, Funauchi cho,
                    Toyama-shi, Toyama Prefecture) 939-2716
                  </span>
                </p>
              </FormItem>
            )}
          />
        </div>

        {/* footer */}
        <div className='mt-[1.5rem] flex w-full items-center justify-between space-x-[1.25rem] xsm:fixed xsm:bottom-0 xsm:left-0 xsm:right-0 xsm:z-[49] xsm:mt-0 xsm:space-x-[0.5rem] xsm:bg-[#FAFAFA] xsm:p-[1rem] disabled:xsm:opacity-[1]'>
          <div
            onClick={() => {
              setIndexTab(indexTab - 1)
              handleClickcurrentTab(prevStep)
            }}
            className='flex-1 cursor-pointer rounded-[1.25rem] bg-[#D9F1FF] p-[0.75rem_1.5rem] flex-center'
          >
            <p className='text-black text-pc-sub16m'>Quay lại</p>
          </div>
          <Button
            type='submit'
            disabled={!form.formState.isValid}
            className={cn(
              'ml-auto mt-[0rem] h-[2.8125rem] flex-1 rounded-[1.25rem] bg-[#38B6FF] p-[0.75rem_1.5rem] !shadow-none flex-center hover:bg-[#38B6FF]',
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
