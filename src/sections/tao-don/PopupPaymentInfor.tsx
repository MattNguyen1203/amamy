/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {cn} from '@/lib/utils'
import ICX from '@/sections/tao-don/ICX'

export default function PopupPaymentInfor({
  form,
  setSelectPaymentInformation,
  selectPaymentInformation,
  setSelectPaymentInformationValue,
}: {
  form: any
  setSelectPaymentInformation: React.Dispatch<React.SetStateAction<boolean>>
  selectPaymentInformation: boolean
  setSelectPaymentInformationValue: React.Dispatch<
    React.SetStateAction<{value: string; title: string}>
  >
}) {
  return (
    <>
      <div
        onClick={() => setSelectPaymentInformation(false)}
        className={cn(
          'fixed transition-all duration-700 inset-0 bg-black/70 z-[51] hidden !mt-0',
          selectPaymentInformation && 'block',
        )}
      ></div>
      <div
        className={cn(
          'fixed transition-all duration-500 shadow-lg bottom-[-125%] z-[52] left-0 w-full rounded-t-[1.25rem] bg-white pb-[4rem] overflow-hidden',
          selectPaymentInformation && 'bottom-0',
        )}
      >
        <div className='border-b-[1px] border-solid border-b-[#DCDFE4] relative p-[0.5rem] flex-center '>
          <p className='text-center text-[0.75rem] font-montserrat font-semibold tracking-[-0.015rem] text-black'>
            Thông tin thanh toán
          </p>
          <div
            onClick={() => setSelectPaymentInformation(false)}
            className='absolute top-[0.5rem] right-[0.5rem]'
          >
            <ICX className='size-[1.5rem]' />
          </div>
        </div>
        <div className=''>
          <div
            onClick={() => {
              setSelectPaymentInformationValue({
                title: 'Thanh toán bằng VNĐ (theo tỷ giá bán ra Vietcombank)',
                value: 'VND',
              })
              form.setValue('recipientPaymentInformation', 'VND')
              setSelectPaymentInformation(false)
            }}
            className='p-[0.75rem_1rem] border-[1px] border-solid border-[#F8F8F8] bg-white'
          >
            <p className='text-mb-13M text-black'>
              Thanh toán bằng VNĐ (theo tỷ giá bán ra Vietcombank)
            </p>
          </div>
          <div
            onClick={() => {
              setSelectPaymentInformationValue({
                title: 'Thanh toán bằng Euro',
                value: 'Euro',
              })
              form.setValue('recipientPaymentInformation', 'Euro')
              setSelectPaymentInformation(false)
            }}
            className='p-[0.75rem_1rem] border-[1px] border-solid border-[#F8F8F8] bg-white'
          >
            <p className='text-mb-13M text-black'>Thanh toán bằng Euro</p>
          </div>
        </div>
      </div>
    </>
  )
}
