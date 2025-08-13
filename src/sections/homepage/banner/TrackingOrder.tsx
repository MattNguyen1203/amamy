'use client'

import InputField from '@/app/(baselayout)/tinh-gia-van-chuyen/_components/InputField'
import RadioField from '@/app/(baselayout)/tinh-gia-van-chuyen/_components/RadioField'
import SelectField from '@/app/(baselayout)/tinh-gia-van-chuyen/_components/SelectField'
import BtnBlue from '@/components/button/BtnBlue'
// import CardGradient from '@/components/card-gradient/CardGradient'
import ImageV2 from '@/components/image/ImageV2'
import Search from '@/components/svg/Search'
import useDeliveryPrice from '@/hooks/useDeliveryPrice'
import {cn} from '@/lib/utils'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/sections/homepage/banner/tabs-custom'
import endpoints from '@/utils/endpoints'
// import AIButton from '@/sections/service/section2/AIButton'
import {
  CurrencyToUsdResType,
  DeliveryCurrencyType,
  DeliveryDirectionResType,
  DeliveryDirectionType,
  DeliveryFacilityType,
  DeliveryFreightType,
  DeliveryWeightType,
  IBoxChatAI,
} from '@/utils/type'
import {useRouter} from 'next/navigation'
import {useEffect, useMemo, useState} from 'react'

const deliveryFacilityMap: Record<DeliveryFacilityType, string> = {
  hanoi_city: 'Hà Nội',
  hochiminh_city: 'Thành phố Hồ Chí Minh',
  california: 'California',
  texas: 'Texas',
}

const deliveryFreightTypeMap: Record<DeliveryFreightType, string> = {
  regular_product: 'Hàng thường',
  difficult_product: 'Hàng khó',
}

const deliveryCurrencyMap: Record<
  DeliveryCurrencyType,
  {name: string; unit: string}
> = {
  vnd: {name: 'VIETNAMDONG', unit: 'đ'},
  usd: {name: 'USD', unit: ' USD'},
  won: {name: 'WON', unit: ' won'},
  yen: {name: 'YÊN', unit: ' yên'},
  euro: {name: 'EURO', unit: ' euro'},
}
const deliveryWeightInputMap: Record<
  DeliveryWeightType,
  {label: string; placeholder: string}
> = {
  kg: {
    label: 'Nhập số cân cần gửi (*)',
    placeholder: '10kg',
  },
  lbs: {
    label: 'Nhập số lbs cần gửi (*)',
    placeholder: '10lbs',
  },
  package: {
    label: 'Nhập số kiện hàng cần gửi (*)',
    placeholder: '10 kiện hàng',
  },
}

type DeliveryInformationType = {
  deliveryDirection?: string
  deliveryCurrency?: string
  deliveryWeight?: number | string
  deliveryFacility?: string
  deliveryType?: string
  deliveryFreightType?: string
}

interface TrackingOrderProps {
  boxChatAI: IBoxChatAI
  deliveryDirection: DeliveryDirectionResType
  currencyToUsd: CurrencyToUsdResType
}

