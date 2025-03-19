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
  label: string
}

const BillStatus = ({type, label, className}: BillStatusProps) => {
  return (
    <div className={cn(variants({type}), className)}>
      <p className='text-[0.6875rem] font-semibold tracking-[-0.01375rem] text-background-elevation5'>
        {label}
      </p>
    </div>
  )
}

export default BillStatus
