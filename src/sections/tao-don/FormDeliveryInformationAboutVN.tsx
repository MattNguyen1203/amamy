'use client'
import useStore from '@/app/(store)/store'
import {Button} from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import ICX from '@/sections/tao-don/ICX'
import {zodResolver} from '@hookform/resolvers/zod'
import {Check, ChevronDown} from 'lucide-react'
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
  recipientAddressType: z.enum(['atAmamyStore', 'registeredAddress'], {
    required_error: 'Vui lòng chọn nơi nhận hàng',
  }),
  recipientCity: z
    .string({
      required_error: 'Vui lòng nhập thành phố người nhận',
    })
    .min(1, 'Vui lòng nhập thành phố người nhận'),
  district: z
    .string({
      required_error: 'Vui lòng nhập Quận người nhận',
    })
    .min(1, 'Vui lòng nhập Quận người nhận'),
  recipientWardsandcommunes: z
    .string({
      required_error: 'Vui lòng nhập Phường xã người nhận',
    })
    .min(1, 'Vui lòng nhập Phường xã người nhận'),
})
interface ICity {
  ProvinceName: string
  ProvinceID: number
}
interface IDistrict {
  DistrictName: string
  DistrictID: number
}
interface IWard {
  WardName: string
}
export default function FormDeliveryInformationAboutVN({
  handleClickcurrentTab,
  setDataFromOrder,
  dataFromOrder,
  prevStep,
  nextStep,
  setIndexTab,
  indexTab,
}: {
  handleClickcurrentTab: (nextTab: string) => void
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  dataFromOrder: IDataFromOrder
  prevStep: string
  nextStep: string
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
}) {
  const isMobile = useIsMobile()
  const {stepOrder, setStepOrder} = useStore((state) => state)
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  const [dataCity, setDataCity] = useState<ICity[]>()
  const [isCity, setIsCity] = useState<boolean>(false)
  const [dataDistrict, setDistrict] = useState<IDistrict[]>()
  const [isDistrict, setIsDistrict] = useState<boolean>(false)
  const [dataWard, setWard] = useState<IWard[]>()
  const [isWard, setIsWard] = useState<boolean>(false)
  const [recipientAddressType, setRecipientAddressType] = useState<string>('')
  const [pending, setPending] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      recipientName: dataFromOrder?.recipientName || '',
      recipientPhone: dataFromOrder?.recipientPhone || '',
      recipientAddress: dataFromOrder?.recipientAddress || '',
      recipientAddressType:
        dataFromOrder?.recipientAddressType || 'registeredAddress',
      recipientCity:
        dataFromOrder?.recipientAddressType !== 'atAmamyStore'
          ? dataFromOrder?.recipientCity ?? ''
          : 'un',
      district:
        dataFromOrder?.recipientAddressType !== 'atAmamyStore'
          ? dataFromOrder?.district ?? ''
          : 'un',
      recipientWardsandcommunes:
        dataFromOrder?.recipientAddressType !== 'atAmamyStore'
          ? dataFromOrder?.recipientWardsandcommunes ?? ''
          : 'un',
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
    setDataFromOrder({...dataFromOrder, ...values})
    if (stepOrder < 5) {
      setStepOrder(Number(nextStep))
    }
    setIndexTab(indexTab + 1)
    handleClickcurrentTab(nextStep)
    setTriggerScroll(true)
  }
  useEffect(() => {
    if (pending) {
      form.setValue(
        'recipientAddress',
        recipientAddressType === 'atAmamyStore'
          ? 'Nhận tại cửa hàng Amamy'
          : dataFromOrder?.recipientAddress || '',
        {shouldValidate: true},
      )
      form.setValue(
        'recipientCity',
        recipientAddressType === 'atAmamyStore'
          ? 'un'
          : dataFromOrder?.recipientCity || '',
        {shouldValidate: true},
      )
      form.setValue(
        'district',
        recipientAddressType === 'atAmamyStore'
          ? 'un'
          : dataFromOrder?.district || '',
        {shouldValidate: true},
      )
      form.setValue(
        'recipientWardsandcommunes',
        recipientAddressType === 'atAmamyStore'
          ? 'un'
          : dataFromOrder?.recipientWardsandcommunes || '',
        {shouldValidate: true},
      )
    }
  }, [recipientAddressType, form])
  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APIPROVINCES}province`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', // Định dạng header JSON
              Token: process.env.NEXT_PUBLIC_TOKENPROVINCES ?? '', // Gửi token trong header
            },
          },
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data && data.data && Array.isArray(data.data)) {
          // Kiểm tra data và data.data
          setDataCity(data.data)
        } else {
          console.log('Dữ liệu trả về không đúng định dạng:', data)
        }
      } catch (error) {
        console.log('Lỗi khi gọi API:', error)
      }
    }
    fetchProvinces()
    if (dataFromOrder?.recipientAddressType) {
      setRecipientAddressType(dataFromOrder?.recipientAddressType)
    }
    setTimeout(() => {
      setPending(true)
    }, 3000)
  }, [])
  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_APIPROVINCES
          }district?province_id=${encodeURIComponent(
            dataFromOrder?.ProvinceID,
          )}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', // Định dạng header JSON
              Token: process.env.NEXT_PUBLIC_TOKENPROVINCES ?? '', // Gửi token trong header
            },
          },
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data && data.data && Array.isArray(data.data)) {
          // Kiểm tra data và data.data
          setDistrict(data.data)
        } else {
          console.log('Dữ liệu trả về không đúng định dạng:', data)
        }
      } catch (error) {
        console.log('Lỗi khi gọi API:', error)
      }
    }
    if (dataFromOrder?.ProvinceID) {
      fetchProvinces()
    }
  }, [dataFromOrder?.ProvinceID])
  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_APIPROVINCES
          }ward?district_id=${encodeURIComponent(dataFromOrder?.DistrictID)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', // Định dạng header JSON
              Token: process.env.NEXT_PUBLIC_TOKENPROVINCES ?? '', // Gửi token trong header
            },
          },
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setWard(data.data)
      } catch (error) {
        console.log('Lỗi khi gọi API:', error)
      }
    }
    if (dataFromOrder?.DistrictID) {
      fetchProvinces()
    }
  }, [dataFromOrder?.DistrictID])
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
                <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Tên người nhận(*)
                </FormLabel>
                <FormControl>
                  <Input
                    className='shadow-none xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='Tên người nhận'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='pl-[0.75rem] xsm:text-mb-sub10m xsm:mt-[0.25rem] !text-[#F00] text-pc-sub12m' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='recipientPhone'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                  Số điện thoại(*)
                </FormLabel>
                <FormControl>
                  <Input
                    className='shadow-none xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                    placeholder='0987654321'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='pl-[0.75rem] xsm:text-mb-sub10m xsm:mt-[0.25rem] !text-[#F00] text-pc-sub12m' />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='recipientAddressType'
          render={({field}) => (
            <FormItem className='flex-1 space-y-0'>
              <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                Địa chỉ nhận hàng tại Việt Nam
              </FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value || 'registeredAddress'}
                  onValueChange={(value) => {
                    field.onChange(value)
                    setRecipientAddressType(value)
                  }}
                  className='flex !my-[0.75rem] sm:space-x-[4rem] xsm:flex-col xsm:space-y-[1rem]'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0 aria-[checked=true]:[&>button]:border-[#38B6FF] [&_svg]:fill-[#38B6FF] [&_svg]:stroke-white'>
                    <FormControl>
                      <RadioGroupItem
                        id='r1'
                        value='registeredAddress'
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor='r1'
                      className='font-normal cursor-pointer'
                    >
                      Nhận tại địa chỉ đăng ký
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0 aria-[checked=true]:[&>button]:border-[#38B6FF] [&_svg]:fill-[#38B6FF] [&_svg]:stroke-white'>
                    <FormControl>
                      <RadioGroupItem
                        id='r2'
                        value='atAmamyStore'
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor='r2'
                      className='font-normal cursor-pointer'
                    >
                      Nhận tại cửa hàng Amamy
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='recipientAddress'
          render={({field}) => (
            <FormItem className='flex-1 space-y-0 !mt-0'>
              <FormControl>
                <Input
                  disabled={
                    recipientAddressType === 'atAmamyStore' ? true : false
                  }
                  className='shadow-none disabled:opacity-[1] xsm:h-[2.5rem] xsm:p-[0.75rem_0.625rem_0.75rem_0.75rem] xsm:text-mb-13M aria-[invalid=true]:!border-[#F00] h-[3rem] text-[#000] text-pc-sub14m !mt-[0.37rem] placeholder:opacity-[0.7rem] rounded-[1.25rem] p-[1rem_0.75rem_1rem_1rem] border-[1px] border-solid border-[#DCDFE4] bg-white'
                  placeholder='Địa chỉ nhận hàng tại Việt Nam'
                  {...field}
                />
              </FormControl>
              <p className='pl-[0.75rem] xsm:text-pc-sub10m text-[rgba(0,0,0,0.60)] text-pc-sub12m !mt-[0.5rem]'>
                *Địa chỉ chi tiết, số nhà, tên đường,...
              </p>
              <FormMessage className='pl-[0.75rem] xsm:text-mb-sub10m xsm:mt-[0.25rem] !text-[#F00] text-pc-sub12m' />
            </FormItem>
          )}
        />
        {recipientAddressType !== 'atAmamyStore' && (
          <div className='flex xsm:flex-col xsm:space-y-[1.25rem] sm:space-x-[1.5rem]'>
            <FormField
              control={form.control}
              name='recipientCity'
              render={({field}) => (
                <FormItem
                  onClick={() => {
                    setIsCity(true)
                  }}
                  className='flex flex-col flex-1 space-y-0'
                >
                  <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                    Tỉnh/Thành phố (*)
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className='xsm:pointer-events-none aria-[invalid=true]:!border-[#F00] bg-white !mt-[0.37rem] p-[0.75rem_0.75rem_0.75rem_1rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] [&_svg]:filter [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:opacity-[1] !shadow-none xsm:h-[2.5rem] h-[3rem] [&_span]:!text-black [&_span]:text-pc-sub14m [&_span]:xsm:text-mb-13M focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? dataCity?.find(
                                (city) => city?.ProvinceName === field.value,
                              )?.ProvinceName
                            : 'Tỉnh/Thành phố người nhận'}
                          <ChevronDown className='h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='p-0'>
                      <Command>
                        <CommandInput placeholder='Tỉnh/Thành phố...' />
                        <CommandList>
                          <CommandEmpty>Chưa có thông tin</CommandEmpty>
                          <CommandGroup>
                            {Array.isArray(dataCity) &&
                              dataCity?.map((city) => (
                                <CommandItem
                                  value={city?.ProvinceName}
                                  key={city?.ProvinceID}
                                  onSelect={() => {
                                    form.setValue(
                                      'recipientCity',
                                      city?.ProvinceName,
                                      {shouldValidate: true},
                                    )
                                    form.setValue('district', '', {
                                      shouldValidate: true,
                                    })
                                    form.setValue(
                                      'recipientWardsandcommunes',
                                      '',
                                      {shouldValidate: true},
                                    )
                                    setDataFromOrder({
                                      ...dataFromOrder,
                                      ProvinceID: city?.ProvinceID,
                                      DistrictID: 0,
                                    })
                                    setWard([])
                                  }}
                                >
                                  {city?.ProvinceName}
                                  <Check
                                    className={cn(
                                      'ml-auto',
                                      city?.ProvinceName === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='district'
              render={({field}) => (
                <FormItem
                  onClick={() => {
                    setIsDistrict(true)
                  }}
                  className='flex flex-col flex-1 space-y-0'
                >
                  <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                    Quận Huyện (*)
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className='xsm:pointer-events-none aria-[invalid=true]:!border-[#F00] bg-white !mt-[0.37rem] p-[0.75rem_0.75rem_0.75rem_1rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] [&_svg]:filter [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:opacity-[1] !shadow-none xsm:h-[2.5rem] h-[3rem] [&_span]:!text-black [&_span]:text-pc-sub14m [&_span]:xsm:text-mb-13M focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? dataDistrict?.find(
                                (district) =>
                                  district?.DistrictName === field.value,
                              )?.DistrictName
                            : 'Quận Huyện người nhận'}
                          <ChevronDown className='h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='p-0'>
                      <Command>
                        <CommandInput placeholder='Tìm Quận Huyện...' />
                        <CommandList>
                          <CommandEmpty>
                            Hiện Tỉnh/Thành phố chưa có thông tìn về Quận Huyện
                          </CommandEmpty>
                          <CommandGroup>
                            {Array.isArray(dataDistrict) &&
                              dataDistrict?.map((district) => (
                                <CommandItem
                                  value={district?.DistrictName}
                                  key={district?.DistrictID}
                                  onSelect={() => {
                                    form.setValue(
                                      'district',
                                      district?.DistrictName,
                                      {shouldValidate: true},
                                    )
                                    form.setValue(
                                      'recipientWardsandcommunes',
                                      '',
                                      {shouldValidate: true},
                                    )
                                    setDataFromOrder({
                                      ...dataFromOrder,
                                      DistrictID: district?.DistrictID,
                                    })
                                  }}
                                >
                                  {district?.DistrictName}
                                  <Check
                                    className={cn(
                                      'ml-auto',
                                      district?.DistrictName === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='recipientWardsandcommunes'
              render={({field}) => (
                <FormItem
                  onClick={() => {
                    setIsWard(true)
                  }}
                  className='flex flex-col flex-1 space-y-0'
                >
                  <FormLabel className='pl-[0.75rem] text-[rgba(0,0,0,0.80)] text-pc-sub12s'>
                    Phường Xã (*)
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className='xsm:pointer-events-none aria-[invalid=true]:!border-[#F00] bg-white !mt-[0.37rem] p-[0.75rem_0.75rem_0.75rem_1rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] [&_svg]:filter [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:opacity-[1] !shadow-none xsm:h-[2.5rem] h-[3rem] [&_span]:!text-black [&_span]:text-pc-sub14m [&_span]:xsm:text-mb-13M focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? dataWard?.find(
                                (city) => city?.WardName === field.value,
                              )?.WardName
                            : 'Phường Xã người nhận'}
                          <ChevronDown className='h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='p-0'>
                      <Command>
                        <CommandInput placeholder='Tìm Phường Xã...' />
                        <CommandList>
                          <CommandEmpty>
                            Hiện Quận Huyện chưa có thông tìn về Phường Xã.
                          </CommandEmpty>
                          <CommandGroup>
                            {Array.isArray(dataWard) &&
                              dataWard?.map((ward, index: number) => (
                                <CommandItem
                                  value={ward?.WardName}
                                  key={index}
                                  onSelect={() => {
                                    form.setValue(
                                      'recipientWardsandcommunes',
                                      ward?.WardName,
                                      {shouldValidate: true},
                                    )
                                  }}
                                >
                                  {ward?.WardName}
                                  <Check
                                    className={cn(
                                      'ml-auto',
                                      ward?.WardName === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <div className='xsm:p-[1rem] xsm:bg-[#FAFAFA] xsm:shadow-lg xsm:space-x-[0.5rem] xsm:fixed xsm:bottom-0 xsm:z-[49] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0 flex items-center justify-between sm:w-full'>
          <div
            onClick={() => {
              setIndexTab(indexTab - 1)
              handleClickcurrentTab(prevStep)
            }}
            className='xsm:flex-1 cursor-pointer p-[0.75rem_1.5rem] flex-center rounded-[1.25rem] bg-[#D9F1FF]'
          >
            <p className='text-pc-sub16m text-black'>Quay lại</p>
          </div>
          <Button
            type='submit'
            disabled={!form.formState.isValid}
            className={cn(
              'xsm:flex-1 !shadow-none hover:bg-[#38B6FF] mt-[0rem] ml-auto h-[2.8125rem] flex-center p-[0.75rem_1.5rem] rounded-[1.25rem] bg-[#38B6FF]',
              !form.formState.isValid &&
                'bg-[#F0F0F0] [&_p]:text-[rgba(0,0,0,0.30)]',
            )}
          >
            <p className='text-white text-pc-sub16m'>Tiếp tục</p>
          </Button>
        </div>
        {isMobile && (
          <>
            <div
              onClick={() => {
                setIsCity(false)
                setIsDistrict(false)
                setIsWard(false)
              }}
              className={cn(
                '!mt-0 fixed transition-all duration-700 inset-0 bg-black/70 z-[51] hidden',
                isCity && 'block',
                isDistrict && 'block',
                isWard && 'block',
              )}
            ></div>
            <div
              className={cn(
                '!mt-0 fixed transition-all duration-500 shadow-lg bottom-[-125%] z-[52] left-0 w-full rounded-t-[1.25rem] bg-white overflow-hidden',
                isCity && 'bottom-0',
              )}
            >
              <div className='border-b-[1px] border-solid border-b-[#DCDFE4] relative p-[0.5rem] flex-center '>
                <p className='text-center text-[0.75rem] font-montserrat font-semibold tracking-[-0.015rem] text-black'>
                  Chọn Tỉnh/Thành phố
                </p>
                <div
                  onClick={() => {
                    setIsCity(false)
                  }}
                  className='absolute top-[0.5rem] right-[0.5rem]'
                >
                  <ICX className='size-[1.5rem]' />
                </div>
              </div>
              <div className='space-y-[0.5rem] pb-[2rem] overflow-hidden overflow-y-auto max-h-[70vh] hidden_scroll'>
                <Command>
                  <CommandInput placeholder='Tỉnh/Thành phố...' />
                  <CommandList>
                    <CommandEmpty>Chưa có thông tin</CommandEmpty>
                    <CommandGroup>
                      {Array.isArray(dataCity) &&
                        dataCity?.map((city) => (
                          <CommandItem
                            value={city?.ProvinceName}
                            key={city?.ProvinceID}
                            onSelect={() => {
                              form.setValue(
                                'recipientCity',
                                city?.ProvinceName,
                                {shouldValidate: true},
                              )
                              form.setValue('district', '', {
                                shouldValidate: true,
                              })
                              form.setValue('recipientWardsandcommunes', '', {
                                shouldValidate: true,
                              })
                              setDataFromOrder({
                                ...dataFromOrder,
                                ProvinceID: city?.ProvinceID,
                                DistrictID: 0,
                              })
                              setIsCity(false)
                              setWard([])
                            }}
                          >
                            {city?.ProvinceName}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            </div>
            <div
              className={cn(
                '!mt-0 fixed transition-all duration-500 shadow-lg bottom-[-125%] z-[52] left-0 w-full rounded-t-[1.25rem] bg-white overflow-hidden',
                isDistrict && 'bottom-0',
              )}
            >
              <div className='border-b-[1px] border-solid border-b-[#DCDFE4] relative p-[0.5rem] flex-center '>
                <p className='text-center text-[0.75rem] font-montserrat font-semibold tracking-[-0.015rem] text-black'>
                  Chọn Quận Huyện
                </p>
                <div
                  onClick={() => {
                    setIsDistrict(false)
                  }}
                  className='absolute top-[0.5rem] right-[0.5rem]'
                >
                  <ICX className='size-[1.5rem]' />
                </div>
              </div>
              <div className='space-y-[0.5rem] pb-[2rem] overflow-hidden overflow-y-auto max-h-[70vh] hidden_scroll'>
                <Command>
                  <CommandInput placeholder='Tìm Quận Huyện...' />
                  <CommandList>
                    <CommandEmpty>
                      Hiện Tỉnh/Thành phố chưa có thông tìn về Quận Huyện
                    </CommandEmpty>
                    <CommandGroup>
                      {Array.isArray(dataDistrict) &&
                        dataDistrict?.map((district) => (
                          <CommandItem
                            value={district?.DistrictName}
                            key={district?.DistrictID}
                            onSelect={() => {
                              form.setValue(
                                'district',
                                district?.DistrictName,
                                {shouldValidate: true},
                              )
                              form.setValue('recipientWardsandcommunes', '', {
                                shouldValidate: true,
                              })
                              setDataFromOrder({
                                ...dataFromOrder,
                                DistrictID: district?.DistrictID,
                              })
                              setIsDistrict(false)
                            }}
                          >
                            {district?.DistrictName}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            </div>
            <div
              className={cn(
                '!mt-0 fixed transition-all duration-500 shadow-lg bottom-[-125%] z-[52] left-0 w-full rounded-t-[1.25rem] bg-white overflow-hidden',
                isWard && 'bottom-0',
              )}
            >
              <div className='border-b-[1px] border-solid border-b-[#DCDFE4] relative p-[0.5rem] flex-center '>
                <p className='text-center text-[0.75rem] font-montserrat font-semibold tracking-[-0.015rem] text-black'>
                  Chọn Phường xã
                </p>
                <div
                  onClick={() => {
                    setIsWard(false)
                  }}
                  className='absolute top-[0.5rem] right-[0.5rem]'
                >
                  <ICX className='size-[1.5rem]' />
                </div>
              </div>
              <div className='space-y-[0.5rem] pb-[2rem] overflow-hidden overflow-y-auto max-h-[70vh] hidden_scroll'>
                <Command>
                  <CommandInput placeholder='Tìm Phường Xã...' />
                  <CommandList>
                    <CommandEmpty>
                      Hiện Quận Huyện chưa có thông tìn về Phường Xã.
                    </CommandEmpty>
                    <CommandGroup>
                      {Array.isArray(dataWard) &&
                        dataWard?.map((ward, index: number) => (
                          <CommandItem
                            value={ward?.WardName}
                            key={index}
                            onSelect={() => {
                              form.setValue(
                                'recipientWardsandcommunes',
                                ward?.WardName,
                                {shouldValidate: true},
                              )
                              setIsWard(false)
                            }}
                          >
                            {ward?.WardName}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            </div>
          </>
        )}
      </form>
    </Form>
  )
}
