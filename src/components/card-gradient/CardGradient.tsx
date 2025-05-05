type CardGradientProps = {
  children?: React.ReactNode
}

const CardGradient = ({children}: CardGradientProps) => {
  return (
    <div className='w-full p-[4px_2px] relative'>
      <div className='rounded-[1.875rem] absolute top-0 left-0 size-full bg-[linear-gradient(90deg,#F26AFF_0%,#9E65FF_21.28%,#436EFF_100%)] blur-[5.8px] mix-blend-hard-light' />
      <div className='p-[1px] relative'>
        <div className='rounded-[1.3125rem] absolute top-0 left-0 size-full opacity-30 bg-[linear-gradient(90deg,#F26AFF_0%,#9E65FF_21.28%,#436EFF_100%)]' />
        <div className='relative z-10 rounded-[1.25rem]'>{children}</div>
      </div>
    </div>
  )
}
export default CardGradient
