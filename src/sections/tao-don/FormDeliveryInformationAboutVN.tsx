'use client'
import useStore from '@/app/(store)/store'
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
import useIsMobile from '@/hooks/useIsMobile'
import {useScrollToTop} from '@/hooks/useScrollToTop'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import PopupPaymentInfor from '@/sections/tao-don/PopupPaymentInfor'
import {zodResolver} from '@hookform/resolvers/zod'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
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
        message: 'Định dạng không hợp lệ',
      },
    ),
  recipientAddress: z
    .string({
      required_error: 'Vui lòng nhập địa chỉ (Tên đường, số nhà) người nhận',
    })
    .min(1, 'Vui lòng nhập địa chỉ (Tên đường, số nhà) người nhận'),
  recipientPaymentInformation: z
    .string({
      required_error: 'Vui lòng nhập thông tin thanh toán',
    })
    .min(1, 'Vui lòng nhập thông tin thanh toán'),
})

export default function FormDeliveryInformationAboutVN({
  handleClickcurrentTab,
  setDataFromOrder,
  dataFromOrder,
}: {
  handleClickcurrentTab: (nextTab: string) => void
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  dataFromOrder: IDataFromOrder
}) {
  const isMobile = useIsMobile()
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const [selectPaymentInformation, setSelectPaymentInformation] =
    useState<boolean>(false)
  const [selectPaymentInformationValue, setSelectPaymentInformationValue] =
    useState<{value: string; title: string}>({value: '', title: ''})
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      recipientName: dataFromOrder?.recipientName || '',
      recipientPhone: dataFromOrder?.recipientPhone || '',
      recipientAddress: dataFromOrder?.recipientAddress || '',
      recipientPaymentInformation:
        dataFromOrder?.recipientPaymentInformation || '',
    },
  })
  useEffect(() => {
    if (triggerScroll) {
      useScrollToTop()
      setTriggerScroll(false)
    }
  }, [triggerScroll])
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setDataFromOrder({...dataFromOrder, ...values})
    if (stepOrder < 5) {
      setStepOrder(5)
    }
    handleClickcurrentTab('5')
    setTriggerScroll(true)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-[1.75rem] xsm:space-y-[1.25rem]'
      >
        <p className='text-black text-pc-sub16b !mb-[1.5rem] xsm:!mb-[1rem]'>
          Thông tin nhận hàng tại Việt Nam
        </p>
        <div className='flex xsm:flex-col xsm:space-y-[1.25rem] sm:space-x-[1.5rem]'>
          <FormField
            control={form.control}
            name='recipientName'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Tên người nhận(*)
                </FormLabel>
                <FormControl>
                  <Input
                    className='xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='Tên người nhận'
                    {...field}
                  />
                </FormControl>
                <p className='xsm:text-pc-sub10m text-[rgba(0,0,0,0.60)] text-pc-sub12m !mt-[0.25rem]'>
                  Cung cấp tên nhận đầy đủ trên giấy tờ tùy thân, tên trên
                  chuông cửa để việc giao hàng chính xác.
                </p>
                <FormMessage className='xsm:text-mb-sub10m xsm:mt-[0.25rem] !text-[#F00] text-pc-sub12m' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='recipientPhone'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Số điện thoại(*)
                </FormLabel>
                <FormControl>
                  <Input
                    className='xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='0987654321'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='xsm:text-mb-sub10m xsm:mt-[0.25rem] !text-[#F00] text-pc-sub12m' />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='recipientAddress'
          render={({field}) => (
            <FormItem className='flex-1 space-y-0'>
              <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                Địa chỉ (*)
              </FormLabel>
              <FormControl>
                <Input
                  className='xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                  placeholder='Địa chỉ nhận hàng tại Việt Nam'
                  {...field}
                />
              </FormControl>
              <FormMessage className='xsm:text-mb-sub10m xsm:mt-[0.25rem] !text-[#F00] text-pc-sub12m' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='recipientPaymentInformation'
          render={({field}) => (
            <FormItem
              onClick={() => setSelectPaymentInformation(true)}
              className='flex-1 space-y-0'
            >
              <FormLabel className='text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                Chọn thông tin thanh toán (*)
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl className='xsm:pointer-events-none aria-[invalid=true]:!border-[#F00] bg-white mt-[0.37rem] p-[0.75rem_0.75rem_0.75rem_1rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] [&_svg]:filter [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:opacity-[1]'>
                  <SelectTrigger className='xsm:h-[2.5rem] h-[3rem] [&_span]:!text-black [&_span]:text-pc-sub14m focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                    {!isMobile && (
                      <SelectValue placeholder='Chọn thông tin thanh toán' />
                    )}
                    {isMobile && !field.value && (
                      <SelectValue placeholder='Chọn thông tin thanh toán' />
                    )}
                    {isMobile && field.value && (
                      <div className='space-x-[0.75rem] flex items-center flex-1 w-full'>
                        <p className='text-black text-pc-sub14m text-start w-full line-clamp-1'>
                          {selectPaymentInformationValue?.title ||
                            dataFromOrder?.recipientPaymentInformation}
                        </p>
                      </div>
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] bg-white'>
                  <SelectItem
                    className='h-[3rem] rounded-[1.25rem] p-[0.75rem] bg-white flex items-center'
                    value={'VND'}
                  >
                    <p className='text-black text-pc-sub14m'>
                      Thanh toán bằng VNĐ (theo tỷ giá bán ra Vietcombank)
                    </p>
                  </SelectItem>
                  <SelectItem
                    className='h-[3rem] rounded-[1.25rem] p-[0.75rem] bg-white flex items-center'
                    value={'Euro'}
                  >
                    <p className='text-black text-pc-sub14m'>
                      Thanh toán bằng Euro
                    </p>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className='!text-[#F00] text-pc-sub12m' />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-between w-full'>
          <div
            onClick={() => handleClickcurrentTab('3')}
            className='cursor-pointer p-[0.75rem_1.5rem] flex-center rounded-[1.25rem] bg-[#D9F1FF]'
          >
            <p className='text-pc-sub16m text-black'>Quay lại</p>
          </div>
          <Button
            type='submit'
            disabled={!form.formState.isValid}
            className={cn(
              'hover:bg-[#38B6FF] mt-[0rem] ml-auto h-[2.8125rem] flex-center p-[0.75rem_1.5rem] rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]',
              !form.formState.isValid &&
                'bg-[#F0F0F0] [&_p]:text-[rgba(0,0,0,0.30)]',
            )}
          >
            <p className='text-white text-pc-sub16m'>Tiếp tục</p>
          </Button>
        </div>
        {isMobile && (
          <PopupPaymentInfor
            form={form}
            selectPaymentInformation={selectPaymentInformation}
            setSelectPaymentInformation={setSelectPaymentInformation}
            setSelectPaymentInformationValue={setSelectPaymentInformationValue}
          />
        )}
      </form>
    </Form>
  )
}
