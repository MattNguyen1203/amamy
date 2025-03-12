import {cn} from '@/lib/utils'

const ArrowRight = ({className, ...props}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className={cn(
        'transition-all duration-300 ease-in-out stroke-white',
        className,
      )}
      {...props}
    >
      <path
        d='M17 12H7M7 12L11 16M7 12L11 8'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
export default ArrowRight
