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
import {useScrollToTop} from '@/hooks/useScrollToTop'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import {ICreateOder} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
const formSchema = z.object({
  email: z.string().email({
    message: 'Địa chỉ email không đúng!',
  }),
  shipping: z.string({
    required_error: 'Vui lòng chọn chiều dịch vụ',
  }),
  customercode: z.string().optional(),
})

export default function FormStepStart({
  data,
  onSuccess,
  setDataFromOrder,
  dataFromOrder,
}: {
  data: ICreateOder[]
  onSuccess: (nextTab: string) => void
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  dataFromOrder: IDataFromOrder
}) {
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: dataFromOrder?.email || '',
      shipping: dataFromOrder?.shipping || '',
      customercode: dataFromOrder?.customercode || '',
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
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
        <div className='flex space-x-[1.5rem] mb-[1.75rem]'>
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
                    className='aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='Email@email'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!text-[#F00] text-pc-sub12m' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='shipping'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Chọn chiều dịch vụ (*)
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='aria-[invalid=true]:!border-[#F00] bg-white mt-[0.37rem] p-[0.75rem_0.75rem_0.75rem_1rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] [&_svg]:filter [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:opacity-[1]'>
                    <SelectTrigger className='h-[3rem] [&_span]:!text-black [&_span]:text-pc-sub14m focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                      <SelectValue placeholder='Chọn chiều dịch vụ' />
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
                <FormMessage className='!text-[#F00] text-pc-sub12m' />
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
                  className='aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                  placeholder='Nhập mã khách hàng'
                  {...field}
                />
              </FormControl>
              <FormMessage className='!text-[#F00] text-pc-sub12m' />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={!form.formState.isValid}
          className={cn(
            'hover:bg-[#38B6FF] mt-[1.5rem] ml-auto h-[2.8125rem] flex-center p-[0.75rem_1.5rem] rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]',
            !form.formState.isValid &&
              'bg-[#F0F0F0] [&_p]:text-[rgba(0,0,0,0.30)]',
          )}
        >
          <p className='text-white text-pc-sub16m'>Tiếp tục</p>
        </Button>
      </form>
    </Form>
  )
}
