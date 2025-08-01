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
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
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
  dataFromOrder,
  setDataFromOrder,
  type,
}: {
  data?: IInformationInsurance
  handleClickcurrentTab: (nextTab: string) => void
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
  dataFromOrder: IDataFromOrder
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  type: string
}) {
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const FormSchema = z.object({
    order: z
      .array(
        z.boolean().refine((value) => value === true, {
          message: 'Vui lòng đồng ý với điều khoản của chúng tôi.',
        }),
      )
      .refine((values) => values.some((value) => value === true), {
        message: 'Vui lòng đồng ý với ít nhất một điều khoản.',
      }),
    typeofinsurance: data?.user_chooses
      ? z.string().min(1, 'Vui lòng chọn loại bảo hiểm').optional()
      : z.string().optional(),
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      order: data?.user_chooses
        ? stepOrder > 5
          ? [true]
          : [false]
        : Array.isArray(data?.compensation?.policy)
        ? data?.compensation?.policy?.map(() => (stepOrder > 5 ? true : false))
        : Array.isArray(data?.cargo_insurance_japanvn)
        ? data?.cargo_insurance_japanvn?.map(() =>
            stepOrder > 5 ? true : false,
          )
        : [false],
      typeofinsurance: dataFromOrder?.typeofinsurance || '',
    },
  })
  useEffect(() => {
    containerRefs.current.forEach((container) => {
      if (!container) return
      const images = container.querySelectorAll('img')
      images.forEach((img) => {
        img.style.cursor = 'pointer' // Biến con trỏ thành bàn tay khi hover
        img.onclick = () => {
          // Extract the highest resolution image from srcset if available
          if (img.srcset) {
            const srcsetEntries = img.srcset.split(',').map((entry) => {
              const [url, size] = entry.trim().split(' ')
              // Parse the size value (e.g., "2x" or "1200w")
              const sizeValue = size
                ? size.endsWith('w')
                  ? parseInt(size.replace(/[w]$/, '')) // Only handle width-based sizes like 1200w
                  : 0 // Ignore density descriptors like 2x
                : 0
              return {
                url,
                sizeValue,
                hasWidthDescriptor: size?.endsWith('w') || false,
              }
            })

            // Filter for entries with width descriptors only (like 1200w)
            const widthBasedEntries = srcsetEntries.filter(
              (entry) => entry.hasWidthDescriptor,
            )

            if (widthBasedEntries.length > 0) {
              // Sort by width value in descending order and get the URL with the largest width
              widthBasedEntries.sort((a, b) => b.sizeValue - a.sizeValue)
              setSelectedImage(widthBasedEntries[0].url)
            } else {
              // Fallback to src if no width-based entries are found
              setSelectedImage(img.src)
            }
          }
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
      setDataFromOrder({
        ...dataFromOrder,
        typeofinsurance: values?.typeofinsurance,
      })
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
              <p
                className={cn(
                  '!font-bold text-[#33A6E8] text-pc-tab-title',
                  data?.user_chooses && 'text-[rgba(0,0,0,0.92)]',
                )}
              >
                {data?.compensation?.title}
              </p>
              <div
                className='text-pc-sub14m text-[rgba(0,0,0,0.92)]'
                dangerouslySetInnerHTML={{__html: data?.compensation?.desc}}
              ></div>
            </div>
            {!data?.user_chooses &&
              Array.isArray(data?.compensation?.policy) &&
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
                      className=' [&_a]:text-[#0084FF] [&_img]:my-2 [&_img]:w-full [&_img]:h-auto [&_img]:rounded-[1rem] [&_p]:pt-[0.75rem] first:[&_p]:pt-0 [&_h3]:text-pc-tab-title *:text-black/[0.92] *:font-medium *:xsm:text-mb-13 [&_ul]:content-ul [&_ul]:!my-0 [&_ol]:content-ol [&_ol>li]:my-[0.5rem] [&_ol]:!my-0 xsm:marker:[&_ul_li]:text-[0.5rem] *:text-pc-14'
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
                              className='[&_.svg-none-check]:aria-[checked=false]:block size-[1.875rem] xsm:size-[1.5rem] [&_svg]:size-[1rem] [&>span>svg]:size-[1.25rem] flex-center border-none data-[state=checked]:bg-[#FFEC1F] bg-[#FFEC1F] data-[state=checked]:text-[#000000] text-[#000000]'
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className='space-y-1 leading-none'>
                            <FormLabel className=' cursor-pointer text-pc-sub14m !font-semibold text-black/[0.92] xsm:text-mb-13M xsm:line-clamp-2'>
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
            {data?.user_chooses && (
              <div className='p-[1rem] rounded-[1.25rem] bg-white border-[1px] border-solid border-[#DCDFE4]'>
                <p className='mb-[1rem] text-[rgba(0,0,0,0.92)] font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
                  Chọn bảo hiểm
                </p>
                <div className='flex flex-col space-y-[1rem]'>
                  {Array.isArray(data?.insurance_types?.list_insurance_types) &&
                    data?.insurance_types?.list_insurance_types?.map(
                      (insuranceItem, insuranceIndex) => (
                        <FormField
                          key={insuranceIndex}
                          control={form.control}
                          name={`typeofinsurance`}
                          render={({field}) => (
                            <FormItem className='xsm:pt-[0.5rem] xsm:border-t-[1px] xsm:border-solid xsm:border-[#DCDFE4] xsm:first:border-t-0 xsm:first:pt-0 relative flex flex-row items-center space-y-0 space-x-[0.5rem] border-none'>
                              <FormControl>
                                <Checkbox
                                  className='[&_svg]:!hidden size-[1.25rem] rounded-[100%] border-[1.66667px] border-solid border-[#000000] data-[state=checked]:!border-[#38B6FF] !bg-white flex-center [&>span]:data-[state=checked]:!bg-[#38B6FF] [&>span]:bg-transparent [&>span]:size-[0.75rem] [&>span]:rounded-[100%]'
                                  checked={field.value === insuranceItem?.label}
                                  onCheckedChange={(checked) => {
                                    field.onChange(
                                      checked ? insuranceItem?.label : '',
                                    )
                                  }}
                                />
                              </FormControl>
                              <div className='leading-none space-y-[0rem] flex flex-col'>
                                <div className='flex xsm:flex-wrap sm:items-center xsm:gap-[0.5rem] sm:space-x-[0.3875rem]'>
                                  <FormLabel className='text-pc-sub14s !font-semibold xsm:text-mb-13S xsm:!font-semibold xsm:line-clamp-2 text-black/[0.92] cursor-pointer'>
                                    {insuranceItem?.label}
                                  </FormLabel>
                                  {insuranceItem?.tag && (
                                    <p className='xsm:w-max p-[0.25rem_0.75rem] flex-center rounded-[62.5rem] bg-[#5DAF46] text-pc-sub14m xsm:text-[0.625rem] xsm:font-semibold xsm:leading-[1.4] xsm:tracking-[-0.01875rem] text-white'>
                                      {insuranceItem?.tag}
                                    </p>
                                  )}
                                </div>
                                {insuranceItem?.desc && (
                                  <FormLabel className='pt-[0.5rem] text-pc-sub14m text-[rgba(0,0,0,0.80)] cursor-pointer'>
                                    <p
                                      className='text-pc-sub14m text-[rgba(0,0,0,0.80)]'
                                      dangerouslySetInnerHTML={{
                                        __html: insuranceItem?.desc,
                                      }}
                                    ></p>
                                  </FormLabel>
                                )}
                              </div>
                            </FormItem>
                          )}
                        />
                      ),
                    )}
                </div>
                <FormField
                  control={form.control}
                  name={`order.0`}
                  render={({field}) => (
                    <FormItem className='mt-[1rem] relative flex flex-row items-center space-y-0 space-x-[0.5rem] border-none'>
                      <FormControl>
                        <Checkbox
                          className='[&_.svg-none-check]:aria-[checked=false]:block size-[1.875rem] xsm:size-[1.5rem] [&_svg]:size-[1rem] [&>span>svg]:size-[1.25rem] flex-center border-none data-[state=checked]:bg-[#FFEC1F] bg-[#FFEC1F] data-[state=checked]:text-[#000000] text-[#000000]'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel className=' cursor-pointer text-pc-sub14m !font-semibold text-black/[0.92] xsm:text-mb-13M xsm:line-clamp-2'>
                          {data?.insurance_types?.clause ||
                            'Tôi đã đọc và đồng ý với chính sách về kiện hàng'}
                        </FormLabel>
                      </div>
                      <FormMessage className='pl-[0.75rem] !text-[#F00] text-pc-sub12m absolute bottom-[-80%] left-0' />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </>
        )}
        {(!data?.user_chooses || type === 'ducvn') &&
          Array.isArray(data?.cargo_insurance_japanvn) &&
          data?.cargo_insurance_japanvn?.map(
            (
              item: IInformationInsurance_CargoInsuranceJapanvn,
              index: number,
            ) => (
              <div
                key={index}
                className='p-[1rem] rounded-[1.25rem] bg-white space-y-[1.2rem]'
              >
                <p className='xsm:text-pc-sub14s mb-[0.88rem] !font-bold text-black font-montserrat text-[1rem] leading-[1.625] tracking-[-0.03rem]'>
                  {item?.title}
                </p>
                <div className='flex xsm:flex-col-reverse sm:space-x-[1rem] bg-white'>
                  <div
                    ref={(el) => {
                      containerRefs.current[index] = el
                    }}
                    className='[&_img]:my-2 [&_img]:w-full [&_img]:h-auto [&_img]:rounded-[1rem] flex-1 [&_a]:text-[#0084FF] [&_h3]:text-pc-tab-title [&_strong]:text-pc-sub14s *:text-black/[0.92] *:xsm:text-mb-13 *:font-medium [&_ul]:content-ul [&_ul]:!my-0 xsm:marker:[&_ul_li]:text-[0.5rem] *:text-pc-14'
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
                        className=' rounded-[0.5rem] xsm:mb-[0.5rem] xsm:w-full h-auto object-contain'
                      />
                    </div>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name={`order.${data?.user_chooses ? index + 1 : index}`}
                  render={({field}) => (
                    <FormItem className='relative flex flex-row items-center space-y-0 space-x-[0.5rem] border-none'>
                      <FormControl>
                        <Checkbox
                          className='[&_.svg-none-check]:aria-[checked=false]:block size-[1.875rem] xsm:size-[1.5rem] [&_svg]:size-[1rem] [&>span>svg]:size-[1.25rem] flex-center border-none data-[state=checked]:bg-[#FFEC1F] bg-[#FFEC1F] data-[state=checked]:text-[#000000] text-[#000000]'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel className=' cursor-pointer text-pc-sub14m !font-semibold text-black/[0.92] xsm:text-mb-13M xsm:line-clamp-2'>
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
