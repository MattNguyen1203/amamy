/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import useStore from '@/app/(store)/store'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import CeateNote from '@/sections/tao-don/CreateNote'
import CustomBack from '@/sections/tao-don/CustomBack'
import FormDeliveryInformation from '@/sections/tao-don/FormDeliveryInformation'
import FormDeliveryInformationAboutVN from '@/sections/tao-don/FormDeliveryInformationAboutVN'
import FormDeliveryInformationVNHan from '@/sections/tao-don/FormDeliveryInformationVNHan'
import FormDeliveryInformationVNJapan from '@/sections/tao-don/FormDeliveryInformationVNJapan'
import FormStepStart from '@/sections/tao-don/FormStepStart'
import ICCheck from '@/sections/tao-don/ICCheck'
import ICFAQ from '@/sections/tao-don/ICFAQ'
import ICSuccess from '@/sections/tao-don/ICSuccess'
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
  const isMobile = useIsMobile()
  const {setStepOrder} = useStore((state) => state)
  const [currentTab, setCurrentTab] = useState('1')
  const [submitting, setSubmitting] = useState(false)
  const [faq, setFaq] = useState(false)
  const [sentGoodsAtAmamy, setSentGoodsAtAmamy] = useState(false)
  const [dataFromOrder, setDataFromOrder] = useState<IDataFromOrder>({})
  const [dataInformation, setDataInformation] = useState<
    ICreateOder | undefined
  >()
  const handleClickcurrentTab = (nextTab: string) => {
    setCurrentTab(nextTab)
  }
  useEffect(() => {
    if (dataFromOrder?.shipping && data) {
      const foundItem = data?.find(
        (item) => item.id === Number(dataFromOrder?.shipping),
      )
      setDataInformation(foundItem)
    }
    setStepOrder(2)
  }, [dataFromOrder?.shipping])
  return (
    <>
      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        className='flex xsm:flex-col sm:space-x-[1.5rem] pb-[5rem] bg-white xsm:bg-[#FAFAFA]'
      >
        <TabsList className='xsm:space-y-[0.5rem] sticky z-[50] top-[7rem] xsm:top-[0rem] flex xsm:flex-col w-[28.3125rem] xsm:w-full h-max p-[1.25rem] xsm:p-[1rem] rounded-[1.25rem] bg-[#F8F8F8]'>
          {isMobile && (
            <div className='flex justify-between items-center w-full !mb-[1rem]'>
              <h1 className='flex-1 text-mb-h2 text-black'>Tạo đơn hàng</h1>
              <CustomBack />
            </div>
          )}
          <div className='xsm:w-full xsm:justify-between sm:space-y-[2.5rem] flex sm:flex-col flex-1 sm:ml-[0.84rem]'>
            {StepForm?.map(
              (item: {title: string; value: string}, index: number) => (
                <TabsTrigger
                  key={index}
                  value={item?.value}
                  className={cn(
                    'flex xsm:justify-start xsm:w-max w-full space-x-[0.62rem] p-0 data-[state=active]:shadow-none [&_.box-index]:data-[state=active]:bg-[#38B6FF] [&_.box-text]:data-[state=active]:text-black',
                    index + 1 > Number(currentTab) && 'pointer-events-none',
                  )}
                >
                  {index + 1 < Number(currentTab) ? (
                    <ICCheck className='size-[2.0125rem] xsm:size-[1.45rem]' />
                  ) : (
                    <div className='box-index p-[0.34375rem] size-[1.8125rem] xsm:size-[1.45rem] rounded-[100%] flex-center bg-[#DCDFE4] text-white text-[1.11538rem] xsm:text-[0.89231rem] font-bold leading-[1.5] font-montserrat tracking-[-0.02231rem] xsm:tracking-[-0.01788rem]'>
                      {index + 1}
                    </div>
                  )}
                  <p className='xsm:hidden box-text flex-1 text-start text-pc-sub14s text-[rgba(0,0,0,0.30)]'>
                    {item?.title}
                  </p>
                </TabsTrigger>
              ),
            )}
          </div>
          <div
            className={cn(
              'sm:absolute xsm:relative sm:top-[1.25rem] sm:bottom-[1.25rem] sm:left-[1.25rem] w-[0.25rem] xsm:w-full xsm:h-[0.25rem] rounded-[1rem] bg-[rgba(0,0,0,0.08)] before:absolute before:top-0 before:bg-[#38B6FF] before:sm:w-full before:xsm:h-full before:transition-all before:duration-500',
              currentTab === '1' && 'before:sm:h-[5%] before:xsm:w-[5%]',
              currentTab === '2' && 'before:sm:h-[28%] before:xsm:w-[28%]',
              currentTab === '3' && 'before:sm:h-[50%] before:xsm:w-[50%]',
              currentTab === '4' && 'before:sm:h-[73%] before:xsm:w-[73%]',
              currentTab === '5' && 'before:sm:h-[100%] before:xsm:w-[100%]',
            )}
          ></div>
        </TabsList>
        <div className='flex-1 p-[1.25rem] xsm:p-[1rem] rounded-[1.25rem] bg-[#F8F8F8] xsm:bg-[#FAFAFA]'>
          {!isMobile && (
            <h1 className='text-black text-pc-heading20b mb-[1.5rem]'>
              Tạo đơn hàng
            </h1>
          )}
          <TabsContent
            value='1'
            className='mt-0'
          >
            <FormStepStart
              data={data}
              onSuccess={handleClickcurrentTab}
              setDataFromOrder={setDataFromOrder}
              dataFromOrder={dataFromOrder}
              dataInformation={dataInformation}
              sentGoodsAtAmamy={sentGoodsAtAmamy}
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
                {(dataInformation?.type === 'vietnhat' ||
                  dataInformation?.type === 'nhatviet') && (
                  <FormDeliveryInformationVNJapan
                    handleClickcurrentTab={handleClickcurrentTab}
                    setDataFromOrder={setDataFromOrder}
                    dataFromOrder={dataFromOrder}
                  />
                )}
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
                  setSubmitting={setSubmitting}
                  setDataFromOrder={setDataFromOrder}
                />
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>
      <div
        className={cn(
          'fixed transition-all duration-700 inset-0 bg-black/70 z-[51] hidden !mt-0',
          submitting && 'block',
          !faq && 'block',
        )}
      ></div>
      <div
        className={cn(
          'xsm:w-[21.4375rem] xsm:p-[1.5rem_1rem_1rem_1rem] xsm:rounded-[1.25rem] pointer-events-none visible transition-all duration-500 flex-center opacity-0 flex-col fixed z-[51] top-[75%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[29.375rem] p-[2rem_1.25rem_1.25rem_1.25rem] rounded-[1.25rem] bg-white',
          submitting && 'top-[50%] opacity-[1] pointer-events-auto',
        )}
      >
        <ICSuccess className='size-[2rem] xsm:size-[2.5rem] mb-[1.5rem]' />
        <p className='text-center w-full text-pc-heading20b xsm:text-pc-sub16b text-black mb-[0.5rem]'>
          Tạo đơn hàng thành công!
        </p>
        <p className='text-center text-pc-14 text-[rgba(0,0,0,0.80)] mb-[4rem] xsm:mb-[1.5rem]'>
          Đơn hàng của bạn đã được tạo thành công. Chúng tôi đã gửi thông tin
          xác nhận qua email của bạn.
        </p>
        <div
          onClick={() => {
            setSubmitting(false)
          }}
          className='h-[3rem] w-full p-[0.75rem_1.5rem] flex-center rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]'
        >
          <p className='text-pc-sub16m text-white'>Xong</p>
        </div>
      </div>
      <div
        className={cn(
          'top-[50%] opacity-[1] pointer-events-auto xsm:w-[21.4375rem] xsm:p-[1.5rem_1rem_1rem_1rem] xsm:rounded-[1.25rem] visible transition-all duration-500 flex-center flex-col fixed z-[51] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[29.375rem] p-[2rem_1.25rem_1.25rem_1.25rem] rounded-[1.25rem] bg-white',
          faq && 'pointer-events-none opacity-0 top-[75%]',
        )}
      >
        <ICFAQ className='size-[2rem] xsm:size-[2.5rem] mb-[1.5rem]' />
        <p className='text-center w-[16.875rem] text-pc-heading20b xsm:text-pc-sub16b text-black mb-[4rem]'>
          Bạn đã từng gửi hàng ở Amamy Post chưa?
        </p>
        <div className='flex justify-between items-center w-full space-x-[1rem]'>
          <div
            onClick={() => {
              setFaq(true)
              setSentGoodsAtAmamy(true)
            }}
            className='cursor-pointer h-[3rem] flex-1 p-[0.75rem_1.5rem] flex-center rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#F0F0F0]'
          >
            <p className='text-pc-sub16m text-black'>Đã từng</p>
          </div>
          <div
            onClick={() => {
              setFaq(true)
              setSentGoodsAtAmamy(false)
            }}
            className='cursor-pointer h-[3rem] flex-1 xsm:w-max xsm:whitespace-nowrap p-[0.75rem_1.5rem] flex-center rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]'
          >
            <p className='text-pc-sub16m text-white'>Đây là lần đầu</p>
          </div>
        </div>
      </div>
    </>
  )
}
