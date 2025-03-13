import {cn} from '@/lib/utils'

const SendMessage = ({className, ...props}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='34'
      height='34'
      viewBox='0 0 34 34'
      className={cn(
        'transition-all duration-300 ease-in-out fill-white',
        className,
      )}
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M30.6115 16.6548L13.3143 7.28567L12.9649 7.12869L12.5124 7.58124L14.2434 16.2871L22.2337 16.2871V17.7876L14.2271 17.7869L12.5647 26.1484L12.5301 26.4278L12.984 26.8817L30.3421 17.4348L30.5981 17.2495L30.6115 16.6548Z'
      />
    </svg>
  )
}
export default SendMessage
