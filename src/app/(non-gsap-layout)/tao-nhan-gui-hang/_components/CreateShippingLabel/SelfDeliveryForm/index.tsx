'use client'
import RHFSelectField from '@/app/(non-gsap-layout)/tao-nhan-gui-hang/_components/RHFFormControl/RHFSelectField'
import {Form, FormField} from '@/components/ui/form'
import {
  SelfDeliveryFormValues,
  selfDeliverySchema,
} from '@/schema/self-delivery.schema'
import {TuGuiRaKhoType} from '@/types/tao-nhan-gui-hang.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import Image from 'next/image'
import {useTransition} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

interface SelfDeliveryFormProps {
  data: TuGuiRaKhoType
}

export default function SelfDeliveryForm({data}: SelfDeliveryFormProps) {
  const [isPending, setTransition] = useTransition()
  const form = useForm<SelfDeliveryFormValues>({
    resolver: zodResolver(selfDeliverySchema),
    defaultValues: {
      deliveryMethod: '',
    },
  })

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = form

  const handleSubmitForm = async (data: SelfDeliveryFormValues) => {
    if (isPending) return
    console.log(data)
    // setTransition(async () => {
    //   const dataForm = {
    //     fullname: data.deliveryMethod,
    //   }
    //   const request = new CF7Request(dataForm)
    //   const response = await request.send(endpoints.contactForm)
    //   if (response?.invalid_fields?.length === 0) {
    //     toast.success('Đăng ký nhận ưu đãi thành công')
    //   } else {
    //     toast.error('Thất bại, vui lòng thử lại')
    //   }
    //   form.reset()
    // })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className='relative w-full space-y-[1.5rem] rounded-[3rem] bg-[#F8F8F8] p-[1.75rem] xsm:rounded-none xsm:bg-transparent xsm:p-0'
      >
        <div className='space-y-[1.25rem] xsm:space-y-[0.75rem]'>
          <div className='space-y-[1rem] rounded-[1.75rem] bg-white p-[1.5rem] xsm:rounded-[2rem] xsm:p-[1rem] xsm:shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)]'>
            <div className='space-y-[0.5rem]'>
              <FormField
                control={control}
                name='deliveryMethod'
                render={({field}) => (
                  <RHFSelectField
                    label='Chọn chi nhánh Amamy Post (*)'
                    placeholder='Chọn chi nhánh Amamy Post (*)'
                    options={[
                      {
                        name: 'California',
                        value: 'california',
                        icon: '/icons/d-flag-1.svg',
                      },
                    ]}
                    hasPrefix={true}
                    field={field}
                  />
                )}
              />
            </div>
            <div className='flex items-start space-x-[2.5rem] xsm:flex-col xsm:space-x-0 xsm:space-y-[1rem]'>
              <div
                dangerouslySetInnerHTML={{__html: data?.instruction || ''}}
                className='flex-1 space-y-[0.625rem] text-[0.875rem] font-medium leading-[1.5] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] xsm:text-[0.8125rem] xsm:tracking-[-0.02438rem] [&_strong]:font-semibold xsm:[&_strong]:text-[0.875rem]'
              ></div>
              <div className='h-[12.5rem] w-[20.4375rem] overflow-hidden rounded-[0.5rem] xsm:w-full'>
                {data?.image?.url && (
                  <Image
                    width={330}
                    height={200}
                    src={data?.image?.url}
                    alt={data?.image?.alt}
                    className='size-full object-cover'
                  />
                )}
              </div>
            </div>
          </div>

          <div className='space-y-[0.625rem] rounded-[1.75rem] bg-white px-[0.875rem] py-[1.25rem] xsm:rounded-[2rem] xsm:py-[1rem] xsm:shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)]'>
            <div className='flex items-center space-x-[0.375rem]'>
              <Image
                alt=''
                width={48}
                height={48}
                src='/icons/icon-note.svg'
                className='h-auto w-[1.5rem]'
              />
              <p className='text-[1rem] font-bold leading-[1.5] tracking-[-0.03rem] text-[#33A6E8] xsm:text-[0.875rem] xsm:tracking-[-0.02625rem]'>
                LƯU Ý QUAN TRỌNG
              </p>
            </div>
            <div
              dangerouslySetInnerHTML={{__html: data?.note || ''}}
              className='flex-1 space-y-[0.625rem] px-[1.875rem] text-[0.875rem] font-medium leading-[1.5] tracking-[-0.02625rem] text-[rgba(0,0,0,0.8)] xsm:px-0 xsm:text-[0.8125rem] [&_li]:ml-[1.5rem] xsm:[&_li]:ml-[1.25rem] [&_li_ol]:mt-[0.625rem] xsm:[&_li_ol]:mt-[0.5rem] [&_li_ul]:mt-[0.625rem] xsm:[&_li_ul]:mt-[0.5rem] [&_ol]:list-decimal [&_ol]:space-y-[0.625rem] xsm:[&_ol]:space-y-[0.5rem] [&_strong]:font-semibold [&_strong]:text-[rgba(0,0,0,0.92)] [&_ul]:list-disc [&_ul]:space-y-[0.625rem] xsm:[&_ul]:space-y-[0.5rem]'
            ></div>
          </div>
        </div>
        <div className='flex justify-end xsm:justify-center'>
          <button
            type='submit'
            disabled={isPending}
            className='h-[2.8125rem] w-[43.375rem] cursor-pointer rounded-[1.25rem] border border-solid border-white/80 bg-[#38B6FF] flex-center disabled:cursor-not-allowed disabled:opacity-50 xsm:h-[2.625rem] xsm:w-full'
          >
            <span className='text-[1rem] font-medium leading-[1.3] tracking-[-0.03rem] text-white xsm:text-[0.875rem] xsm:tracking-[-0.02625rem]'>
              Xác nhận
            </span>
          </button>
        </div>
      </form>
    </Form>
  )
}
