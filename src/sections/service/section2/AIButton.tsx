import CardGradient from '@/components/card-gradient/CardGradient'
import Link from 'next/link'

type AIButtonProps = {
  title?: string
  href?: string
}

const AIButton = ({
  title = 'CHAT VỚI AI VỀ DỊCH VỤ GỬI HÀNG',
  href = '',
}: AIButtonProps) => {
  return (
    <CardGradient>
      <Link
        href={href}
        target='_blank'
        className='relative w-full z-10 rounded-[1.25rem] p-3 flex-center bg-white border border-Blue-100'
      >
        <span className='text-center text-sm leading-normal font-bold tracking-[-0.02625rem] text-Blue-Primary'>
          {title}
        </span>
      </Link>
    </CardGradient>
  )
}
export default AIButton
