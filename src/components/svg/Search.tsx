import {cn} from '@/lib/utils'

const Search = ({className, ...props}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='19'
      height='19'
      viewBox='0 0 19 19'
      className={cn(
        'transition-all duration-300 ease-in-out stroke-white fill-transparent',
        className,
      )}
      {...props}
    >
      <path
        d='M9.05578 16.2694C13.0386 16.2694 16.2673 13.0407 16.2673 9.05784C16.2673 5.07502 13.0386 1.8463 9.05578 1.8463C5.07295 1.8463 1.84424 5.07502 1.84424 9.05784C1.84424 13.0407 5.07295 16.2694 9.05578 16.2694Z'
        strokeWidth='1.92308'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.3442 14.3463L17.2289 17.2309'
        strokeWidth='1.92308'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
export default Search
