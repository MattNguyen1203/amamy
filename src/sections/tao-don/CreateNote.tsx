'use client'
import useStore from '@/app/(store)/store'
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
import {cn} from '@/lib/utils'
import {IInformationNoteOrder} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
export default function CeateNote({
  data,
  handleClickcurrentTab,
  type,
  prevStep,
}: {
  data?: IInformationNoteOrder[]
  handleClickcurrentTab: (nextTab: string) => void
  type: string
  prevStep: string
}) {
  const FormSchema = z.object({
    note: z.array(
      z.boolean().refine((value) => value === true, {
        message: 'Vui lòng đồng ý với điều khoản của chúng tôi.',
      }),
    ),
  })
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      note: Array.isArray(data)
        ? data?.map(() => (stepOrder > 3 ? true : false))
        : [],
    },
  })
  const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'})
  useEffect(() => {
    if (triggerScroll) {
      scrollToTop()
      setTriggerScroll(false)
    }
  }, [triggerScroll])
  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (values) {
      if (stepOrder < 4) {
        setStepOrder(4)
      }
      form.reset()
      handleClickcurrentTab('4')
      setTriggerScroll(true)
    }
  }
  return (
    <div className=''>
      <p className='text-black text-pc-sub16b mb-[1.5rem] xsm:mb-[0.75rem]'>
        Lưu ý quan trọng khi gửi hàng
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-[1.5rem] xsm:space-y-[0.75rem]'
        >
          {Array.isArray(data) &&
            data?.map((item: IInformationNoteOrder, index: number) => (
              <div
                key={index}
                className='p-[1rem] rounded-[1.25rem] bg-white space-y-[1rem]'
              >
                <p className='xsm:text-pc-sub14s mb-[0.88rem] text-black font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
                  {item?.title}
                </p>
                <div
                  className={cn(
                    '[&_img]:w-full [&_img]:max-h-[50vh] [&_img]:h-auto [&_p]:pt-[0.75rem] first:[&_p]:pt-0 [&_h3]:text-pc-tab-title [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]:text-black *:text-[rgba(0,0,0,0.90)] *:text-pc-sub14m *:xsm:text-mb-13 [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)] [&_ol]:content-ol [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 xsm:marker:[&_ul_li]:text-[0.5rem]',
                    type === 'viethan' && 'marker:[&_ul_li]:text-[#f00]',
                  )}
                  dangerouslySetInnerHTML={{
                    __html: item?.text || '',
                  }}
                ></div>
                <FormField
                  control={form.control}
                  name={`note.${index}`}
                  render={({field}) => (
                    <FormItem className='relative flex flex-row items-center space-y-0 space-x-[0.5rem] border-none'>
                      <FormControl>
                        <Checkbox
                          className='[&_.svg-none-check]:aria-[checked=false]:block size-[1.5rem] xsm:size-[1.25rem] flex-center border-none data-[state=checked]:bg-[#FFEC1F] bg-[#FFEC1F] data-[state=checked]:text-[#000000] text-[#000000]'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel className='cursor-pointer text-pc-sub14m text-black xsm:text-mb-13M xsm:line-clamp-2'>
                          {item?.agree_with ||
                            'Tôi đã đọc và đồng ý với chính sách về kiện hàng'}
                        </FormLabel>
                      </div>
                      <FormMessage className='!text-[#F00] text-pc-sub12m absolute bottom-[-80%] left-0' />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          <div className='xsm:p-[1rem] xsm:bg-[#FAFAFA] xsm:shadow-lg xsm:space-x-[0.5rem] xsm:fixed xsm:bottom-0 xsm:z-[49] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0 flex items-center justify-between sm:w-full'>
            <div
              onClick={() => handleClickcurrentTab(prevStep)}
              className='xsm:flex-1 cursor-pointer p-[0.75rem_1.5rem] flex-center rounded-[1.25rem] bg-[#D9F1FF]'
            >
              <p className='text-pc-sub16m text-black'>Quay lại</p>
            </div>
            <Button
              type='submit'
              disabled={!form.formState.isValid}
              className={cn(
                '!shadow-none xsm:flex-1 hover:bg-[#38B6FF] mt-[0rem] ml-auto h-[2.8125rem] flex-center p-[0.75rem_1.5rem] rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]',
                !form.formState.isValid &&
                  'bg-[#F0F0F0] [&_p]:text-[rgba(0,0,0,0.30)]',
              )}
            >
              <p className='text-white text-pc-sub16m'>Tiếp tục</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
