import SendMessage from '@/components/svg/SendMessage'
import {cn} from '@/lib/utils'
import Image from 'next/image'

type AIInputProps = {
  placeholder?: string
  onSend?: () => void
  value?: string
  onChange?: (value: string) => void
  className?: string
  disabled?: boolean
}

const AIInput = ({
  placeholder,
  onSend,
  value,
  onChange,
  className,
  disabled,
}: AIInputProps) => {
  return (
    <div className={cn('relative', className)}>
      <Image
        alt=''
        width={500}
        height={100}
        src='/bg-ai-input.webp'
        className='w-[calc(100%+1.6rem)] max-w-[calc(100%+1.6rem)] h-[calc(100%+0.5rem)] object-cover -top-1 -left-[0.8rem] absolute rounded-[1.875rem] blur-[9.8px] backdrop-blur-[9.8px] opacity-60'
      />
      <div className='w-[calc(100%+0.25rem)] h-[calc(100%+0.25rem)] -top-0.5 -left-0.5 absolute rounded-[1.3125rem] opacity-30 bg-[linear-gradient(90deg,#F26AFF_0%,#9E65FF_21.28%,#436EFF_100%)] shadow-[0px_0.5px_2.1px_0px_rgba(255,255,255,0.25)]' />
      <div className='relative z-10 flex items-center rounded-[1.25rem] bg-[linear-gradient(92deg,#F26AFF_81.16%,#9E65FF_84.89%,#436EFF_98.7%)]'>
        <div className='bg-white flex-1 border border-Blue-100 outline-none rounded-[1.25rem]'>
          <input
            disabled={disabled}
            type='text'
            placeholder={placeholder || 'Nhập yêu cầu của bạn...'}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className='disabled:bg-white p-4 border-none w-full outline-none rounded-[1.25rem] text-pc-sub14m text-black placeholder:text-black/30'
          />
        </div>
        <button
          className={cn(
            'flex-center pr-[0.875rem]',
            disabled && 'cursor-default',
          )}
          onClick={disabled ? undefined : onSend}
        >
          <SendMessage className='size-6' />
        </button>
      </div>
    </div>
  )
}
export default AIInput
