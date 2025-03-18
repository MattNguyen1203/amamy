'use client'

import ImageV2 from '@/components/image/ImageV2'
import BillStatus from '@/sections/tracking-bill/BillStatus'
import InformationList from '@/sections/tracking-bill/InformationList'
import LocationTag from '@/sections/tracking-bill/LocationTag'
export type IProgress = {
  title: string
  desc: string
  day: string
}
export type OrderInformationProps = {
  searched: boolean
  data: {
    ma_don: string
    ten_nguoi_gui: string
    ten_nguoi_nhan: string
    dia_chi_nguoi_gui: string
    dia_chi_nguoi_nhan: string
    tien_trinh_giao_hang: IProgress[]
    trang_thai_don_hang: 'pending' | 'delivered' | 'shipping' | 'completed'
  } | null
}

const OrderInformation = ({searched, data}: OrderInformationProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(data?.ma_don || '')
  }
  if (!searched) {
    return null
  }

  if (!data) {
    return (
      <div className='size-full flex-center flex-col xsm:h-[40.625rem]'>
        <ImageV2
          src='/tracking-bill/no-bill.webp'
          width={400}
          height={400}
          alt=''
          className='w-[12.07081rem] h-[13.0205rem] xsm:w-[8.69119rem] xsm:h-[9.375rem] object-contain'
        />
        <p className='mt-4 w-[17rem] text-pc-14 leading-[1.4] text-black/60 opacity-60 text-center xsm:text-[0.8125rem] xsm:tracking-[-0.02438rem] xsm:font-medium'>
          Mã vận đơn không tồn tại hoặc nhập sai. Vui lòng thử lại bằng mã khác.
        </p>
      </div>
    )
  }

  return (
    <div className='size-full p-5 rounded-[1.25rem] bg-background-elevation20'>
      <h4 className='text-pc-heading20b xsm:text-mb-h2 text-black'>
        Thông tin đơn hàng
      </h4>
      <div className='h-[1px] w-full bg-[#DCDFE4] my-6 xsm:my-4' />
      <div className='flex space-x-3 xsm:flex-col xsm:space-x-0 xsm:space-y-4'>
        <div className='w-[25rem] xsm:w-full flex flex-col space-y-3'>
          <div className='text-pc-14 xsm:text-mb-12 text-black/80 flex items-center'>
            <p className='w-[8.75rem] xsm:w-[7.5rem] mr-2'>Mã đơn hàng:</p>
            <div className='flex items-center space-x-[0.375rem]'>
              <ImageV2
                onClick={handleCopy}
                src='/tracking-bill/icon-copy.svg'
                width={40}
                height={40}
                alt=''
                className='size-5 object-contain cursor-pointer'
              />
              <p className='font-semibold text-black'>{data?.ma_don}</p>
            </div>
          </div>
          <div className='text-pc-14 xsm:text-mb-12 text-black/80 flex items-center'>
            <p className='w-[8.75rem] xsm:w-[7.5rem] mr-2'>
              Trạng thái đơn hàng:
            </p>
            <BillStatus type={data?.trang_thai_don_hang || 'pending'} />
          </div>
          <div className='text-pc-14 xsm:text-mb-12 text-black/80 flex items-start'>
            <p className='w-[8.75rem] xsm:w-[7.5rem] mr-2'>Người gửi:</p>
            <div className='flex items-center space-x-2'>
              <p className='font-semibold text-black'>{data.ten_nguoi_gui}</p>
              <LocationTag location={data.dia_chi_nguoi_gui} />
            </div>
          </div>
          <div className='text-pc-14 xsm:text-mb-12 text-black/80 flex items-start'>
            <p className='w-[8.75rem] xsm:w-[7.5rem] mr-2'>Người nhận:</p>
            <div className='flex items-center space-x-2'>
              <p className='font-semibold text-black'>{data.ten_nguoi_nhan}</p>
              <LocationTag location={data.dia_chi_nguoi_nhan} />
            </div>
          </div>
          <div className='text-pc-14 xsm:text-mb-12 text-black/80 flex items-center'>
            <p className='w-[8.75rem] xsm:w-[7.5rem] mr-2'>Ngày tạo đơn:</p>
            <p className='font-semibold text-black'>03/03/2025</p>
          </div>
          <div className='text-pc-14 xsm:text-mb-12 text-black/80 flex items-center'>
            <p className='w-[8.75rem] xsm:w-[7.5rem] mr-2'>
              Ngày nhận dự kiến:
            </p>
            <p className='font-semibold text-black'>03/03/2025</p>
          </div>
        </div>
        <div className='h-[1px] w-full bg-[#DCDFE4] hidden xsm:block' />
        <InformationList data={data?.tien_trinh_giao_hang} />
      </div>
    </div>
  )
}
export default OrderInformation
