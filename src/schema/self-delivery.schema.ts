import {z} from 'zod'

export const selfDeliverySchema = z.object({
  deliveryMethod: z.string().min(1, 'Vui lòng chọn chi nhánh Amamy Post'),
})
export type SelfDeliveryFormValues = z.infer<typeof selfDeliverySchema>
