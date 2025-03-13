import {cn} from '@/lib/utils'

const Plus = ({className, ...props}: React.SVGProps<SVGSVGElement>) => {
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
        d='M12 4L11.9988 12M11.9988 20V12M11.9988 12H20H4'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
export default Plus
