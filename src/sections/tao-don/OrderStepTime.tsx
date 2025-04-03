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
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import {
  ICreateOder,
  IInformationTimeOrder,
} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import {Fragment, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
export default function OrderStepTime({
  dataInformation,
  handleClickcurrentTab,
  nextStep,
  setIndexTab,
  indexTab,
  setDataInformation,
  setDataFromOrder,
  dataFromOrder,
}: {
  dataInformation?: IInformationTimeOrder[]
  handleClickcurrentTab: (nextTab: string) => void
  nextStep: string
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
  setDataInformation: React.Dispatch<
    React.SetStateAction<ICreateOder | undefined>
  >
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  dataFromOrder: IDataFromOrder
}) {
  const FormSchema = z.object({
    policy: z.array(
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
      policy: Array.isArray(dataInformation)
        ? dataInformation?.map(() => (stepOrder > 2 ? true : false))
        : [],
    },
  })
  useEffect(() => {
    if (!dataInformation) {
      if (stepOrder < 3) {
        setStepOrder(3)
      }
      handleClickcurrentTab('3')
      setTriggerScroll(true)
    }
  }, [])
  const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'})
  useEffect(() => {
    if (triggerScroll) {
      scrollToTop()
      setTriggerScroll(false)
    }
  }, [triggerScroll])
  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data) {
      if (stepOrder < 3) {
        setStepOrder(Number(nextStep))
      }
      setIndexTab(indexTab + 1)
      form.reset()
      handleClickcurrentTab(nextStep)
      setTriggerScroll(true)
    }
  }
  return (
    <div className='space-y-[1.5rem] xsm:space-y-[0.75rem]'>
      <p className='sm:hidden text-pc-sub16b text-black'>Thời gian gửi hàng</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-[1.59rem]'
        >
          {Array.isArray(dataInformation) &&
            dataInformation?.map(
              (item: IInformationTimeOrder, index: number) => (
                <Fragment key={index}>
                  <div className='p-[1rem] rounded-[1.25rem] bg-white'>
                    <p className='xsm:text-pc-sub14s mb-[0.88rem] text-black font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
                      {item?.time_content}
                    </p>
                    <div
                      className='[&_a]:text-[#0084FF] mb-[1rem] [&_h3]:text-pc-tab-title [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]:text-black *:text-[rgba(0,0,0,0.60)] *:text-pc-14 *:font-semibold *:xsm:text-mb-13 [&>p>span]:font-medium [&_ul]:content-ul marker:[&_ul_li]:text-[rgba(0,0,0,0.60)] [&_ol]:content-ol [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 marker:[&_ul_li]:text-[0.65rem] xsm:marker:[&_ul_li]:text-[0.5rem] [&_em]:not-italic [&_em]:text-[0.75rem] [&_em]:font-semibold [&_em]:tracking-[-0.015rem] [&_em]:text-[#8F8F8F]'
                      dangerouslySetInnerHTML={{
                        __html: item?.stock || '',
                      }}
                    ></div>
                    <FormField
                      control={form.control}
                      name={`policy.${index}`}
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
                            <FormLabel className='text-pc-sub14s xsm:text-mb-13M xsm:line-clamp-2 text-black cursor-pointer'>
                              {item?.clause ||
                                'Tôi đồng ý với điều khoản của Amamy'}
                            </FormLabel>
                          </div>
                          <FormMessage className='pl-[0.75rem] !text-[#F00] text-pc-sub12m absolute bottom-[-80%] left-0' />
                        </FormItem>
                      )}
                    />
                  </div>
                </Fragment>
              ),
            )}
          <div className='space-x-[2rem] xsm:space-x-[0.5rem] xsm:fixed xsm:bottom-0 xsm:z-[49] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0 xsm:p-[1rem] xsm:bg-[#FAFAFA] flex items-center justify-between sm:w-full'>
            <div
              onClick={() => {
                handleClickcurrentTab('1')
                setIndexTab(indexTab - 1)
                setDataInformation(undefined)
                setDataFromOrder({...dataFromOrder})
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
    </div>
  )
}
