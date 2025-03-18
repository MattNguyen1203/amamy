import {cn} from '@/lib/utils'
import {cva, VariantProps} from 'class-variance-authority'

const variants = cva(
  'inline-flex justify-center items-center p-[0.25rem_0.5rem] rounded-full',
  {
    variants: {
      type: {
        pending: 'bg-[#A6502C]',
        shipping: 'bg-[#FCB07E]',
        delivered: 'bg-[#40C466]',
        completed: 'bg-[#40C466]',
      },
    },
  },
)

type BillStatusProps = VariantProps<typeof variants> & {
  className?: string
}

const BillStatus = ({type, className}: BillStatusProps) => {
  const status = {
    pending: 'Đang chờ lấy hàng',
    shipping: 'Đang vận chuyển',
    delivered: 'Đã gửi hàng',
  }

  return (
    <div className={cn(variants({type}), className)}>
      <p className='text-[0.6875rem] font-semibold tracking-[-0.01375rem] text-background-elevation5'>
        {status[type || 'pending']}
      </p>
    </div>
  )
}

export default BillStatus
