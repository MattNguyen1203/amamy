import {z} from 'zod'

// Define shipping method options
export const SHIPPING_METHOD_OPTIONS = {
  USE_LABEL: 'Dùng Label và mang qua bưu điện UPS để quét mã',
  UPS_PICKUP: 'UPS lấy hàng tận nhà toàn bang nước Mỹ',
} as const

export const createLabelShippingSchema = z
  .object({
    // Thông tin người gửi
    fullName: z
      .string({
        required_error: 'Vui lòng nhập họ và tên',
      })
      .min(1, 'Vui lòng nhập họ và tên'),
    phone: z
      .string({
        required_error: 'Vui lòng nhập số điện thoại',
      })
      .min(1, 'Vui lòng nhập số điện thoại'),
    email: z
      .string({
        required_error: 'Vui lòng nhập email',
      })
      .email('Địa chỉ email không đúng')
      .min(1, 'Vui lòng nhập email'),
    customerCode: z
      .string({
        required_error: 'Vui lòng nhập mã khách hàng',
      })
      .min(1, 'Vui lòng nhập mã khách hàng'),
    // Địa chỉ lấy hàng
    city: z
      .string({
        required_error: 'Vui lòng nhập thành phố',
      })
      .min(1, 'Vui lòng nhập thành phố'),
    cityCode: z
      .string({
        required_error: 'Vui lòng nhập mã thành phố',
      })
      .min(1, 'Vui lòng nhập mã thành phố')
      .max(50, 'Mã thành phố không được vượt quá 50 ký tự')
      .regex(/^[a-zA-Z0-9\s]+$/, 'Mã thành phố chỉ được chứa chữ và số'),
    streetName: z
      .string({
        required_error: 'Vui lòng nhập tên đường',
      })
      .min(1, 'Vui lòng nhập tên đường'),
    houseNumber: z
      .string({
        required_error: 'Vui lòng nhập số nhà',
      })
      .min(1, 'Vui lòng nhập số nhà'),
    detailedAddress: z
      .string({
        required_error: 'Vui lòng nhập địa chỉ nhận hàng chi tiết',
      })
      .min(1, 'Vui lòng nhập địa chỉ nhận hàng chi tiết'),
    // Phương thức giao hàng
    shippingMethod: z.enum(
      [SHIPPING_METHOD_OPTIONS.USE_LABEL, SHIPPING_METHOD_OPTIONS.UPS_PICKUP],
      {
        required_error: 'Vui lòng chọn phương thức giao hàng',
      },
    ),
    // Ngày lấy hàng (chỉ bắt buộc khi chọn UPS_PICKUP)
    pickupDate: z.coerce.date().optional(),
    // Khối lượng kiện hàng (mảng)
    packageWeights: z
      .array(
        z
          .number({
            required_error: 'Vui lòng nhập khối lượng kiện hàng',
          })
          .positive('Khối lượng kiện hàng phải lớn hơn 0')
          .min(1, 'Khối lượng kiện hàng phải lớn hơn 0')
          .max(
            49,
            'Khối lượng kiện hàng không được vượt quá 49. Vui lòng thêm kiện hàng để chia khối lượng ra',
          ),
      )
      .min(1, 'Phải có ít nhất 1 kiện hàng')
      .refine(
        (weights) => weights.every((weight) => weight > 0 && weight <= 49),
        {
          message:
            'Mỗi kiện hàng phải có khối lượng lớn hơn 0 và nhỏ hơn hoặc bằng 49',
        },
      ),
  })
  .refine(
    (data) => {
      // Nếu chọn UPS_PICKUP thì pickupDate phải có giá trị
      if (data.shippingMethod === SHIPPING_METHOD_OPTIONS.UPS_PICKUP) {
        return data.pickupDate !== undefined && data.pickupDate !== null
      }
      return true
    },
    {
      message: 'Vui lòng chọn ngày lấy hàng',
      path: ['pickupDate'], // Đặt lỗi vào field pickupDate
    },
  )

export type CreateLabelFormValues = z.infer<typeof createLabelShippingSchema>
