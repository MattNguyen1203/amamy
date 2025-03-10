'use client'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import FormStepStart from '@/sections/tao-don/FormStepStart'
export default function CreateOrder() {
  return (
    <Tabs
      defaultValue='time'
      className='flex space-x-[1.5rem]'
    >
      <TabsList className='relative flex w-[28.3125rem] h-max p-[1.25rem] rounded-[1.25rem] bg-[#F8F8F8]'>
        <div className='absolute top-[1.25rem] bottom-[1.25rem] left-[1.25rem] w-[0.25rem] rounded-[1rem] bg-[rgba(0,0,0,0.08)] before:absolute before:top-0 before:bg-[#38B6FF] before:w-full'></div>
        <div className='space-y-[2.5rem] flex flex-col flex-1 ml-[0.84rem]'>
          <TabsTrigger
            value='time'
            className='flex w-full space-x-[0.62rem] p-0 data-[state=active]:shadow-none [&_.box-index]:data-[state=active]:bg-[#38B6FF] [&_.box-text]:data-[state=active]:text-black'
          >
            <div className='box-index size-[1.8125rem] rounded-[100%] p-[0.34375rem] flex-center bg-[#DCDFE4] text-white text-[1.11538rem] font-bold leading-[1.5] font-montserrat tracking-[-0.02231rem]'>
              1
            </div>
            <p className='box-text flex-1 text-start text-pc-sub14s text-[rgba(0,0,0,0.30)]'>
              Thời gian gửi hàng
            </p>
          </TabsTrigger>
        </div>
      </TabsList>
      <TabsContent
        value='time'
        className='flex-1 mt-0 p-[1.25rem] rounded-[1.25rem] bg-[#F8F8F8]'
      >
        <h1 className='text-black text-pc-heading20b mb-[1.5rem]'>
          Tạo đơn hàng
        </h1>
        <FormStepStart />
      </TabsContent>
    </Tabs>
  )
}
