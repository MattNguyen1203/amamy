import {cn} from '@/lib/utils'

const Close = ({className, ...props}: React.SVGProps<SVGSVGElement>) => {
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
        d='M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
export default Close
