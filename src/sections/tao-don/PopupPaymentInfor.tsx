/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {cn} from '@/lib/utils'
import ICX from '@/sections/tao-don/ICX'

export default function PopupPaymentInfor({
  form,
  setSelectPaymentInformation,
  selectPaymentInformation,
  setSelectPaymentInformationValue,
  paymentMethod,
}: {
  form: any
  setSelectPaymentInformation: React.Dispatch<React.SetStateAction<boolean>>
  selectPaymentInformation: boolean
  setSelectPaymentInformationValue: React.Dispatch<
    React.SetStateAction<{value: string; title: string}>
  >
  paymentMethod?: {
    value: string
    title: string
  }[]
}) {
  return (
    <>
      <div
        onClick={() => {
          setSelectPaymentInformation(false)
        }}
        className={cn(
          'fixed transition-all duration-700 ease-in-out inset-0 bg-black/0 z-[51] pointer-events-none invisible !mt-0',
          selectPaymentInformation && 'bg-black/50 visible pointer-events-auto',
        )}
      ></div>
      <div
        className={cn(
          'bg-[#F6F6F6] fixed transition-all duration-700 ease-in-out shadow-lg bottom-0 translate-y-full z-[52] left-0 w-full rounded-t-[1.25rem] overflow-hidden',
          selectPaymentInformation && 'translate-y-0',
        )}
      >
        <div className='bg-white border-b-[1px] border-solid border-b-[#DCDFE4] relative p-[0.5rem] flex-center '>
          <p className='text-center text-[0.75rem] font-montserrat font-semibold tracking-[-0.015rem] text-black'>
            Thông tin thanh toán
          </p>
          <div
            onClick={() => {
              setSelectPaymentInformation(false)
            }}
            className='absolute top-[0.5rem] right-[0.5rem]'
          >
            <ICX className='size-[1.5rem]' />
          </div>
        </div>
        <div className='bg-[#F6F6F6] space-y-[1rem] p-[1rem] overflow-hidden overflow-y-auto max-h-[70vh] hidden_scroll'>
          {Array.isArray(paymentMethod) &&
            paymentMethod?.map(
              (
                item: {
                  value: string
                  title: string
                },
                index: number,
              ) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectPaymentInformationValue({
                      title: item?.title,
                      value: item?.value ?? item?.title,
                    })
                    form.setValue('recipientPaymentInformation', item?.value, {
                      shouldValidate: true, // Kích hoạt validate ngay sau khi set value
                    })
                    setSelectPaymentInformation(false)
                  }}
                  className='p-[0.75rem_1rem] rounded-[1.25rem] bg-white'
                >
                  <p className='text-mb-13M text-black'>{item?.title}</p>
                </div>
              ),
            )}
        </div>
      </div>
    </>
  )
}
