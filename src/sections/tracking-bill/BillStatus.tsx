import {cn} from '@/lib/utils'

type BillStatusProps = {
  className?: string
  label: string
  type: string
}

const BillStatus = ({type, label, className}: BillStatusProps) => {
  return (
    <div
      style={{backgroundColor: type}}
      className={cn(
        'inline-flex justify-center items-center p-[0.25rem_0.5rem] rounded-full',
        className,
      )}
    >
      <p className='text-[0.6875rem] font-semibold tracking-[-0.01375rem] text-background-elevation5'>
        {label}
      </p>
    </div>
  )
}

export default BillStatus
