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
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import countries from '@/sections/tao-don/Europe'
import ICX from '@/sections/tao-don/ICX'
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
  recipientCity: z
    .string({
      required_error: 'Vui lòng nhập thành phố người nhận',
    })
    .min(1, 'Vui lòng nhập thành phố người nhận'),
  recipientCodeCity: z
    .string({
      required_error: 'Vui lòng nhập mã thành phố người nhận',
    })
    .min(1, 'Vui lòng nhập mã thành phố người nhận'),
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
  nation: z
    .string({
      required_error: 'Vui lòng chọn quốc gia',
    })
    .min(1, 'Vui lòng chọn quốc gia'),
})

export default function FormDeliveryInformation({
  handleClickcurrentTab,
  setDataFromOrder,
  dataFromOrder,
  prevStep,
  nextStep,
  european,
  title,
  setSelectNationValue,
  selectNationValue,
  setIndexTab,
  indexTab,
}: {
  handleClickcurrentTab: (nextTab: string) => void
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  dataFromOrder: IDataFromOrder
  prevStep: string
  nextStep: string
  european?: string
  title: string
  setSelectNationValue: React.Dispatch<
    React.SetStateAction<{img: string; title: string}>
  >
  selectNationValue: {img: string; title: string}
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
}) {
  const isMobile = useIsMobile()
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const [selectNation, setSelectNation] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      recipientName: dataFromOrder?.recipientName || '',
      recipientPhone: dataFromOrder?.recipientPhone || '',
      recipientAddress: dataFromOrder?.recipientAddress || '',
      recipientCity: dataFromOrder?.recipientCity || '',
      recipientCodeCity: dataFromOrder?.recipientCodeCity || '',
      housingNumber: dataFromOrder?.housingNumber || '',
      roadName: dataFromOrder?.roadName || '',
      nation: european === 'vnEu' ? (dataFromOrder?.nation ?? '') : title,
    },
  })
  const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'})
  useEffect(() => {
    if (triggerScroll) {
      scrollToTop()
      setTriggerScroll(false)
    }
  }, [triggerScroll])
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('lot')
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
        className='space-y-[1.75rem] xsm:space-y-[1.25rem]'
      >
        <p className='text-black text-pc-sub16b !mb-[1.5rem] xsm:!mb-[1rem]'>
          Thông tin nhận hàng
        </p>
        <div className='flex xsm:flex-col xsm:space-y-[1.25rem] sm:space-x-[1.5rem]'>
          <FormField
            control={form.control}
            name='recipientName'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Tên người nhận(*)
                </FormLabel>
                <FormControl>
                  <Input
                    className='!font-roboto shadow-none xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='Tên người nhận'
                    {...field}
                  />
                </FormControl>
                <p className='!font-roboto pl-[0.75rem] text-[rgba(0,0,0,0.60)] text-pc-sub12m !mt-[0.25rem]'>
                  *Bắt buộc đúng tên trên chuông cửa nhằm giao hàng đúng hoặc
                  đúng tên Auswei.
                </p>
                <FormMessage className='!font-roboto pl-[0.75rem] !text-[#F00] text-pc-sub12m xsm:mt-[0.25rem]' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='recipientPhone'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Số điện thoại người nhận (*)
                </FormLabel>
                <FormControl>
                  <Input
                    className='!font-roboto shadow-none xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='0987654321'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!font-roboto pl-[0.75rem] !text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
              </FormItem>
            )}
          />
        </div>
        {european === 'vnEu' && (
          <FormField
            control={form.control}
            name='nation'
            render={({field}) => (
              <FormItem
                onClick={() => {
                  setSelectNation(true)
                }}
                className='flex-1 space-y-0'
              >
                <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Chọn quốc gia (*)
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='xsm:pointer-events-none aria-[invalid=true]:!border-[#F00] bg-white !mt-[0.37rem] p-[0.75rem_0.75rem_0.75rem_1rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] [&_svg]:filter [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:opacity-[1]'>
                    <SelectTrigger className='!shadow-none xsm:h-[2.5rem] h-[3rem] [&_span]:!text-black [&_span]:text-pc-sub14m [&_span]:xsm:text-mb-13M focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                      {!isMobile && <SelectValue placeholder='Chọn quốc gia' />}
                      {isMobile && !field.value && (
                        <SelectValue placeholder='Chọn quốc gia' />
                      )}
                      {isMobile && field.value && (
                        <div className='space-x-[0.75rem] flex items-center flex-1'>
                          <ImageV2
                            src={selectNationValue?.img || ''}
                            alt=''
                            height={24 * 2}
                            width={24 * 2}
                            className='size-[1.5rem] rounded-[100%] border-[0.5px] border-solid border-[rgba(0,0,0,0.25)]'
                          />
                          <p className='text-black text-pc-sub14m'>
                            {selectNationValue?.title}
                          </p>
                        </div>
                      )}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] bg-white'>
                    {Array.isArray(countries) ? (
                      countries?.length > 0 &&
                      countries?.map(
                        (
                          item: {
                            flag: string
                            country: string
                          },
                          index: number,
                        ) => (
                          <SelectItem
                            key={index}
                            className='cursor-pointer h-[3rem] rounded-[1.25rem] p-[0.75rem] bg-white flex items-center'
                            value={String(item?.country)}
                          >
                            <div className='space-x-[0.75rem] flex items-center flex-1'>
                              <ImageV2
                                src={item?.flag || '/order/flag-germany.webp'}
                                alt=''
                                height={24 * 2}
                                width={24 * 2}
                                className='size-[1.5rem] rounded-[100%] border-[0.5px] border-solid border-[rgba(0,0,0,0.25)]'
                              />
                              <p className='text-black text-pc-sub14m'>
                                {item?.country}
                              </p>
                            </div>
                          </SelectItem>
                        ),
                      )
                    ) : (
                      <div className='!font-roboto text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]'>
                        Đã có lỗi về lấy thông tin quốc gia châu âu
                      </div>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage className='!font-roboto pl-[0.75rem] !text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name='recipientAddress'
          render={({field}) => (
            <FormItem className='flex-1 space-y-0'>
              <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                Địa chỉ (*)
              </FormLabel>
              <FormControl>
                <Input
                  className='!font-roboto !shadow-none xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                  placeholder='Etage 4, Ha Restaurant, Hotel A, Nails B...'
                  {...field}
                />
              </FormControl>
              {dataFromOrder?.shipping === '326' && (
                <p className='!font-roboto pl-[0.75rem] text-pc-sub12m text-[rgba(0,0,0,0.60)] !mt-[0.25rem]'>
                  *Giao hàng ở Đức không gọi điện, nên buộc phải ghi thêm số
                  tầng, số phòng, tên tiệm Nails, bệnh viên, nhà hàng nếu có
                </p>
              )}
              <FormMessage className='!font-roboto pl-[0.75rem] !text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
            </FormItem>
          )}
        />
        <div className='flex space-x-[1.5rem]'>
          <FormField
            control={form.control}
            name='roadName'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Tên đường(*)
                </FormLabel>
                <FormControl>
                  <Input
                    className='!font-roboto !shadow-none xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='Marien Strasse'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!font-roboto pl-[0.75rem] !text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='housingNumber'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Số nhà (*)
                </FormLabel>
                <FormControl>
                  <Input
                    className='!font-roboto !shadow-none xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='15'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!font-roboto pl-[0.75rem] !text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
              </FormItem>
            )}
          />
        </div>
        <div className='flex space-x-[1.5rem]'>
          <FormField
            control={form.control}
            name='recipientCity'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Thành phố(*)
                </FormLabel>
                <FormControl>
                  <Input
                    className='!font-roboto !shadow-none xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='Nhập tên thành phố'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!font-roboto pl-[0.75rem] !text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='recipientCodeCity'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Mã thành phố(*)
                </FormLabel>
                <FormControl>
                  <Input
                    className='!font-roboto !shadow-none xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='10117'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!font-roboto pl-[0.75rem] !text-[#F00] text-pc-sub12m xsm:text-mb-sub10m xsm:mt-[0.25rem]' />
              </FormItem>
            )}
          />
        </div>
        <div className='space-x-[2rem] xsm:p-[1rem] xsm:bg-[#FAFAFA] xsm:space-x-[0.5rem] xsm:fixed xsm:bottom-0 xsm:z-[49] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0 flex items-center justify-between sm:w-full'>
          <div
            onClick={() => {
              setIndexTab(indexTab - 1)
              handleClickcurrentTab(prevStep)
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
        {isMobile && european === 'vnEu' ? (
          <>
            <div
              onClick={() => {
                setSelectNation(false)
              }}
              className={cn(
                '!mt-0 fixed transition-all duration-1000 inset-0 bg-black/0 z-[51] pointer-events-none',
                selectNation && 'bg-black/70 pointer-events-auto',
              )}
            ></div>
            <div
              className={cn(
                'fixed transition-all duration-500 shadow-lg bottom-[-125%] z-[52] left-0 w-full rounded-t-[1.25rem] bg-white overflow-hidden',
                selectNation && 'bottom-0',
              )}
            >
              <div className='border-b-[1px] border-solid border-b-[#DCDFE4] relative p-[0.5rem] flex-center '>
                <p className='text-center text-[0.75rem] font-montserrat font-semibold tracking-[-0.015rem] text-black'>
                  Chọn chiều dịch vụ
                </p>
                <div
                  onClick={() => {
                    setSelectNation(false)
                  }}
                  className='absolute top-[0.5rem] right-[0.5rem]'
                >
                  <ICX className='size-[1.5rem]' />
                </div>
              </div>
              <div className='max-h-[70vh] overflow-hidden space-y-[0.5rem] overflow-y-auto pb-[2rem]'>
                {Array.isArray(countries) &&
                  countries?.length > 0 &&
                  countries?.map(
                    (
                      item: {
                        flag: string
                        country: string
                      },
                      index: number,
                    ) => (
                      <div
                        key={index}
                        onClick={() => {
                          form.setValue('nation', String(item?.country), {
                            shouldValidate: true, // Kích hoạt validate ngay sau khi set value
                          })
                          setSelectNationValue({
                            img: item?.flag,
                            title: item?.country,
                          })
                          setSelectNation(false)
                        }}
                        className='space-x-[0.75rem] flex items-center p-[0.75rem] border-[1px] border-solid border-[#F8F8F8] bg-white'
                      >
                        <ImageV2
                          src={item?.flag || '/order/flag-germany.webp'}
                          alt=''
                          height={24 * 2}
                          width={24 * 2}
                          className='size-[1.5rem] rounded-[100%] border-[0.5px] border-solid border-[rgba(0,0,0,0.25)]'
                        />
                        <p className='text-black text-pc-sub14m line-clamp-1'>
                          {item?.country}
                        </p>
                      </div>
                    ),
                  )}
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </form>
    </Form>
  )
}
