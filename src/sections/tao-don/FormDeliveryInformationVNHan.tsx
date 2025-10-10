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
  FormDescription,
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
  recipientPhone: z
    .string()
    .min(1, 'Vui lòng nhập số điện thoại của bạn')
    .regex(
      /^(999|998|997|996|995|994|993|992|991|990|979|978|977|976|975|974|973|972|971|970|969|968|967|966|965|964|963|962|961|960|899|898|897|896|895|894|893|892|891|890|889|888|887|886|885|884|883|882|881|880|879|878|877|876|875|874|873|872|871|870|859|858|857|856|855|854|853|852|851|850|839|838|837|836|835|834|833|832|831|830|809|808|807|806|805|804|803|802|801|800|699|698|697|696|695|694|693|692|691|690|689|688|687|686|685|684|683|682|681|680|679|678|677|676|675|674|673|672|671|670|599|598|597|596|595|594|593|592|591|590|509|508|507|506|505|504|503|502|501|500|429|428|427|426|425|424|423|422|421|420|389|388|387|386|385|384|383|382|381|380|379|378|377|376|375|374|373|372|371|370|359|358|357|356|355|354|353|352|351|350|299|298|297|296|295|294|293|292|291|290|289|288|287|286|285|284|283|282|281|280|269|268|267|266|265|264|263|262|261|260|259|258|257|256|255|254|253|252|251|250|249|248|247|246|245|244|243|242|241|240|239|238|237|236|235|234|233|232|231|230|229|228|227|226|225|224|223|222|221|220|219|218|217|216|215|214|213|212|211|210|98|95|94|93|92|91|90|86|84|0|82|81|66|65|64|63|62|61|60|58|57|56|55|54|53|52|51|49|48|47|46|45|44|43|41|40|39|36|34|33|32|31|30|27|20|7|1)[0-9]{3,14}$/,
      {
        message:
          'Định dạng không hợp lệ (viết liền không khoảng trắng vd: 0987654321)',
      },
    ),
  recipientAddress: z
    .string({
      required_error: 'Vui lòng nhập địa chỉ (Tên đường, số nhà) người nhận',
    })
    .min(1, 'Vui lòng nhập địa chỉ (Tên đường, số nhà) người nhận'),
  passportNumber: z
    .string({
      required_error: 'Vui lòng nhập mã thông quan, ID hoặc CMT người nhận',
    })
    .min(1, 'Vui lòng nhập mã thông quan, ID hoặc CMT người nhận'),
  recipientCity: z
    .string({
      required_error: 'Vui lòng nhập thành phố người nhận',
    })
    .min(1, 'Vui lòng nhập thành phố người nhận'),
  housingNumber: z
    .string({
      required_error: 'Vui lòng nhập thông tin số nhà',
    })
    .min(1, 'Vui lòng nhập thông tin số nhà'),
  roadName: z
    .string({
      required_error: 'Vui lòng nhập thông tin tên đường',
    })
    .min(1, 'Vui lòng nhập thông tin tên đường'),
  district: z.string().optional(),
})

