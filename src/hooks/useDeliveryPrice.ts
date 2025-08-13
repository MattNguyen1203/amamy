import {useMemo} from 'react'
import {
  CurrencyToUsdResType,
  DeliveryCostCalculationType,
  DeliveryDirectionResType,
  DeliveryPriceFixedItemType,
  DeliveryPriceRangeItemType,
  DeliveryWeightType,
} from '@/utils/type'

type DeliveryInfo = {
  deliveryDirection?: string
  deliveryCurrency?: string
  deliveryWeight?: number | string
  deliveryFacility?: string
  deliveryType?: string
  deliveryFreightType?: string
}

type UseDeliveryPriceProps = {
  currencyToUsd: CurrencyToUsdResType
  deliveryDirection: DeliveryDirectionResType
  deliveryInformation: DeliveryInfo
  isDeliverForeign: boolean
}

function getUnitPrice(
  weight: number,
  priceList: DeliveryPriceRangeItemType[] | DeliveryPriceFixedItemType[],
  priceListType: DeliveryCostCalculationType,
) {
  if (priceListType === 'price_range') {
    return (
      priceList?.find(
        (item): item is DeliveryPriceRangeItemType =>
          +(item as DeliveryPriceRangeItemType).min_weight <= weight &&
          +(item as DeliveryPriceRangeItemType).max_weight >= weight,
      )?.price ||
      priceList?.[priceList.length - 1]?.price ||
      null
    )
  }

  if (priceListType === 'price_fixed') {
    if (!priceList) return null
    // Lấy danh sách trọng lượng từ priceList
    const weights = priceList?.map(
      (item) => +(item as DeliveryPriceFixedItemType).weight,
    )
    // Tìm mốc giá lớn hơn hoặc bằng weight, gần nhất
    const matchedWeight = weights.find((w) => w >= weight)

    // Nếu không có mốc lớn hơn → lấy mốc cao nhất
    const finalWeight = matchedWeight ?? Math.max(...weights)
    return (
      priceList.find(
        (item): item is DeliveryPriceFixedItemType =>
          +(item as DeliveryPriceFixedItemType).weight === finalWeight,
      )?.price || null
    )
  }

  return null
}

function getExtraDeliveryDomesticPrice(
  weightNumber: number = 1,
  weightType: DeliveryWeightType,
  unitPrice: number,
) {
  switch (weightType) {
    case 'package':
      return unitPrice
    case 'kg':
    case 'lbs':
      return unitPrice * weightNumber
    default:
      return 0
  }
}

function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  currencyToUsd: CurrencyToUsdResType,
) {
  if (fromCurrency === toCurrency) return amount
  const rateCurrencyData = currencyToUsd.data.currency_to_usd
  const priceUsd = amount / rateCurrencyData[fromCurrency]?.price
  const priceNextCurrency = priceUsd * rateCurrencyData[toCurrency]?.price
  return priceNextCurrency
}

export default function useDeliveryPrice({
  currencyToUsd,
  deliveryDirection,
  deliveryInformation,
  isDeliverForeign,
}: UseDeliveryPriceProps) {
  return useMemo(() => {
    const {
      deliveryDirection: routeSlug,
      deliveryCurrency,
      deliveryWeight,
      deliveryFacility,
      deliveryType,
      deliveryFreightType,
    } = deliveryInformation
    const weight = Number(deliveryWeight ?? 0)
    if (!routeSlug || !deliveryCurrency || !weight) return null

    const selectedRoute = deliveryDirection?.data?.find(
      ({slug}) => slug === routeSlug,
    )

    if (!selectedRoute) return null
    const priceListType = selectedRoute?.acf?.delivery_cost_calculation_type
    let totalPrice: number | null = null
    let baseCurrency: string | null = null

    if (!priceListType) return
    if (isDeliverForeign) {
      // Giá quốc tế: Việt Nam -> Nước ngoài
      let deliveryPriceList
      if (selectedRoute?.acf?.dependency_price === 'facility') {
        deliveryPriceList = selectedRoute?.acf?.delivery_price_list?.find(
          ({delivery_facility}) => delivery_facility === deliveryFacility,
        )
      }
      if (selectedRoute?.acf?.dependency_price === 'freight_type') {
        deliveryPriceList = selectedRoute?.acf?.delivery_price_list?.find(
          ({product_type}) => product_type === deliveryFreightType,
        )
      }
      if (!deliveryPriceList) return null

      baseCurrency = deliveryPriceList.currency
      const priceList =
        priceListType === 'price_range'
          ? deliveryPriceList.delivery_price
          : deliveryPriceList.delivery_price_fixed

      let unitPrice = getUnitPrice(weight, priceList, priceListType)

      if (
        priceListType === 'price_fixed' &&
        weight >= +deliveryPriceList?.price_by_weight?.weight
      ) {
        unitPrice = deliveryPriceList?.price_by_weight?.price
      }

      if (!unitPrice) return null

      totalPrice =
        priceListType === 'price_fixed' &&
        weight < +deliveryPriceList?.price_by_weight?.weight
          ? +unitPrice
          : weight * +unitPrice

      const domesticDelivery = selectedRoute?.acf?.domestic_delivery
      if (domesticDelivery) {
        const maxWeight = +domesticDelivery?.free_delivery?.condition_value
        let domesticPrice = 0
        if (maxWeight) {
          domesticPrice =
            weight <= maxWeight
              ? getExtraDeliveryDomesticPrice(
                  weight,
                  domesticDelivery?.paid_delivery?.unit_type,
                  +domesticDelivery?.paid_delivery?.price,
                )
              : 0
        } else {
          domesticPrice =
            getExtraDeliveryDomesticPrice(
              weight,
              domesticDelivery?.paid_delivery?.unit_type,
              +domesticDelivery?.paid_delivery?.price,
            ) || 0
        }

        totalPrice += domesticPrice
      }
    } else {
      // Giá nội địa: Nước ngoài -> Việt Nam
      const domesticList = selectedRoute?.acf?.delivery_price_list?.[0]
      if (!domesticList) return null

      baseCurrency = domesticList.currency
      let deliveryWeight = weight
      if (
        selectedRoute?.slug === 'tu-my-sang-viet-nam' &&
        +weight <= +domesticList.delivery_price[0].min_weight
      ) {
        deliveryWeight = +domesticList.delivery_price[0].min_weight
      }
      const unitPrice = getUnitPrice(
        deliveryWeight,
        domesticList.delivery_price,
        priceListType,
      )
      if (!unitPrice) return null

      totalPrice = deliveryWeight * +unitPrice

      // Cộng thêm phí ship nội địa nếu có
      if (
        deliveryType !== 'free' &&
        selectedRoute?.acf?.domestic_delivery?.paid_delivery
      ) {
        const domestic = selectedRoute.acf.domestic_delivery.paid_delivery
        const extraDomesticPrice = getExtraDeliveryDomesticPrice(
          deliveryWeight,
          domestic.unit_type,
          +domestic.price,
        )

        if (extraDomesticPrice) totalPrice += extraDomesticPrice
      }
    }

    // Quy đổi tiền tệ
    if (baseCurrency && deliveryCurrency) {
      totalPrice = convertCurrency(
        totalPrice,
        baseCurrency,
        deliveryCurrency,
        currencyToUsd,
      )
    }

    return totalPrice !== null ? Number(totalPrice.toFixed(2)) : null
  }, [currencyToUsd, deliveryInformation, isDeliverForeign, deliveryDirection])
}
