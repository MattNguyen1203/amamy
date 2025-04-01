import {cn} from '@/lib/utils'
import Link from 'next/link'

export default function BtnBlue({
  className,
  slug,
  children,
}: {
  className?: string
  slug: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={slug}
      className={cn(
        'flex-center h-[3rem] p-[0.75rem_1rem_0.75rem_1.5rem] rounded-[1.25rem] bg-[#38B6FF]',
        className,
      )}
    >
      {children}
    </Link>
  )
}
