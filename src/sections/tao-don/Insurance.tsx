'use client'
import useStore from '@/app/(store)/store'
import ImageV2 from '@/components/image/ImageV2'
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
import {
  IInformationInsurance,
  IInformationInsurance_CargoInsuranceJapanvn,
  IInformationInsurance_policy,
} from '@/sections/tao-don/oder.interface'
import {zodResolver} from '@hookform/resolvers/zod'
import {useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
export default function Insurance({
  data,
  handleClickcurrentTab,
  setIndexTab,
  indexTab,
  setSelectedImage,
}: {
  data?: IInformationInsurance
  handleClickcurrentTab: (nextTab: string) => void
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
}) {
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const FormSchema = z.object({
    order: z.array(
      z.boolean().refine((value) => value === true, {
        message: 'Vui lòng đồng ý với điều khoản của chúng tôi.',
      }),
    ),
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      order: Array.isArray(data?.compensation?.policy)
        ? data?.compensation?.policy?.map(() => (stepOrder > 5 ? true : false))
        : Array.isArray(data?.cargo_insurance_japanvn)
          ? data?.cargo_insurance_japanvn?.map(() =>
              stepOrder > 5 ? true : false,
            )
          : [],
    },
  })
  useEffect(() => {
    containerRefs.current.forEach((container) => {
      if (!container) return
      const images = container.querySelectorAll('img')
      images.forEach((img) => {
        img.style.cursor = 'pointer' // Biến con trỏ thành bàn tay khi hover
        img.onclick = () => {
          setSelectedImage(img.src)
        } // Khi click, mở ảnh lên
      })
    })
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
      if (stepOrder < 6) {
        setStepOrder(6)
      }
      handleClickcurrentTab('6')
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
        {data?.compensation && (
          <>
            <div className='mb-[1rem]'>
              <p className='text-black text-pc-tab-title'>
                {data?.compensation?.title}
              </p>
              <p className='text-pc-sub14m text-[rgba(0,0,0,0.80)]'>
                {data?.compensation?.desc}
              </p>
            </div>
            {Array.isArray(data?.compensation?.policy) &&
              data?.compensation?.policy?.map(
                (item: IInformationInsurance_policy, index: number) => (
                  <div
                    key={index}
                    className='p-[1rem] rounded-[1.25rem] bg-white space-y-[1.2rem]'
                  >
                    <div
                      ref={(el) => {
                        containerRefs.current[index] = el
                      }}
                      className=' [&_a]:text-[#0084FF] [&_img]:rounded-[1.25rem] [&_img]:mb-[1.2rem] [&_p]:pt-[0.75rem] first:[&_p]:pt-0 [&_h3]:text-pc-tab-title [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]:text-black *:text-black *:text-pc-sub14s *:xsm:text-mb-13 [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-black [&_ol]:content-ol [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 xsm:marker:[&_ul_li]:text-[0.5rem]'
                      dangerouslySetInnerHTML={{
                        __html: item?.content || '',
                      }}
                    ></div>
                    <FormField
                      control={form.control}
                      name={`order.${index}`}
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
                            <FormLabel className=' cursor-pointer text-pc-sub14m !font-semibold text-black xsm:text-mb-13M xsm:line-clamp-2'>
                              {item?.clause ||
                                'Tôi đã đọc và đồng ý với chính sách về kiện hàng'}
                            </FormLabel>
                          </div>
                          <FormMessage className='pl-[0.75rem] !text-[#F00] text-pc-sub12m absolute bottom-[-80%] left-0' />
                        </FormItem>
                      )}
                    />
                  </div>
                ),
              )}
          </>
        )}
        {Array.isArray(data?.cargo_insurance_japanvn) &&
          data?.cargo_insurance_japanvn?.map(
            (
              item: IInformationInsurance_CargoInsuranceJapanvn,
              index: number,
            ) => (
              <div
                key={index}
                className='p-[1rem] rounded-[1.25rem] bg-white space-y-[1.2rem]'
              >
                <p className='xsm:text-pc-sub14s mb-[0.88rem] text-black font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
                  {item?.title}
                </p>
                <div className='flex xsm:flex-col-reverse sm:space-x-[1rem] bg-white'>
                  <div
                    ref={(el) => {
                      containerRefs.current[index] = el
                    }}
                    className='[&_img]:rounded-[1.25rem] [&_img]:mb-[1.2rem] flex-1 [&_a]:text-[#0084FF] [&_h3]:text-pc-tab-title [&_h3]: [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]: [&_strong]:text-black *:text-[rgba(0,0,0,0.60)] *:text-pc-sub14s *:xsm:text-mb-13 *: [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.60)] xsm:marker:[&_ul_li]:text-[0.5rem]'
                    dangerouslySetInnerHTML={{
                      __html: item?.content || '',
                    }}
                  ></div>
                  {item?.image && (
                    <div
                      className='flex-1'
                      ref={(el) => {
                        containerRefs.current[index] = el
                      }}
                    >
                      <ImageV2
                        src={item?.image}
                        alt=''
                        width={500 * 2}
                        height={300 * 2}
                        className=' rounded-[0.5rem] xsm:mb-[0.5rem] xsm:w-full h-[14.81838rem] xsm:h-[12.95831rem] object-cover'
                      />
                    </div>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name={`order.${index}`}
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
                        <FormLabel className=' cursor-pointer text-pc-sub14m !font-semibold text-black xsm:text-mb-13M xsm:line-clamp-2'>
                          {item?.clause ||
                            'Tôi đã đọc và đồng ý với chính sách về kiện hàng'}
                        </FormLabel>
                      </div>
                      <FormMessage className='pl-[0.75rem] !text-[#F00] text-pc-sub12m absolute bottom-[-80%] left-0' />
                    </FormItem>
                  )}
                />
              </div>
            ),
          )}
        <div className='space-x-[2rem] xsm:p-[1rem] xsm:bg-[#FAFAFA] xsm:space-x-[0.5rem] xsm:fixed xsm:bottom-0 xsm:z-[49] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0 flex items-center justify-between sm:w-full'>
          <div
            onClick={() => {
              setIndexTab(indexTab - 1)
              handleClickcurrentTab('4')
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
