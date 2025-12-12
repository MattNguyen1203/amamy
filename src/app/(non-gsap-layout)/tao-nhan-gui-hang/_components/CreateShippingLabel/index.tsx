'use client'

import {Label} from '@/components/ui/label'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'
import {Tabs, TabsContent} from '@/components/ui/tabs'
import {cn} from '@/lib/utils'
import {useState} from 'react'
import {TaoNhanGuiHangAcfPageType} from '@/types/tao-nhan-gui-hang.interface'
import CreateLabelForm from '@/app/(non-gsap-layout)/tao-nhan-gui-hang/_components/CreateShippingLabel/CreateLabelForm'
import SelfDeliveryForm from '@/app/(non-gsap-layout)/tao-nhan-gui-hang/_components/CreateShippingLabel/SelfDeliveryForm'

type ShippingMethodType = 'tu_gui_ra_kho' | 'tao_label_hoac_lay_tai_nha'

interface ShippingMethodOption {
  value: ShippingMethodType
  label: string
}

const shippingMethods: ShippingMethodOption[] = [
  {value: 'tu_gui_ra_kho', label: 'Tự gửi ra kho'},
  {
    value: 'tao_label_hoac_lay_tai_nha',
    label: 'Tạo Label hoặc lấy hàng tại nhà',
  },
]

export default function CreateShippingLabel({data}: TaoNhanGuiHangAcfPageType) {
  const [activeMethod, setActiveMethod] =
    useState<ShippingMethodType>('tu_gui_ra_kho')

  return (
    <section className='relative mx-auto max-w-[88rem] space-y-[1.5rem] py-[1.5rem] xsm:space-y-[0.75rem] xsm:px-[1rem] xsm:py-[1rem]'>
      <h2 className='text-[1.25rem] font-bold leading-[1.2] tracking-[-0.05rem] text-[rgba(0,0,0,0.92)] xsm:text-[1rem] xsm:tracking-[-0.04rem]'>
        Tạo nhãn gửi hàng
      </h2>
      <Tabs
        value={activeMethod}
        className='gap-0 space-y-[1.125rem] xsm:space-y-[1rem]'
      >
        <div className='space-y-[1.125rem] xsm:space-y-[0.75rem]'>
          <p className='text-[1rem] font-semibold leading-[1.3] tracking-[-0.03rem] text-[#33A6E8] xsm:text-[0.875rem] xsm:tracking-[-0.02625rem]'>
            Chọn phương thức
          </p>
          <RadioGroup
            value={activeMethod}
            onValueChange={(value) =>
              setActiveMethod(value as ShippingMethodType)
            }
            className='flex items-center justify-between gap-0 gap-x-[1.125rem] xsm:block xsm:space-x-0 xsm:space-y-[0.625rem]'
          >
            {shippingMethods.map((method) => {
              const isActive = activeMethod === method.value
              return (
                <Label
                  key={method.value}
                  className={cn(
                    'flex h-[3.125rem] flex-1 cursor-pointer items-center gap-0 space-x-[0.75rem] rounded-[1.25rem] bg-[rgba(239,239,239,0.60)] px-[0.875rem] transition-all duration-150 xsm:h-[2.875rem] xsm:w-full xsm:space-x-[0.5rem] xsm:rounded-[2rem]',
                    isActive &&
                      'border-[#38B6FF] bg-[#F1F9FF] ring-1 ring-[#38B6FF]',
                  )}
                >
                  <div
                    className={cn(
                      'relative flex size-[1.375rem] shrink-0 items-center justify-center rounded-full border-[0.0875rem] border-solid border-[#A3DDFF] transition-all duration-150 xsm:size-[1.125rem]',
                      isActive && 'border-[#38B6FF]',
                    )}
                  >
                    <div
                      className={cn(
                        'size-[1rem] rounded-full bg-transparent transition-all duration-150 xsm:size-[0.75rem]',
                        isActive && 'bg-[#38B6FF]',
                      )}
                    />
                  </div>
                  <span className='text-[0.875rem] font-semibold tracking-[-0.0175rem] text-black xsm:text-[0.8125rem] xsm:tracking-[-0.01625rem]'>
                    {method.label}
                  </span>
                  <RadioGroupItem
                    hidden
                    value={method.value}
                  />
                </Label>
              )
            })}
          </RadioGroup>
        </div>
        <div className='relative w-full'>
          <TabsContent value='tu_gui_ra_kho'>
            <SelfDeliveryForm data={data?.tu_gui_ra_kho} />
          </TabsContent>
          <TabsContent value='tao_label_hoac_lay_tai_nha'>
            <CreateLabelForm />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  )
}
