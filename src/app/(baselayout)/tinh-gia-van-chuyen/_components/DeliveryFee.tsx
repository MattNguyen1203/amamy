'use client'
import InputField from '@/app/(baselayout)/tinh-gia-van-chuyen/_components/InputField'
import RadioField from '@/app/(baselayout)/tinh-gia-van-chuyen/_components/RadioField'
import SelectField from '@/app/(baselayout)/tinh-gia-van-chuyen/_components/SelectField'
import BtnBlue from '@/components/button/BtnBlue'
import useDeliveryPrice from '@/hooks/useDeliveryPrice'
import {cn} from '@/lib/utils'
import {
  CurrencyToUsdResType,
  DeliveryCurrencyType,
  DeliveryDirectionResType,
  DeliveryDirectionType,
  DeliveryFacilityType,
  DeliveryFreightType,
  DeliveryWeightType,
} from '@/utils/type'
import React, {useEffect, useMemo, useState} from 'react'

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

interface DeliveryFeeProps {
  currencyToUsd: CurrencyToUsdResType
  deliveryDirection: DeliveryDirectionResType
}

export default function DeliveryFee({
  currencyToUsd,
  deliveryDirection,
}: DeliveryFeeProps) {
  const [isDeliverForeign, setIsDeliveryForeign] = useState<boolean>(false)
  const [deliveryInformation, setDeliveryInformation] =
    useState<DeliveryInformationType>({})

  const formatPriceByLocale = (
    price: number,
    currencyCode: string,
    maximumFractionDigits: number = 0,
  ) => {
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
      maximumFractionDigits: maximumFractionDigits,
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
              2,
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
    <section className='relative pb-[6rem] xsm:p-[1rem] xsm:bg-[#F8F8F8] font-montserrat'>
      <div className='xsm:w-full xsm:p-[1rem] xsm:bg-white xsm:border xsm:border-solid xsm:border-[#DCDFE4] w-[88rem] rounded-[1.25rem] bg-[#F8F8F8] mx-auto p-[1.25rem] flex flex-col space-y-[1.5rem]'>
        <h2 className='xsm:block hidden text-[1rem] text-center text-black font-semibold leading-[150%] tracking-[-0.03rem]'>
          Dự tính giá vận chuyển
        </h2>
        <div className='grid gap-[1.75rem] grid-cols-2 xsm:gap-[1rem]'>
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
          <div className='col-span-full xsm:pt-[0.25rem]'>
            <p className='flex items-center space-x-[0.5rem] text-[0.875rem] font-semibold leading-[150%] tracking-[-0.02625rem] xsm:px-[0.75rem] xsm:py-[1rem] xsm:rounded-[1.25rem] xsm:bg-[#F1F9FF] xsm:text-[0.8125rem] xsm:leading-[1rem] xsm:tracking-[0.02438rem]'>
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
        </div>
        <div>
          <BtnBlue
            slug='/'
            className='text-white w-fit border border-solid border-white/80 leading-[130%] font-montserrat font-medium text-[1rem] tracking-[-0.03rem] xsm:w-full xsm:h-[2.875rem] xsm:text-[0.875rem] xsm:tracking-[-0.02625rem]'
          >
            Nhắn tin tư vấn miễn phí
          </BtnBlue>
        </div>
      </div>
    </section>
  )
}
