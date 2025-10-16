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
import {Label} from '@/components/ui/label'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import ICX from '@/sections/tao-don/ICX'
import {zodResolver} from '@hookform/resolvers/zod'
import {Check, ChevronDown} from 'lucide-react'
import {useEffect, useMemo, useState} from 'react'
import {FieldErrors, useForm} from 'react-hook-form'
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
        message:
          'Định dạng không hợp lệ (viết liền không khoảng trắng vd: 0987654321)',
      },
    ),
  recipientAddress: z
    .string({
      required_error: 'Vui lòng nhập địa chỉ (Tên đường, số nhà) người nhận',
    })
    .min(1, 'Vui lòng nhập địa chỉ (Tên đường, số nhà) người nhận'),
  recipientAddressType: z.enum(
    ['atAmamyStore', 'registeredAddress', 'Nhận tại chợ Sapa'],
    {
      required_error: 'Vui lòng chọn nơi nhận hàng',
    },
  ),
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
  idOrder,
}: {
  handleClickcurrentTab: (nextTab: string) => void
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
  dataFromOrder: IDataFromOrder
  prevStep: string
  nextStep: string
  setIndexTab: React.Dispatch<React.SetStateAction<number>>
  indexTab: number
  idOrder: number
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
  const [recipientAddressType, setRecipientAddressType] =
    useState<string>('registeredAddress')
  const [pending, setPending] = useState<boolean>(false)
  const isVietSec = useMemo(
    () => recipientAddressType == 'registeredAddress' && idOrder === 1073,
    [recipientAddressType, idOrder],
  )
  const isAmeriacaToVietNam = useMemo(
    () => recipientAddressType === 'registeredAddress' && idOrder === 1183,
    [recipientAddressType, idOrder],
  )

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
          ? (dataFromOrder?.recipientCity ?? '')
          : 'un',
      recipientCodeCity:
        dataFromOrder?.recipientAddressType !== 'atAmamyStore'
          ? (dataFromOrder?.recipientCodeCity ?? '')
          : 'un',
      housingNumber: isVietSec
        ? dataFromOrder?.housingNumber
        : dataFromOrder?.housingNumber !== 'atAmamyStore'
          ? (dataFromOrder?.recipientCodeCity ?? '')
          : 'un',
      roadName: isVietSec
        ? dataFromOrder?.roadName
        : dataFromOrder?.roadName !== 'atAmamyStore'
          ? (dataFromOrder?.recipientCodeCity ?? '')
          : 'un',

      district:
        dataFromOrder?.recipientAddressType !== 'atAmamyStore'
          ? (dataFromOrder?.district ?? '')
          : 'un',
      recipientWardsandcommunes:
        dataFromOrder?.recipientAddressType !== 'atAmamyStore'
          ? (dataFromOrder?.recipientWardsandcommunes ?? '')
          : 'un',
    },
  })

  // set default value 'un' cho các field thêm ở viet-sec, để có thể next step không ảnh hưởng các chiều khác
  useEffect(() => {
    if (!isVietSec) {
      form.setValue('housingNumber', 'un')
      form.setValue('recipientCodeCity', 'un')
      form.setValue('roadName', 'un')
    }
  }, [isVietSec])

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

  const onError = (errors: FieldErrors<z.infer<typeof formSchema>>) => {
    const firstErrorField = Object.keys(errors)[0]
    if (!firstErrorField) {
      return
    }

    const el = document.querySelector(`[name="${firstErrorField}"]`)
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'center'})
      ;(el as HTMLElement).focus({preventScroll: true})
    }
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
          ? (form?.getValues('recipientCity') ?? 'un')
          : (form?.getValues('recipientCity') ??
              dataFromOrder?.recipientCity ??
              ''),
        {shouldValidate: true},
      )

      form.setValue(
        'district',
        recipientAddressType === 'atAmamyStore'
          ? (form?.getValues('district') ?? 'un')
          : (form?.getValues('district') ?? dataFromOrder?.district ?? ''),
        {shouldValidate: true},
      )
      form.setValue(
        'recipientWardsandcommunes',
        recipientAddressType === 'atAmamyStore'
          ? (form?.getValues('recipientWardsandcommunes') ?? 'un')
          : (form?.getValues('recipientWardsandcommunes') ??
              dataFromOrder?.recipientWardsandcommunes ??
              ''),
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
    }, 1500)
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

  // check if choosen address is atAmamyStore then not check for city, district, ward
  useEffect(() => {
    if (recipientAddressType === 'atAmamyStore') {
      form.setValue('recipientCity', 'un')
      form.setValue('district', 'un')
      form.setValue('recipientWardsandcommunes', 'un')
      form.setValue('recipientAddress', 'Nhận tại cửa hàng Amamy')

      form.trigger([
        'recipientCity',
        'district',
        'recipientWardsandcommunes',
        'recipientAddress',
      ])
    } else if (recipientAddressType === 'Nhận tại chợ Sapa') {
      form.setValue('recipientAddress', 'Nhận tại chợ Sapa')
      form.setValue('recipientCity', 'un')
      form.setValue('district', 'un')
      form.setValue('recipientWardsandcommunes', 'un')
      if (isVietSec) {
        form.setValue('housingNumber', 'un')
        form.setValue('recipientCodeCity', 'un')
        form.setValue('roadName', 'un')
      }

      form.trigger([
        'recipientCity',
        'district',
        'recipientWardsandcommunes',
        'recipientAddress',
      ])
    } else if (isVietSec) {
      form.setValue('recipientWardsandcommunes', 'un')
      form.setValue('district', 'un')
      if (form.getValues('recipientCodeCity') === 'un') {
        form.setValue('housingNumber', '')
        form.setValue('recipientCodeCity', '')
        form.setValue('recipientCity', '')
        form.setValue('roadName', '')
        form.setValue('recipientAddress', '')
      }
    }
  }, [form, recipientAddressType])

  const formDeliveryInformation = useMemo(() => {
    const shippingDirectionId = +dataFromOrder.shipping
    let descFieldName = ''
    let placeholderFieldStreetName = `Marien Strasse`
    let placeholderFieldHouseNumber = `15`
    let placeholderFieldCityName = `Nhập tên thành phố`
    let placeholderFieldCityCode = `10117`
    switch (shippingDirectionId) {
      // Việt - Séc
      case 1073:
        descFieldName = `*Bắt buộc đúng tên trên chuông cửa nhằm giao hàng đúng hoặc đúng Občanský průkaz.`
        placeholderFieldStreetName = `Lečkova`
        placeholderFieldHouseNumber = `15`
        placeholderFieldCityName = `Praha`
        placeholderFieldCityCode = `14900`
        break
    }

    return {
      descFieldName,
      placeholderFieldStreetName,
      placeholderFieldHouseNumber,
      placeholderFieldCityName,
      placeholderFieldCityCode,
    }
  }, [dataFromOrder.shipping])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className='space-y-[1.75rem] xsm:space-y-[1.25rem]'
      >
        {!isMobile && (
          <h2 className='mb-[1.5rem] font-montserrat text-[1rem] font-bold leading-[1.3rem] tracking-[-0.03rem] text-[#33A6E8] xsm:hidden'>
            Thông tin nhận hàng {idOrder !== 1073 && 'tại Việt Nam'}
          </h2>
        )}

        <div className='mb-[1.75rem] flex space-x-[1.5rem] xsm:mb-[1.25rem] xsm:flex-col xsm:space-x-0 xsm:space-y-[1.25rem]'>
          {/* name */}
          <FormField
            control={form.control}
            name='recipientName'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                  Tên người nhận <strong>(*)</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                    placeholder='Tên người nhận'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                {formDeliveryInformation.descFieldName && (
                  <p className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] text-[rgba(0,0,0,0.80)]'>
                    {formDeliveryInformation.descFieldName}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* phone */}
          <FormField
            control={form.control}
            name='recipientPhone'
            render={({field}) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                  Số điện thoại <strong>(*)</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                    placeholder='0987654321'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
              </FormItem>
            )}
          />
        </div>

        {/* address */}
        <FormField
          control={form.control}
          name='recipientAddressType'
          render={({field}) => (
            <FormItem className='flex-1 space-y-0'>
              <FormControl>
                <RadioGroup
                  value={field.value || 'registeredAddress'}
                  onValueChange={(value) => {
                    field.onChange(value)
                    setRecipientAddressType(value)
                  }}
                  className={cn(
                    'mb-[1.75rem] flex gap-0 space-x-[1.5rem] xsm:mb-[1.25rem] xsm:flex-col xsm:space-x-0 xsm:space-y-2',
                    {hidden: isAmeriacaToVietNam},
                  )}
                >
                  {/* item 1 */}
                  {(() => {
                    const value = 'registeredAddress'
                    const isChecked = field.value === value
                    return (
                      <Label
                        htmlFor='r1'
                        className='block w-full cursor-pointer'
                      >
                        <FormItem
                          className={cn(
                            'flex-1 xsm:!ml-0',
                            'relative flex flex-row items-center space-x-[0.75rem] space-y-0 rounded-[1.25rem] border-[1.2px] p-[0.88rem_1.25rem] transition-all duration-150 xsm:space-x-[0.5rem] xsm:rounded-[2rem] xsm:p-[0.62rem_0.75rem]',
                            isChecked
                              ? 'border-[#38B6FF] bg-[#F1F9FF]'
                              : 'border-[#DCDFE4] bg-white',
                          )}
                        >
                          <FormControl>
                            <RadioGroupItem
                              id='r1'
                              value={value}
                              className={cn(
                                // layout reset
                                'relative box-border inline-flex items-center justify-center align-middle',
                                // fixed shape
                                'size-[1.25rem] rounded-full border border-[#A3DDFF]',
                                // visual bg
                                'bg-[rgba(239,239,239,0.60)] shadow-none transition-all duration-200 ease-out',
                                // ensure perfect circle
                                'aspect-square overflow-hidden',
                                // handle checked state
                                'data-[state=checked]:border-[#38B6FF] data-[state=checked]:bg-transparent',
                                // hide radix default SVG
                                '[&_svg]:hidden',
                                // span (indicator wrapper)
                                'flex items-center justify-center [&>span]:absolute [&>span]:inset-0',
                                // pseudo indicator
                                '[&>span]:before:block [&>span]:before:rounded-full [&>span]:before:transition-all [&>span]:before:duration-200',
                                '[&>span]:before:size-[0.75rem] [&>span]:before:bg-transparent [&>span]:before:content-[""]',
                                '[&[data-state=checked]>span:before]:!bg-[#38B6FF]',
                                // fine-tune optical centering
                                'translate-y-[0.5px]', // adjusts subpixel misalignment
                              )}
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor='r1'
                            className='cursor-pointer font-montserrat text-[0.875rem] font-semibold leading-normal tracking-[-0.0175rem] text-[rgba(0,0,0,0.92)] xsm:line-clamp-2 xsm:text-[0.8125rem] xsm:tracking-[-0.01625rem]'
                          >
                            Nhận tại địa chỉ đăng ký
                          </FormLabel>
                        </FormItem>
                      </Label>
                    )
                  })()}

                  {/* item 2 */}
                  {idOrder !== 1073 &&
                    (() => {
                      const value = 'atAmamyStore'
                      const isChecked = field.value === value
                      return (
                        <Label
                          htmlFor='r2'
                          className='block w-full cursor-pointer'
                        >
                          <FormItem
                            className={cn(
                              'flex-1 xsm:!ml-0',
                              'relative flex flex-row items-center space-x-[0.75rem] space-y-0 rounded-[1.25rem] border-[1.2px] p-[0.88rem_1.25rem] transition-all duration-150 xsm:space-x-[0.5rem] xsm:rounded-[2rem] xsm:p-[0.62rem_0.75rem]',
                              isChecked
                                ? 'border-[#38B6FF] bg-[#F1F9FF]'
                                : 'border-[#DCDFE4] bg-white',
                            )}
                          >
                            <FormControl>
                              <RadioGroupItem
                                id='r2'
                                value={value}
                                className={cn(
                                  // layout reset
                                  'relative box-border inline-flex items-center justify-center align-middle',
                                  // fixed shape
                                  'size-[1.25rem] rounded-full border border-[#A3DDFF]',
                                  // visual bg
                                  'bg-[rgba(239,239,239,0.60)] shadow-none transition-all duration-200 ease-out',
                                  // ensure perfect circle
                                  'aspect-square overflow-hidden',
                                  // handle checked state
                                  'data-[state=checked]:border-[#38B6FF] data-[state=checked]:bg-transparent',
                                  // hide radix default SVG
                                  '[&_svg]:hidden',
                                  // span (indicator wrapper)
                                  'flex items-center justify-center [&>span]:absolute [&>span]:inset-0',
                                  // pseudo indicator
                                  '[&>span]:before:block [&>span]:before:rounded-full [&>span]:before:transition-all [&>span]:before:duration-200',
                                  '[&>span]:before:size-[0.75rem] [&>span]:before:bg-transparent [&>span]:before:content-[""]',
                                  '[&[data-state=checked]>span:before]:!bg-[#38B6FF]',
                                  // fine-tune optical centering
                                  'translate-y-[0.5px]', // adjusts subpixel misalignment
                                )}
                              />
                            </FormControl>
                            <FormLabel
                              htmlFor='r2'
                              className='cursor-pointer font-montserrat text-[0.875rem] font-semibold leading-normal tracking-[-0.0175rem] text-[rgba(0,0,0,0.92)] xsm:ml-0 xsm:line-clamp-2 xsm:text-[0.8125rem] xsm:tracking-[-0.01625rem]'
                            >
                              Nhận tại cửa hàng Amamy
                            </FormLabel>
                          </FormItem>
                        </Label>
                      )
                    })()}

                  {/* item 3 */}
                  {idOrder === 1073 &&
                    (() => {
                      const value = 'Nhận tại chợ Sapa'
                      const isChecked = field.value === value
                      return (
                        <Label
                          htmlFor='r3'
                          className='block w-full cursor-pointer'
                        >
                          <FormItem
                            className={cn(
                              'flex-1 xsm:!ml-0',
                              'relative flex flex-row items-center space-x-[0.75rem] space-y-0 rounded-[1.25rem] border-[1.2px] p-[0.88rem_1.25rem] transition-all duration-150 xsm:space-x-[0.5rem] xsm:rounded-[2rem] xsm:p-[0.62rem_0.75rem]',
                              isChecked
                                ? 'border-[#38B6FF] bg-[#F1F9FF]'
                                : 'border-[#DCDFE4] bg-white',
                            )}
                          >
                            <FormControl>
                              <RadioGroupItem
                                id='r3'
                                value={value}
                                className={cn(
                                  // layout reset
                                  'relative box-border inline-flex items-center justify-center align-middle',
                                  // fixed shape
                                  'size-[1.25rem] rounded-full border border-[#A3DDFF]',
                                  // visual bg
                                  'bg-[rgba(239,239,239,0.60)] shadow-none transition-all duration-200 ease-out',
                                  // ensure perfect circle
                                  'aspect-square overflow-hidden',
                                  // handle checked state
                                  'data-[state=checked]:border-[#38B6FF] data-[state=checked]:bg-transparent',
                                  // hide radix default SVG
                                  '[&_svg]:hidden',
                                  // span (indicator wrapper)
                                  'flex items-center justify-center [&>span]:absolute [&>span]:inset-0',
                                  // pseudo indicator
                                  '[&>span]:before:block [&>span]:before:rounded-full [&>span]:before:transition-all [&>span]:before:duration-200',
                                  '[&>span]:before:size-[0.75rem] [&>span]:before:bg-transparent [&>span]:before:content-[""]',
                                  '[&[data-state=checked]>span:before]:!bg-[#38B6FF]',
                                  // fine-tune optical centering
                                  'translate-y-[0.5px]', // adjusts subpixel misalignment
                                )}
                              />
                            </FormControl>
                            <FormLabel
                              htmlFor='r3'
                              className='cursor-pointer font-montserrat text-[0.875rem] font-semibold leading-normal tracking-[-0.0175rem] text-[rgba(0,0,0,0.92)] xsm:line-clamp-2 xsm:text-[0.8125rem] xsm:tracking-[-0.01625rem]'
                            >
                              Nhận tại chợ Sapa, Khách ra nhận.
                            </FormLabel>
                          </FormItem>
                        </Label>
                      )
                    })()}
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
            <FormItem className='flex-1 space-y-0'>
              <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                Địa chỉ nhận hàng chi tiết <strong>(*)</strong>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={
                    recipientAddressType === 'registeredAddress' ? false : true
                  }
                  className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                  placeholder='Địa chỉ nhận hàng tại Việt Nam'
                  {...field}
                />
              </FormControl>
              <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
              <p className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] text-[rgba(0,0,0,0.80)]'>
                *Địa chỉ chi tiết, số nhà, tên đường,...
              </p>
            </FormItem>
          )}
        />

        {recipientAddressType == 'registeredAddress' && idOrder !== 1073 && (
          <div className='!mb-[1.75rem] flex sm:space-x-[1.25rem] xsm:!mb-0 xsm:flex-col xsm:space-y-[1.25rem]'>
            <FormField
              control={form.control}
              name='recipientCity'
              render={({field}) => (
                <FormItem
                  onClick={() => {
                    setIsCity(true)
                  }}
                  className='flex flex-1 flex-col space-y-0'
                >
                  <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                    Tỉnh/Thành phố <strong>(*)</strong>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] shadow-none placeholder:opacity-[0.3] focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 aria-[invalid=true]:!border-[#F00] xsm:pointer-events-none xsm:!mt-[0.38rem] xsm:h-[2.5rem] [&_span]:font-montserrat [&_span]:text-[0.875rem] [&_span]:font-medium [&_span]:leading-[1.3125rem] [&_span]:tracking-[-0.02625rem] [&_span]:text-[rgba(0,0,0,0.92)] [&_span]:xsm:text-[0.8125rem] [&_span]:xsm:leading-[1rem] [&_span]:xsm:tracking-[-0.02438rem] [&_svg]:opacity-[1] [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:filter'>
                        <Button
                          type='button'
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]',
                            'justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? dataCity?.find(
                                (city) => city?.ProvinceName === field.value,
                              )?.ProvinceName
                            : 'Tỉnh/Thành phố người nhận'}
                          <ChevronDown className='h-4 w-4' />
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
                  <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
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
                  className='flex flex-1 flex-col space-y-0'
                >
                  <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                    Quận Huyện <strong>(*)</strong>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className='[&_span]:xsm:text-[0.8125rem !mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] shadow-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 aria-[invalid=true]:!border-[#F00] xsm:pointer-events-none xsm:!mt-[0.38rem] xsm:h-[2.5rem] [&_span]:font-montserrat [&_span]:text-[0.875rem] [&_span]:font-medium [&_span]:leading-[1.3125rem] [&_span]:tracking-[-0.02625rem] [&_span]:text-[rgba(0,0,0,0.92)] [&_span]:xsm:leading-[1rem] [&_span]:xsm:tracking-[-0.02438rem] [&_svg]:opacity-[1] [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:filter'>
                        <Button
                          type='button'
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]',
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
                          <ChevronDown className='h-4 w-4' />
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
                  <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
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
                  className='flex flex-1 flex-col space-y-0'
                >
                  <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                    Phường Xã <strong>(*)</strong>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className='[&_span]:xsm:text-[0.8125rem !mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] shadow-none placeholder:opacity-[0.3] focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 aria-[invalid=true]:!border-[#F00] xsm:pointer-events-none xsm:!mt-[0.38rem] xsm:h-[2.5rem] [&_span]:font-montserrat [&_span]:text-[0.875rem] [&_span]:font-medium [&_span]:leading-[1.3125rem] [&_span]:tracking-[-0.02625rem] [&_span]:text-[rgba(0,0,0,0.92)] [&_span]:xsm:leading-[1rem] [&_span]:xsm:tracking-[-0.02438rem] [&_svg]:opacity-[1] [&_svg]:brightness-[100] [&_svg]:invert-[100] [&_svg]:filter'>
                        <Button
                          type='button'
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]',
                            'justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? dataWard?.find(
                                (city) => city?.WardName === field.value,
                              )?.WardName
                            : 'Phường Xã người nhận'}
                          <ChevronDown className='h-4 w-4' />
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
                  <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                </FormItem>
              )}
            />
          </div>
        )}

        {isVietSec && (
          <>
            <div className='flex space-x-[1.5rem]'>
              <FormField
                control={form.control}
                name='housingNumber'
                render={({field}) => (
                  <FormItem className='flex-1 space-y-0'>
                    <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                      Số nhà<strong> (*)</strong>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                        placeholder={
                          formDeliveryInformation.placeholderFieldHouseNumber
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='roadName'
                render={({field}) => (
                  <FormItem className='flex-1 space-y-0'>
                    <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                      Tên đường <strong>(*)</strong>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                        placeholder={
                          formDeliveryInformation.placeholderFieldStreetName
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
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
                    <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                      Thành phố (*)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                        placeholder={
                          formDeliveryInformation.placeholderFieldCityName
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='recipientCodeCity'
                render={({field}) => (
                  <FormItem className='flex-1 space-y-0'>
                    <FormLabel className='pl-[1rem] font-montserrat text-[0.75rem] font-semibold leading-normal tracking-[-0.015rem] text-[rgba(0,0,0,0.80)] [&_strong]:font-medium xsm:[&_strong]:text-[rgba(0,0,0,0.60)]'>
                      Mã thành phố <strong>(*)</strong>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='!mt-[0.5rem] h-[3rem] rounded-[1.25rem] border-[1px] border-solid border-[#DCDFE4] bg-white py-[0.75rem] pl-[1rem] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] tracking-[-0.02625rem] text-[rgba(0,0,0,0.92)] shadow-none placeholder:opacity-[0.3] aria-[invalid=true]:!border-[#F00] aria-[invalid=true]:ring-0 aria-[invalid=true]:focus-visible:ring-0 xsm:!mt-[0.38rem] xsm:h-[2.5rem] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[-0.02438rem]'
                        placeholder={
                          formDeliveryInformation.placeholderFieldCityCode
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='!mt-[0.25rem] pl-[1rem] font-montserrat text-[0.75rem] font-medium leading-[1.05rem] tracking-[-0.0225rem] !text-[#F00]' />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        {/* footer */}
        <div className='mt-[1.5rem] flex w-full items-center justify-between space-x-[1.25rem] xsm:fixed xsm:bottom-0 xsm:left-0 xsm:right-0 xsm:z-[49] xsm:mt-0 xsm:space-x-[0.5rem] xsm:bg-[#FAFAFA] xsm:p-[1rem] disabled:xsm:opacity-[1]'>
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

        {isMobile && (
          <>
            <div
              onClick={() => {
                setIsCity(false)
                setIsDistrict(false)
                setIsWard(false)
              }}
              className={cn(
                'pointer-events-none fixed inset-0 z-[51] !mt-0 bg-black/0 transition-all duration-700 ease-in-out',
                isCity && 'pointer-events-auto bg-black/70',
                isDistrict && 'pointer-events-auto bg-black/70',
                isWard && 'pointer-events-auto bg-black/70',
              )}
            ></div>
            <div
              className={cn(
                'fixed bottom-0 left-0 z-[52] !mt-0 w-full translate-y-full overflow-hidden rounded-t-[1.25rem] bg-white shadow-lg transition-all duration-700 ease-in-out',
                isCity && 'translate-y-0',
              )}
            >
              <div className='relative border-b-[1px] border-solid border-b-[#DCDFE4] p-[0.5rem] flex-center'>
                <p className='text-center font-montserrat text-[0.75rem] font-semibold tracking-[-0.015rem] text-black'>
                  Chọn Tỉnh/Thành phố
                </p>
                <div
                  onClick={() => {
                    setIsCity(false)
                  }}
                  className='absolute right-[0.5rem] top-[0.5rem]'
                >
                  <ICX className='size-[1.5rem]' />
                </div>
              </div>
              <div className='hidden_scroll max-h-[70vh] space-y-[0.5rem] overflow-hidden overflow-y-auto pb-[2rem]'>
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
                'fixed bottom-0 left-0 z-[52] !mt-0 w-full translate-y-full overflow-hidden rounded-t-[1.25rem] bg-white shadow-lg transition-all duration-700 ease-in-out',
                isDistrict && 'translate-y-0',
              )}
            >
              <div className='relative border-b-[1px] border-solid border-b-[#DCDFE4] p-[0.5rem] flex-center'>
                <p className='text-center font-montserrat text-[0.75rem] font-semibold tracking-[-0.015rem] text-black'>
                  Chọn Quận Huyện
                </p>
                <div
                  onClick={() => {
                    setIsDistrict(false)
                  }}
                  className='absolute right-[0.5rem] top-[0.5rem]'
                >
                  <ICX className='size-[1.5rem]' />
                </div>
              </div>
              <div className='hidden_scroll max-h-[70vh] space-y-[0.5rem] overflow-hidden overflow-y-auto pb-[2rem]'>
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
                'fixed bottom-0 left-0 z-[52] !mt-0 w-full translate-y-full overflow-hidden rounded-t-[1.25rem] bg-white shadow-lg transition-all duration-700 ease-in-out',
                isWard && 'translate-y-0',
              )}
            >
              <div className='relative border-b-[1px] border-solid border-b-[#DCDFE4] p-[0.5rem] flex-center'>
                <p className='text-center font-montserrat text-[0.75rem] font-semibold tracking-[-0.015rem] text-black'>
                  Chọn Phường xã
                </p>
                <div
                  onClick={() => {
                    setIsWard(false)
                  }}
                  className='absolute right-[0.5rem] top-[0.5rem]'
                >
                  <ICX className='size-[1.5rem]' />
                </div>
              </div>
              <div className='hidden_scroll max-h-[70vh] space-y-[0.5rem] overflow-hidden overflow-y-auto pb-[2rem]'>
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