export default function FormDeliveryInformationVNHan({
  handleClickcurrentTab,
  setDataFromOrder,
  dataFromOrder,
  shippingCost,
  prevStep,
  nextStep,
  setIndexTab,
  indexTab,
}: {
  handleClickcurrentTab: (nextTab: string) => void
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  dataFromOrder: IDataFromOrder
  shippingCost?: string
  prevStep: string
  nextStep: string
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
}) {
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'})
  useEffect(() => {
    if (triggerScroll) {
      scrollToTop()
      setTriggerScroll(false)
    }
  }, [triggerScroll])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      recipientName: dataFromOrder?.recipientName || '',
      recipientPhone: dataFromOrder?.recipientPhone || '',
      recipientAddress: dataFromOrder?.recipientAddress || '',
      passportNumber: dataFromOrder?.passportNumber || '',
      recipientCity: dataFromOrder?.recipientCity || '',
      housingNumber: dataFromOrder?.housingNumber || '',
      roadName: dataFromOrder?.roadName || '',
      district: dataFromOrder?.district || '',
    },
  })
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
        className='space-y-[1.75rem] xsm:-mt-5 xsm:space-y-[1.25rem]'
      >
        <p className='!mb-[1.5rem] text-[#33A6E8] text-pc-sub16b xsm:!mb-[1rem] xsm:hidden'>
          Thông tin nhận hàng tại Hàn Quốc
        </p>
        <div className='flex sm:space-x-[1.5rem] xsm:flex-col xsm:space-y-[1.25rem]'>
          <FormField
            control={form.control}
            name='recipientName'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s xsm:[&_strong]:text-[rgba(0,0,0,0.60)] [&_strong]:font-medium'>
                  Tên người nhận <strong>(*)</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[1rem_0.75rem_1rem_1rem] text-[#000] shadow-none text-pc-sub14m placeholder:opacity-[0.7rem] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.37rem] xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_1rem] xsm:text-mb-13M'
                    placeholder='Tên người nhận'
                    {...field}
                  />
                </FormControl>
                <FormDescription className='!mt-[0.25rem] pl-[1rem] text-[rgba(0,0,0,0.80)] text-pc-sub12m'>
                  *Tên người nhận phải trùng khớp với mã thông quan, nếu không
                  khớp sẽ giao sai.
                </FormDescription>
                <FormMessage className='!mt-[0.25rem] pl-[1rem] !text-[#F00] text-pc-sub12m xsm:text-mb-sub10m' />
              </FormItem>
            )}
          />
        </div>
        <div className='flex sm:space-x-[1.5rem] xsm:flex-col xsm:space-y-[1.25rem]'>
          <FormField
            control={form.control}
            name='recipientCity'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s xsm:[&_strong]:text-[rgba(0,0,0,0.60)] [&_strong]:font-medium'>
                  Thành phố <strong>(*)</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[1rem_0.75rem_1rem_1rem] text-[#000] shadow-none text-pc-sub14m placeholder:opacity-[0.7rem] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.37rem] xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_1rem] xsm:text-mb-13M'
                    placeholder='전주시'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='pl-[1rem] !text-[#F00] text-pc-sub12m xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_1rem] xsm:text-mb-13M' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='district'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s xsm:[&_strong]:text-[rgba(0,0,0,0.60)] [&_strong]:font-medium'>
                  Quận <strong>(nếu có)</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[1rem_0.75rem_1rem_1rem] text-[#000] shadow-none text-pc-sub14m placeholder:opacity-[0.7rem] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.37rem] xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_1rem] xsm:text-mb-13M'
                    placeholder='덕진구'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!mt-[0.25rem] pl-[1rem] !text-[#F00] text-pc-sub12m xsm:text-mb-sub10m' />
              </FormItem>
            )}
          />
        </div>
        <div className='flex sm:space-x-[1.5rem] xsm:flex-col xsm:space-y-[1.25rem]'>
          <FormField
            control={form.control}
            name='roadName'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s xsm:[&_strong]:text-[rgba(0,0,0,0.60)] [&_strong]:font-medium'>
                  Tên đường <strong>(*)</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[1rem_0.75rem_1rem_1rem] text-[#000] shadow-none text-pc-sub14m placeholder:opacity-[0.7rem] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.37rem] xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_1rem] xsm:text-mb-13M'
                    placeholder='명륜 4길'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='pl-[1rem] !text-[#F00] text-pc-sub12m xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_1rem] xsm:text-mb-13M' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='housingNumber'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s xsm:[&_strong]:text-[rgba(0,0,0,0.60)] [&_strong]:font-medium'>
                  Số nhà<strong> (*)</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[1rem_0.75rem_1rem_1rem] text-[#000] shadow-none text-pc-sub14m placeholder:opacity-[0.7rem] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.37rem] xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_1rem] xsm:text-mb-13M'
                    placeholder='4 - 12'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!mt-[0.25rem] pl-[1rem] !text-[#F00] text-pc-sub12m xsm:text-mb-sub10m' />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='recipientAddress'
          render={({field}) => (
            <FormItem className='flex-1 space-y-0'>
              <FormLabel className='pl-[1rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s xsm:[&_strong]:text-[rgba(0,0,0,0.60)] [&_strong]:font-medium'>
                Địa chỉ chi tiết <strong>(*)</strong>
              </FormLabel>
              <FormControl>
                <Input
                  className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[1rem_0.75rem_1rem_1rem] text-[#000] shadow-none text-pc-sub14m placeholder:opacity-[0.7rem] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.37rem] xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_1rem] xsm:text-mb-13M'
                  placeholder='영스빌 3층 301호'
                  {...field}
                />
              </FormControl>
              <FormMessage className='!mt-[0.25rem] pl-[1rem] !text-[#F00] text-pc-sub12m' />
              <p className='!mt-[0.25rem] pl-[1rem] text-[rgba(0,0,0,0.60)] text-pc-sub12m xsm:text-[rgba(0,0,0,0.60)]'>
                *Số phòng, toà nhà nếu có
              </p>
            </FormItem>
          )}
        />
        <div className='flex sm:space-x-[1.5rem] xsm:flex-col xsm:space-y-[1.25rem]'>
          <FormField
            control={form.control}
            name='passportNumber'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s xsm:[&_strong]:text-[rgba(0,0,0,0.60)] [&_strong]:font-medium  '>
                  Mã thông quan, ID hoặc CMT
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[1rem_0.75rem_1rem_1rem] text-[#000] shadow-none text-pc-sub14m placeholder:opacity-[0.7rem] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.37rem] xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_1rem] xsm:text-mb-13M'
                    placeholder='P12345****012'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='pl-[1rem] !text-[#F00] text-pc-sub12m xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_1rem]' />
                <p className='!mt-[0.25rem] pl-[1rem] text-[rgba(0,0,0,0.92)] xsm:text-[rgba(0,0,0,0.60)] [&_span]:!text-[rgba(0,0,0,0.60)] xsm:tracking-[-0.0225rem] text-pc-sub12m xm:leading-[150%] xsm:[&_*]:!text-[rgba(0,0,0,0.80)]'>
                  *Mã thông quan: P828*****888, <br />
                  *CMT: 96*********27: *ID:***213 <br />
                  <span className='xsm:!text-[rgba(0,0,0,0.60)] xsm:tracking-[-0.0225rem] '>
                    *Lưu ý: Mã thông quan, ID hoặc CMT phải trùng địa chỉ giao
                    hàng, nếu không sẽ giao sai. Phí giao lại {shippingCost}.
                  </span>
                </p>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='recipientPhone'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s xsm:[&_strong]:text-[rgba(0,0,0,0.60)] [&_strong]:font-medium'>
                  Số điện thoại người nhận <strong>(*)</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white p-[1rem_0.75rem_1rem_1rem] text-[#000] shadow-none text-pc-sub14m placeholder:opacity-[0.7rem] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.37rem] xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_1rem] xsm:text-mb-13M'
                    placeholder='0987654321'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!mt-[0.25rem] pl-[1rem] !text-[#F00] text-pc-sub12m xsm:text-mb-sub10m' />
              </FormItem>
            )}
          />
        </div>
        <div className='!mt-[1.5rem] flex items-center justify-between space-x-[1.25rem] sm:w-full xsm:fixed xsm:bottom-0 xsm:left-0 xsm:right-0 xsm:z-[49] xsm:!mt-0 xsm:space-x-[0.5rem] xsm:bg-[#FAFAFA] xsm:p-[1rem] disabled:xsm:opacity-[1]'>
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
