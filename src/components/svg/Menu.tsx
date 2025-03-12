import {cn} from '@/lib/utils'

const Menu = ({className, ...props}: React.SVGProps<SVGSVGElement>) => {
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
        d='M5 17H19M5 12H19M5 7H19'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
export default Menu