const TrackingOrder = ({
  // boxChatAI,
  deliveryDirection,
  currencyToUsd,
}: TrackingOrderProps) => {
  console.log({deliveryDirection, currencyToUsd})
  const [value, setValue] = useState('search-order')
  const [inputSearch, setInputSearch] = useState('')

  const router = useRouter()
  const handleTrackingOrder = () => {
    // handle tracking order
    // setSearchValue(inputSearch)
    // Chuyển hướng đến trang theo dõi vận đơn
    router.push(`/theo-doi-van-don?code=${inputSearch}`)
  }

  // const messageItems = [
  //   {
  //     isUser: true,
  //     message: boxChatAI.customer_chat,
  //   },
  //   {
  //     isUser: false,
  //     message: boxChatAI.ai_chat,
  //   },
  // ]

  const [isDeliverForeign, setIsDeliveryForeign] = useState<boolean>(false)
  const [deliveryInformation, setDeliveryInformation] =
    useState<DeliveryInformationType>({})

  const formatPriceByLocale = (price: number, currencyCode: string) => {
    const currencyMap: Record<string, string> = {
      usd: 'USD',
      vnd: 'VND',
      euro: 'EUR',
      won: 'KRW',
      yen: 'JPY',
    }

    const intlCurrency = currencyMap[currencyCode.toLowerCase()] || 'USD'

    return new Intl.NumberFormat('en-US', {
      currency: intlCurrency,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const selectedDeliveryRoute = useMemo(
    () =>
      deliveryDirection?.data?.find(
        ({slug}) => slug === deliveryInformation.deliveryDirection,
      ),
    [deliveryDirection?.data, deliveryInformation.deliveryDirection],
  )

  const deliveryDirectionOptions = useMemo(
    () =>
      Array.isArray(deliveryDirection?.data)
        ? deliveryDirection?.data?.map(({title, slug, featured_image}) => ({
            name: title,
            value: slug,
            icon: featured_image,
          }))
        : [],
    [deliveryDirection?.data],
  )

  const deliveryFacilityOptions = useMemo(
    () =>
      Array.isArray(selectedDeliveryRoute?.acf?.delivery_price_list)
        ? selectedDeliveryRoute?.acf?.delivery_price_list?.map(
            ({delivery_facility}) => ({
              name: deliveryFacilityMap[delivery_facility],
              value: String(delivery_facility),
            }),
          )
        : [],
    [selectedDeliveryRoute],
  )
  const deliveryFreightTypeOptions = useMemo(
    () =>
      Array.isArray(selectedDeliveryRoute?.acf?.delivery_price_list)
        ? selectedDeliveryRoute?.acf?.delivery_price_list?.map(
            ({product_type}) => ({
              name: deliveryFreightTypeMap[product_type],
              value: product_type,
            }),
          )
        : [],
    [selectedDeliveryRoute],
  )

  const deliveryDomestic = useMemo(() => {
    const paid = selectedDeliveryRoute?.acf?.domestic_delivery?.paid_delivery
    const free = selectedDeliveryRoute?.acf?.domestic_delivery?.free_delivery
    return paid && free
      ? [
          {
            name: `Ship nội địa (${formatPriceByLocale(
              +paid.price,
              paid.currency,
            )} ${paid.currency}/${paid.unit_type})`,
            value: paid.price,
          },
          {name: free.condition_label, value: 'free'},
        ]
      : []
  }, [selectedDeliveryRoute])

  const deliveryCurrencyOptions = useMemo(
    () =>
      Array.isArray(selectedDeliveryRoute?.acf?.currency)
        ? selectedDeliveryRoute.acf.currency.map((code) => ({
            name: deliveryCurrencyMap[code]?.name,
            value: code,
          }))
        : [],
    [selectedDeliveryRoute],
  )

  const deliveryPrice = useDeliveryPrice({
    currencyToUsd,
    deliveryDirection,
    deliveryInformation,
    isDeliverForeign,
  })

  const handleChangeDeliveryInformation = (
    name: string,
    value: string | number,
  ) => {
    setDeliveryInformation((prevData) => ({...prevData, [name]: value}))
  }

  useEffect(() => {
    const deliveryDirectionValue = deliveryInformation['deliveryDirection']
    if (!deliveryDirectionValue) return
    const directionRoute = deliveryDirection?.data?.find(
      ({slug}) => slug === deliveryDirectionValue,
    )
    if (!directionRoute) return
    const directionType: DeliveryDirectionType =
      directionRoute?.acf?.delivery_direction
    setIsDeliveryForeign(directionType === 'vn_to_world')
  }, [deliveryDirection?.data, deliveryInformation])

  useEffect(() => {
    setDeliveryInformation((prevData) => ({
      ...prevData,
      deliveryWeight: '',
      deliveryCurrency: '',
      deliveryFacility: '',
      deliveryType: '',
    }))
  }, [selectedDeliveryRoute])

  return (
    <Tabs
      onValueChange={setValue}
      defaultValue='search-order'
      className='w-[38.1875rem] xsm:w-full xsm:shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] xsm:rounded-[1.25rem]'
    >
      <TabsList className='relative xsm:w-full'>
        <TabsTrigger
          className='relative z-10 xsm:flex-1 text-pc-tab-title xsm:text-[0.75rem] xsm:font-semibold xsm:leading-[1.33] xsm:tracking-[-0.0225rem] text-[rgba(0,0,0,0.60)] opacity-[0.5] data-[state=active]:opacity-[1] data-[state=active]:text-black'
          value='search-order'
        >
          Theo dõi bưu kiện
        </TabsTrigger>
        <TabsTrigger
          className='relative z-10 xsm:flex-1 text-pc-tab-title xsm:text-[0.75rem] xsm:font-semibold xsm:leading-[1.33] xsm:tracking-[-0.0225rem] text-[rgba(0,0,0,0.60)] opacity-[0.5] data-[state=active]:opacity-[1] data-[state=active]:text-black'
          value='estimate-price'
        >
          Dự tính giá vận chuyển
        </TabsTrigger>
        <ImageV2
          alt=''
          width={300}
          height={200}
          src='/homepage/tabs.webp'
          className={cn(
            'w-auto h-[5.6875rem] xsm:h-[4.625rem] object-cover absolute top-0 xsm:top-0.5',
            value === 'search-order'
              ? 'left-[1.4rem] xsm:left-[2.4rem] transform -scale-x-100'
              : 'right-[4rem] xsm:right-[2.3rem]',
          )}
        />
      </TabsList>
      <TabsContent
        value='search-order'
        className='relative z-10 sm:shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] '
      >
        <input
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleTrackingOrder()
            }
          }}
          type='text'
          placeholder='Nhập mã vận đơn'
          className='w-full p-4 xsm:p-3 border border-[#CFD0D5] outline-none rounded-[1.25rem] text-pc-sub14m xsm:text-mb-13M text-black placeholder:text-black/30'
        />
        <button
          onClick={handleTrackingOrder}
          className='mt-4 xsm:mt-2 h-12 xsm:h-10 flex-center w-full space-x-3 p-3 bg-Blue-Primary rounded-[1.25rem]'
        >
          <span className='text-pc-sub16m xsm:text-pc-sub14m text-white'>
            Tra cứu đơn hàng
          </span>
          <Search className='size-[1.125rem] xsm:size-[0.9375rem]' />
        </button>
      </TabsContent>
      <TabsContent
        value='estimate-price'
        className='relative text-black z-10 sm:shadow-[0px_4px_32px_0px_rgba(0,39,97,0.08)] overflow-hidden'
      >
        <div className='grid gap-[0.75rem] grid-cols-2'>
          <div className='col-span-full'>
            <SelectField
              hasPrefix={true}
              name='deliveryDirection'
              variant='primary'
              label='Lựa chọn chiều vận chuyển (*)'
              placeholder='Chọn chiều vận chuyển bạn muốn gửi'
              options={deliveryDirectionOptions}
              value={deliveryInformation['deliveryDirection'] ?? ''}
              onChange={handleChangeDeliveryInformation}
            />
          </div>

          <div
            className={cn('col-span-full hidden', {
              block:
                selectedDeliveryRoute &&
                selectedDeliveryRoute?.acf?.dependency_price === 'facility',
            })}
          >
            <SelectField
              name='deliveryFacility'
              variant='primary'
              label='Chọn cơ sở gửi hàng (*)'
              placeholder='Chọn cơ sở gửi hàng'
              options={deliveryFacilityOptions}
              value={deliveryInformation['deliveryFacility'] ?? ''}
              onChange={handleChangeDeliveryInformation}
            />
          </div>

          <div
            className={cn('col-span-full hidden', {
              block:
                selectedDeliveryRoute &&
                selectedDeliveryRoute?.acf?.dependency_price === 'freight_type',
            })}
          >
            <SelectField
              variant='primary'
              name='deliveryFreightType'
              label='Chọn loại hàng (*)'
              placeholder='Chọn loại hàng'
              options={deliveryFreightTypeOptions}
              value={deliveryInformation['deliveryFreightType'] ?? ''}
              onChange={handleChangeDeliveryInformation}
            />
          </div>

          <div
            className={cn('col-span-full hidden', {
              block:
                selectedDeliveryRoute &&
                !isDeliverForeign &&
                deliveryDomestic?.length,
            })}
          >
            <RadioField
              name='deliveryType'
              value={deliveryInformation['deliveryType'] ?? ''}
              onChange={handleChangeDeliveryInformation}
              options={deliveryDomestic}
            />
          </div>
          <div className='col-span-1 xsm:col-span-full'>
            <InputField
              name='deliveryWeight'
              value={deliveryInformation['deliveryWeight'] ?? ''}
              onChange={handleChangeDeliveryInformation}
              description={selectedDeliveryRoute?.acf?.note ?? ''}
              label={
                (selectedDeliveryRoute?.acf?.weight_unit &&
                  deliveryWeightInputMap[selectedDeliveryRoute.acf.weight_unit]
                    ?.label) ??
                deliveryWeightInputMap['kg']?.label
              }
              placeholder={
                (selectedDeliveryRoute?.acf?.weight_unit &&
                  deliveryWeightInputMap[selectedDeliveryRoute.acf.weight_unit]
                    ?.placeholder) ??
                deliveryWeightInputMap['kg']?.placeholder
              }
              type='number'
            />
          </div>
          <div className='col-span-1 xsm:col-span-full'>
            <SelectField
              name='deliveryCurrency'
              value={deliveryInformation['deliveryCurrency'] ?? ''}
              onChange={handleChangeDeliveryInformation}
              options={deliveryCurrencyOptions}
              label='Đơn vị tiền tệ thanh toán (*)'
              placeholder='Đơn vị tiền tệ'
              variant='secondary'
            />
          </div>
          <div className='col-span-full'>
            <p className='flex items-center space-x-[0.5rem] text-[0.875rem] font-semibold leading-[150%] tracking-[-0.02625rem] xsm:px-[0.75rem] xsm:py-[0.875rem] xsm:rounded-[1.25rem] xsm:bg-[#F1F9FF] xsm:text-[0.8125rem] xsm:tracking-[-0.02438rem] xsm:leading-[1rem]'>
              <span className='text-[rgba(0,0,0,0.92)]'>Kết quả dự tính:</span>
              {deliveryPrice && deliveryInformation['deliveryCurrency'] && (
                <span className='text-[#38B6FF]'>
                  {formatPriceByLocale(
                    deliveryPrice,
                    deliveryInformation['deliveryCurrency'],
                  )}
                  {
                    deliveryCurrencyMap[deliveryInformation['deliveryCurrency']]
                      ?.unit
                  }
                </span>
              )}
            </p>
          </div>
          <div className='col-span-full py-[0.75rem]'>
            <BtnBlue
              slug={`/${endpoints.calculateOrderDelivery}`}
              className='flex items-center justify-center w-full h-[3rem] rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.8)] bg-[#38B6FF] text-white text-[1rem] font-medium leading-[130%] tracking-[-0.03rem] xsm:text-[0.875rem] xsm:tracking-[-0.02625rem] xsm:h-[2.875rem]'
            >
              Chuyển sang trang tính giá vận chuyển
            </BtnBlue>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
export default TrackingOrder

// type MessageItemProps = {
//   isUser?: boolean
//   message?: string
// }
// const MessageItem = ({isUser = false, message}: MessageItemProps) => {
//   return (
//     <div className={cn('flex flex-col', isUser ? 'items-start' : 'items-end')}>
//       <span className='text-xs leading-normal tracking-[-0.0225rem] text-[#667085] mb-1'>
//         {isUser ? 'Câu hỏi khách hàng' : 'Chat AI Amamy'}
//       </span>
//       <p
//         className={cn(
//           'inline-block font-medium p-3 rounded-[1.25rem] text-sm leading-4 tracking-[-0.00875rem]',
//           isUser
//             ? 'text-white bg-Blue-Primary rounded-tl-[0.25rem]'
//             : 'bg-Blue-50 text-black/[0.92] rounded-tr-[0.25rem]',
//         )}
//       >
//         {message}
//       </p>
//     </div>
//   )
// }
