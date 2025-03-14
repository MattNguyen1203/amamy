import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'

export type MessageItemProps = {
  role: 'user' | 'bot'
  message: string
  time: string
}

const MessageItem = ({role, message, time}: MessageItemProps) => {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1 items-start',
        role === 'user' && 'items-end',
      )}
    >
      <div
        className={cn('flex items-center', role === 'user' && 'justify-end')}
      >
        {role === 'bot' && (
          <ImageV2
            alt=''
            width={40}
            height={40}
            src='/homepage/icon/live-chat.webp'
            className='size-7 object-contain mr-2'
          />
        )}
        <p className='text-[0.75rem] leading-[1.5] tracking-[-0.0225rem] text-[#667085]'>
          {role === 'user' ? 'Visitor' : 'Livechat'} {time}
        </p>
      </div>
      <div
        dangerouslySetInnerHTML={{__html: message}}
        className={cn(
          'text-[0.875rem] font-medium leading-[1.14] tracking-[-0.00875rem] text-black rounded-[1.25rem] p-3 max-w-[16.875rem]',
          role === 'user' && 'text-right bg-Blue-50 rounded-tr-[0.25rem]',
          role === 'bot' && 'rounded-tl-[0.25rem] border border-black/10',
        )}
      ></div>
    </div>
  )
}
export default MessageItem
