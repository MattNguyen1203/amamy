'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import CF7Request from '@/fetch/cf7Request'
import {cn} from '@/lib/utils'
import endpoints from '@/utils/endpoints'
import {zodResolver} from '@hookform/resolvers/zod'
import {useTransition} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'
import {z} from 'zod'

const ReceivingIncentivesFrom = () => {
  const [isPending, setTransition] = useTransition()
  const formSchema = z.object({
    email: z.string().email({
      message: 'Email không hợp lệ',
    }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isPending) return
    setTransition(async () => {
      const dataForm = {
        email: values.email,
      }
      const request = new CF7Request(dataForm)
      const response = await request.send(endpoints.contactForm)
      if (response?.invalid_fields?.length === 0) {
        toast.success('Đăng ký nhận ưu đãi thành công')
      } else {
        toast.error('Thất bại, vui lòng thử lại')
      }
      form.reset()
    })
  }

  return (
    <div className='w-[37.4375rem] text-[var(--greyscaletext-0)] gap-[0.77rem] flex flex-col xsm:mt-[1.5rem] xsm:w-full'>
      <p className='text-[1.25rem] not-italic font-bold leading-[120%] xsm:text-center xsm:text-pc-sub14b'>
        Đăng ký nhận ưu đãi
      </p>
      <div className='relative w-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='email'
              render={({field}) => (
                <FormItem className='flex-1 space-y-[0.25rem] relative'>
                  <FormControl>
                    <Input
                      className='flex w-full bg-white h-14 pl-5 pr-3 py-3 items-center gap-2.5 self-stretch text-[#6A6A6A] text-[0.875rem] not-italic font-medium leading-[150%] rounded-[20px]'
                      placeholder='Email của bạn'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='absolute -bottom-8 text-[0.875rem] font-medium' />
                </FormItem>
              )}
            />
            <button
              type='submit'
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2',
                isPending && 'cursor-not-allowed opacity-50',
              )}
            >
              <ArrowRightCircle className='size-8' />
            </button>
          </form>
        </Form>
      </div>
    </div>
  )
}
export default ReceivingIncentivesFrom

const ArrowRightCircle = ({className}: {className?: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14 27.611C21.3638 27.611 27.3333 21.6415 27.3333 14.2777C27.3333 6.91387 21.3638 0.944336 14 0.944336C6.63616 0.944336 0.666626 6.91387 0.666626 14.2777C0.666626 21.6415 6.63616 27.611 14 27.611ZM16.0404 9.57056L20.0404 13.5706C20.4309 13.9611 20.4309 14.5943 20.0404 14.9848L16.0404 18.9848C15.6499 19.3753 15.0167 19.3753 14.6262 18.9848C14.2357 18.5943 14.2357 17.9611 14.6262 17.5706L16.9191 15.2777H8.66662C8.11434 15.2777 7.66662 14.83 7.66662 14.2777C7.66662 13.7254 8.11434 13.2777 8.66662 13.2777H16.9191L14.6262 10.9848C14.2357 10.5943 14.2357 9.96109 14.6262 9.57056C15.0167 9.18004 15.6499 9.18004 16.0404 9.57056Z'
        fill='#38B6FF'
      />
    </svg>
  )
}
