import CardGradient from '@/components/card-gradient/CardGradient'

const AIButton = () => {
  return (
    <CardGradient>
      <button className='relative w-full z-10 rounded-[1.25rem] p-3 flex-center bg-white border border-Blue-100'>
        <span className='text-center text-sm leading-normal font-bold tracking-[-0.02625rem] text-Blue-Primary'>
          CHAT VỚI AI VỀ DICH VỤ GỬI HÀNG
        </span>
      </button>
    </CardGradient>
  )
}
export default AIButton
