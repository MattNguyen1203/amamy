'use client'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {cn} from '@/lib/utils'
import CeateNote from '@/sections/tao-don/CreateNote'
import FormDeliveryInformation from '@/sections/tao-don/FormDeliveryInformation'
import FormDeliveryInformationAboutVN from '@/sections/tao-don/FormDeliveryInformationAboutVN'
import FormDeliveryInformationVNHan from '@/sections/tao-don/FormDeliveryInformationVNHan'
import FormDeliveryInformationVNJapan from '@/sections/tao-don/FormDeliveryInformationVNJapan'
import FormStepStart from '@/sections/tao-don/FormStepStart'
import ICCheck from '@/sections/tao-don/ICCheck'
import Instruct from '@/sections/tao-don/Instruct'
import OrderStepTime from '@/sections/tao-don/OrderStepTime'
import {ICreateOder} from '@/sections/tao-don/oder.interface'
import {useEffect, useState} from 'react'
const StepForm = [
  {title: 'Thông tin gửi hàng', value: '1'},
  {title: 'Thời gian gửi hàng', value: '2'},
  {title: 'Lưu ý quan trọng', value: '3'},
  {title: 'Thông tin nhận hàng', value: '4'},
  {title: 'Hướng dẫn gửi hàng lên Amamy Post', value: '5'},
]
export interface IDataFromOrder {
  [key: string]: any
}
export default function CreateOrder({data}: {data: ICreateOder[]}) {
  const [currentTab, setCurrentTab] = useState('1')
  const [dataFromOrder, setDataFromOrder] = useState<IDataFromOrder>({})
  const [dataInformation, setDataInformation] = useState<
    ICreateOder | undefined
  >()
  const handleClickcurrentTab = (nextTab: string) => {
    setCurrentTab(nextTab)
  }
  console.log(dataFromOrder)
  useEffect(() => {
    if (dataFromOrder?.shipping && data) {
      const foundItem = data?.find(
        (item) => item.id === Number(dataFromOrder?.shipping),
      )
      setDataInformation(foundItem)
    }
  }, [dataFromOrder?.shipping])
  console.log(dataInformation)
  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      className='flex space-x-[1.5rem] pb-[5rem] bg-white'
    >
      <TabsList className='sticky top-[7rem] flex w-[28.3125rem] h-max p-[1.25rem] rounded-[1.25rem] bg-[#F8F8F8]'>
        <div
          className={cn(
            'absolute top-[1.25rem] bottom-[1.25rem] left-[1.25rem] w-[0.25rem] rounded-[1rem] bg-[rgba(0,0,0,0.08)] before:absolute before:top-0 before:bg-[#38B6FF] before:w-full before:transition-all before:duration-500',
            currentTab === '1' && 'before:h-[5%]',
            currentTab === '2' && 'before:h-[28%]',
            currentTab === '3' && 'before:h-[50%]',
            currentTab === '4' && 'before:h-[73%]',
            currentTab === '5' && 'before:h-[100%]',
          )}
        ></div>
        <div className='space-y-[2.5rem] flex flex-col flex-1 ml-[0.84rem]'>
          {StepForm?.map(
            (item: {title: string; value: string}, index: number) => (
              <TabsTrigger
                value={item?.value}
                className={cn(
                  'flex w-full space-x-[0.62rem] p-0 data-[state=active]:shadow-none [&_.box-index]:data-[state=active]:bg-[#38B6FF] [&_.box-text]:data-[state=active]:text-black',
                  index + 1 > Number(currentTab) && 'pointer-events-none',
                )}
              >
                {index + 1 < Number(currentTab) ? (
                  <ICCheck className='size-[2.0125rem]' />
                ) : (
                  <div className='box-index p-[0.34375rem] size-[1.8125rem] rounded-[100%] flex-center bg-[#DCDFE4] text-white text-[1.11538rem] font-bold leading-[1.5] font-montserrat tracking-[-0.02231rem]'>
                    {index + 1}
                  </div>
                )}
                <p className='box-text flex-1 text-start text-pc-sub14s text-[rgba(0,0,0,0.30)]'>
                  {item?.title}
                </p>
              </TabsTrigger>
            ),
          )}
        </div>
      </TabsList>
      <div className='flex-1 p-[1.25rem] rounded-[1.25rem] bg-[#F8F8F8]'>
        <h1 className='text-black text-pc-heading20b mb-[1.5rem]'>
          Tạo đơn hàng
        </h1>
        <TabsContent
          value='1'
          className='mt-0'
        >
          <FormStepStart
            data={data}
            onSuccess={handleClickcurrentTab}
            setDataFromOrder={setDataFromOrder}
            dataFromOrder={dataFromOrder}
          />
        </TabsContent>
        {dataInformation && (
          <>
            <TabsContent
              value='2'
              className='mt-0'
            >
              <OrderStepTime
                handleClickcurrentTab={handleClickcurrentTab}
                dataInformation={dataInformation?.information?.time}
                dataFromOrder={dataFromOrder}
              />
            </TabsContent>
            <TabsContent
              value='3'
              className='mt-0'
            >
              <CeateNote
                handleClickcurrentTab={handleClickcurrentTab}
                data={dataInformation?.information?.note}
                type={dataInformation?.type}
              />
            </TabsContent>
            <TabsContent
              value='4'
              className='mt-0'
            >
              {dataInformation?.type === 'ducvn' && (
                <FormDeliveryInformationAboutVN
                  handleClickcurrentTab={handleClickcurrentTab}
                  setDataFromOrder={setDataFromOrder}
                  dataFromOrder={dataFromOrder}
                />
              )}
              {dataInformation?.type === 'viethan' && (
                <FormDeliveryInformationVNHan
                  handleClickcurrentTab={handleClickcurrentTab}
                  setDataFromOrder={setDataFromOrder}
                  dataFromOrder={dataFromOrder}
                />
              )}
              {dataInformation?.type === 'vietnhat' ||
                (dataInformation?.type === 'nhatviet' && (
                  <FormDeliveryInformationVNJapan
                    handleClickcurrentTab={handleClickcurrentTab}
                    setDataFromOrder={setDataFromOrder}
                    dataFromOrder={dataFromOrder}
                  />
                ))}
              {dataInformation?.type === 'vietduc' && (
                <FormDeliveryInformation
                  handleClickcurrentTab={handleClickcurrentTab}
                  setDataFromOrder={setDataFromOrder}
                  dataFromOrder={dataFromOrder}
                />
              )}
            </TabsContent>
            <TabsContent
              value='5'
              className='mt-0'
            >
              <Instruct
                data={dataInformation?.information?.instruct}
                handleClickcurrentTab={handleClickcurrentTab}
                dataFromOrder={dataFromOrder}
              />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  )
}
