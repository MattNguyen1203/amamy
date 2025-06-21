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
} from '@/components/ui/form'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import {IInformationOrder} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

export default function Package({
  data,
  handleClickcurrentTab,
  setIndexTab,
  indexTab,
  setDataFromOrder,
  dataFromOrder,
}: {
  data: IInformationOrder['package']
  handleClickcurrentTab: (nextTab: string) => void
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  dataFromOrder: IDataFromOrder
}) {
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const FormSchema = z.object({
    package: z.string().min(1, 'Vui lòng chọn loại bảo hiểm'),
    packageMessage: z.string().min(1, 'Vui lòng nhập nội dung'),
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      package: data?.list_package
        ? dataFromOrder?.package ?? ''
        : 'Chưa có thông tin',
      packageMessage: dataFromOrder?.packageMessage ?? '',
    },
  })
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'})
  useEffect(() => {
    if (triggerScroll) {
      scrollToTop()
      setTriggerScroll(false)
    }
  }, [triggerScroll])
  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (values) {
      if (stepOrder < 7) {
        setStepOrder(7)
      }
      setDataFromOrder({
        ...dataFromOrder,
        package: values.package,
        packageMessage: values.packageMessage,
      })
      handleClickcurrentTab('7')
      setTriggerScroll(true)
      setIndexTab(indexTab + 1)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-[1.5rem] xsm:space-y-[0.75rem]'
      >
        {data?.list_package && (
          <>
            <div className='p-[1rem] rounded-[1.25rem] bg-white border-[1px] border-solid border-[#DCDFE4]'>
              <p className='mb-[1rem] text-[rgba(0,0,0,0.92)] font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
                {data?.title || 'Chọn cách đóng gói'}
              </p>
              <div className='flex flex-col space-y-[1rem]'>
                {Array.isArray(data?.list_package) &&
                  data?.list_package?.map((packageItem, packageIndex) => (
                    <FormField
                      key={packageIndex}
                      control={form.control}
                      name={`package`}
                      render={({field}) => (
                        <FormItem className='relative flex flex-row items-center space-y-0 space-x-[0.5rem] border-none'>
                          <FormControl>
                            <Checkbox
                              className='[&_svg]:!hidden size-[1.25rem] rounded-[100%] border-[1.66667px] border-solid border-[#000000] data-[state=checked]:!border-[#38B6FF] !bg-white flex-center [&>span]:data-[state=checked]:!bg-[#38B6FF] [&>span]:bg-transparent [&>span]:size-[0.75rem] [&>span]:rounded-[100%]'
                              checked={field.value === packageItem?.label}
                              onCheckedChange={(checked) => {
                                field.onChange(
                                  checked ? packageItem?.label : undefined,
                                )
                              }}
                            />
                          </FormControl>
                          <div className='leading-none space-y-[0rem] flex flex-col'>
                            <div className='flex xsm:flex-col-reverse sm:items-center sm:space-x-[0.3875rem]'>
                              <FormLabel className='text-pc-sub14s !font-semibold xsm:text-mb-13S xsm:!font-semibold xsm:line-clamp-2 text-black/[0.92] cursor-pointer'>
                                {packageItem?.label}
                              </FormLabel>
                              {packageItem?.tag && (
                                <p className='xsm:mb-[0.5rem] xsm:w-max p-[0.25rem_0.75rem] flex-center rounded-[62.5rem] bg-[#5DAF46] text-pc-sub14m xsm:text-[0.625rem] xsm:font-semibold xsm:leading-[1.4] xsm:tracking-[-0.01875rem] text-white'>
                                  {packageItem?.tag}
                                </p>
                              )}
                            </div>
                            {packageItem?.desc && (
                              <FormLabel className='pt-[0.5rem] text-pc-sub14m text-[rgba(0,0,0,0.80)] cursor-pointer'>
                                <p
                                  className='text-pc-sub14m text-[rgba(0,0,0,0.80)]'
                                  dangerouslySetInnerHTML={{
                                    __html: packageItem?.desc,
                                  }}
                                ></p>
                              </FormLabel>
                            )}
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
              </div>
            </div>
            {data?.note_more && (
              <p
                className='my-[1rem] text-pc-sub14m text-[#F00]'
                dangerouslySetInnerHTML={{__html: data?.note_more ?? ''}}
              ></p>
            )}
          </>
        )}

        <FormField
          control={form.control}
          name={`packageMessage`}
          render={({field}) => (
            <FormItem className='relative flex flex-col items-start space-y-[0.38rem]'>
              <FormLabel className='pt-[0.5rem] text-pc-sub14m text-[rgba(0,0,0,0.80)] cursor-pointer'>
                <p className='text-pc-sub12s text-[rgba(0,0,0,0.80)]'>
                  Viết yêu cầu của bạn (*)
                </p>
              </FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder='Nhập nội dung'
                  className='flex h-[14.5rem] w-full rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[1rem] text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='space-x-[2rem] xsm:p-[1rem] xsm:bg-[#FAFAFA] xsm:space-x-[0.5rem] xsm:fixed xsm:bottom-0 xsm:z-[49] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0 flex items-center justify-between sm:w-full'>
          <div
            onClick={() => {
              setIndexTab(indexTab - 1)
              handleClickcurrentTab('5')
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
