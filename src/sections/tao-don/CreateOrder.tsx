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
import FormDeliveryInformationJapanVN from '@/sections/tao-don/FormDeliveryInformationJapanVN'
import FormDeliveryInformationVNHan from '@/sections/tao-don/FormDeliveryInformationVNHan'
import FormDeliveryInformationVNJapan from '@/sections/tao-don/FormDeliveryInformationVNJapan'
import FormStepStart from '@/sections/tao-don/FormStepStart'
import ICCheck from '@/sections/tao-don/ICCheck'
import ICSuccess from '@/sections/tao-don/ICSuccess'
import Instruct from '@/sections/tao-don/Instruct'
import Insurance from '@/sections/tao-don/Insurance'
import {ICreateOder} from '@/sections/tao-don/oder.interface'
import OrderStepTime from '@/sections/tao-don/OrderStepTime'
import Package from '@/sections/tao-don/Package'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch'
let StepForm: {title: string; value: string}[] = [
  {title: 'Thông tin gửi hàng', value: '1'},
  {title: 'Thời gian gửi hàng', value: '2'},
  {title: 'Lưu ý quan trọng', value: '3'},
  {title: 'Thông tin nhận hàng', value: '4'},
  {title: 'Bảo hiểm hàng hóa', value: '5'},
  {title: 'Chọn cách đóng gói', value: '6'},
  {title: 'Hướng dẫn gửi hàng lên Amamy Post', value: '7'},
]
export interface IDataFromOrder {
  [key: string]: any
}
export default function CreateOrder({data}: {data: ICreateOder[]}) {
  const isMobile = useIsMobile()
  const {setStepOrder} = useStore((state) => state)
  const [currentTab, setCurrentTab] = useState('1')
  const [indexTab, setIndexTab] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [prevTabFormDelivery, setPrevTabFormDelivery] = useState<string>('1')
  // const [faq, setFaq] = useState(true)
  // const [sentGoodsAtAmamy, setSentGoodsAtAmamy] = useState(false)
  const [dataFromOrder, setDataFromOrder] = useState<IDataFromOrder>({})
  const [dataInformation, setDataInformation] = useState<
    ICreateOder | undefined
  >()
  const [selectNationValue, setSelectNationValue] = useState<{
    img: string
    title: string
  }>({img: '', title: ''})
  const handleClickcurrentTab = (nextTab: string) => {
    setCurrentTab(nextTab)
  }
  const handlesetDataInformation = (shipping: string) => {
    setDataInformation(undefined)
    const foundItem = data?.find((item) => item.id === Number(shipping))
    setDataInformation(foundItem)
    setStepOrder(2)
    StepForm = [{title: 'Thông tin gửi hàng', value: '1'}]
    if (foundItem?.information?.time) {
      StepForm = [...StepForm, {title: 'Thời gian gửi hàng', value: '2'}]
    }
    if (
      foundItem?.type === 'nhatviet' ||
      foundItem?.type === 'ducvn' ||
      foundItem?.type === 'viethan' ||
      foundItem?.type === 'vietnhat'
    ) {
      StepForm = [...StepForm, {title: 'Lưu ý quan trọng', value: '3'}]
    }
    StepForm = [...StepForm, {title: 'Thông tin nhận hàng', value: '4'}]
    if (
      (foundItem?.type === 'vietduc' &&
        (foundItem?.information?.insurance?.compensation?.title ||
          foundItem?.information?.insurance?.compensation?.desc)) ||
      foundItem?.information?.insurance?.compensation?.policy
    ) {
      StepForm = [...StepForm, {title: 'Bảo hiểm hàng hóa', value: '5'}]
    }
    if (
      foundItem?.type !== 'vietduc' &&
      (foundItem?.information?.insurance?.user_chooses ||
        foundItem?.information?.insurance?.cargo_insurance_japanvn)
    ) {
      StepForm = [...StepForm, {title: 'Bảo hiểm hàng hóa', value: '5'}]
    }
    StepForm = [
      ...StepForm,
      {title: 'Chọn cách đóng gói', value: '6'},
      {title: 'Hướng dẫn gửi hàng lên Amamy Post', value: '7'},
    ]
  }
  // useEffect(() => {
  //   setTimeout(() => {
  //     setFaq(false)
  //   }, 1000)
  // }, [])
  useEffect(() => {
    if (
      dataInformation?.information?.note &&
      (dataInformation?.type === 'nhatviet' ||
        dataInformation?.type === 'ducvn' ||
        dataInformation?.type === 'viethan' ||
        dataInformation?.type === 'vietnhat')
    ) {
      setPrevTabFormDelivery('3')
    } else if (dataInformation?.information?.time) {
      setPrevTabFormDelivery('2')
    } else {
      setPrevTabFormDelivery('1')
    }
  }, [dataInformation])
  return (
    <>
      <Tabs
        value={currentTab}
        className='flex xsm:flex-col sm:space-x-[1.5rem] pb-[5rem] bg-white xsm:bg-[#FAFAFA]'
      >
        <TabsList className='xsm:space-y-[0.5rem] sticky z-[50] top-[7rem] xsm:top-[0rem] flex xsm:flex-col w-[28.3125rem] xsm:w-full h-max p-[1.25rem] xsm:p-[1rem] rounded-[1.25rem] bg-[#F8F8F8]'>
          {isMobile && (
            <div className='flex justify-between items-center w-full !mb-[1rem]'>
              <h1 className='flex-1 text-mb-h2 text-black'>Tạo đơn hàng</h1>
              <CustomBack />
            </div>
          )}
          <div className='xsm:w-full xsm:justify-between sm:space-y-[2.5rem] flex sm:flex-col flex-1'>
            {StepForm?.map(
              (item: {title: string; value: string}, index: number) => (
                <TabsTrigger
                  onClick={() => {
                    setCurrentTab(item?.value)
                    setIndexTab(index)
                  }}
                  key={index}
                  value={item?.value}
                  className={cn(
                    'flex xsm:justify-start xsm:w-max w-full space-x-[0.62rem] p-0 data-[state=active]:shadow-none [&_.box-index]:data-[state=active]:bg-[#38B6FF] [&_.box-text]:data-[state=active]:text-black',
                    index > Number(indexTab) && 'pointer-events-none',
                  )}
                >
                  {index < Number(indexTab) ? (
                    <ICCheck className='size-[2.0125rem] xsm:size-[1.75rem]' />
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
              'z-[-1] absolute xsm:left-[1.25rem] xsm:right-[1.25rem] xsm:bottom-[1.6rem] xsm:z-[-1] sm:top-[1.5rem] sm:bottom-[1.5rem] sm:left-[2.1rem] w-[0.25rem] xsm:w-auto xsm:h-[0.25rem] rounded-[1rem] bg-[rgba(0,0,0,0.08)] before:absolute before:top-0 ',
            )}
          >
            <div
              style={
                isMobile
                  ? {
                      width: `${(indexTab / (StepForm?.length - 1)) * 100}%`,
                    }
                  : {
                      height: `${(indexTab / (StepForm?.length - 1)) * 100}%`,
                    }
              }
              className='bg-[#38B6FF] xsm:h-[0.25rem] transition-all duration-1000'
            ></div>
          </div>
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
              handlesetDataInformation={handlesetDataInformation}
              data={data}
              setIndexTab={setIndexTab}
              indexTab={indexTab}
              onSuccess={handleClickcurrentTab}
              setDataFromOrder={setDataFromOrder}
              dataFromOrder={dataFromOrder}
              dataInformation={dataInformation}
              // sentGoodsAtAmamy={sentGoodsAtAmamy}
              nextStep={
                dataInformation
                  ? dataInformation?.information?.time
                    ? '2'
                    : dataInformation?.information?.note
                    ? '3'
                    : '4'
                  : '2'
              }
            />
          </TabsContent>
          {dataInformation && (
            <>
              <TabsContent
                value='2'
                className='mt-0'
              >
                <OrderStepTime
                  setSelectedImage={setSelectedImage}
                  setIndexTab={setIndexTab}
                  indexTab={indexTab}
                  handleClickcurrentTab={handleClickcurrentTab}
                  dataInformation={dataInformation?.information?.time}
                  nextStep={dataInformation?.type === 'nhatviet' ? '3' : '4'}
                  setDataFromOrder={setDataFromOrder}
                  dataFromOrder={dataFromOrder}
                />
              </TabsContent>
              <TabsContent
                value='3'
                className='mt-0'
              >
                {dataInformation?.type === 'nhatviet' && (
                  <CeateNote
                    setSelectedImage={setSelectedImage}
                    setIndexTab={setIndexTab}
                    indexTab={indexTab}
                    handleClickcurrentTab={handleClickcurrentTab}
                    data={dataInformation?.information?.note}
                    prevStep={dataInformation?.information?.time ? '2' : '1'}
                  />
                )}
              </TabsContent>
              <TabsContent
                value='4'
                className='mt-0'
              >
                {dataInformation?.type === 'ducvn' && (
                  <FormDeliveryInformationAboutVN
                    setIndexTab={setIndexTab}
                    indexTab={indexTab}
                    handleClickcurrentTab={handleClickcurrentTab}
                    setDataFromOrder={setDataFromOrder}
                    dataFromOrder={dataFromOrder}
                    prevStep={prevTabFormDelivery}
                    nextStep={
                      dataInformation?.information?.insurance
                        ? '5'
                        : dataInformation?.information?.package
                        ? '6'
                        : '7'
                    }
                  />
                )}
                {dataInformation?.type === 'viethan' && (
                  <FormDeliveryInformationVNHan
                    setIndexTab={setIndexTab}
                    indexTab={indexTab}
                    handleClickcurrentTab={handleClickcurrentTab}
                    setDataFromOrder={setDataFromOrder}
                    dataFromOrder={dataFromOrder}
                    shippingCost={dataInformation?.information?.shipping_cost}
                    prevStep={prevTabFormDelivery}
                    nextStep={
                      dataInformation?.information?.insurance
                        ? '5'
                        : dataInformation?.information?.package
                        ? '6'
                        : '7'
                    }
                  />
                )}
                {dataInformation?.type === 'vietnhat' && (
                  <FormDeliveryInformationVNJapan
                    setIndexTab={setIndexTab}
                    indexTab={indexTab}
                    handleClickcurrentTab={handleClickcurrentTab}
                    setDataFromOrder={setDataFromOrder}
                    dataFromOrder={dataFromOrder}
                    prevStep={prevTabFormDelivery}
                    nextStep={
                      dataInformation?.information?.insurance
                        ? '5'
                        : dataInformation?.information?.package
                        ? '6'
                        : '7'
                    }
                  />
                )}
                {dataInformation?.type === 'nhatviet' && (
                  <FormDeliveryInformationJapanVN
                    setIndexTab={setIndexTab}
                    indexTab={indexTab}
                    handleClickcurrentTab={handleClickcurrentTab}
                    setDataFromOrder={setDataFromOrder}
                    dataFromOrder={dataFromOrder}
                    prevStep={prevTabFormDelivery}
                    nextStep={
                      dataInformation?.information?.insurance
                        ? '5'
                        : dataInformation?.information?.package
                        ? '6'
                        : '7'
                    }
                  />
                )}
                {dataInformation?.type === 'vietduc' && (
                  <FormDeliveryInformation
                    setIndexTab={setIndexTab}
                    indexTab={indexTab}
                    handleClickcurrentTab={handleClickcurrentTab}
                    setDataFromOrder={setDataFromOrder}
                    dataFromOrder={dataFromOrder}
                    title={dataInformation?.title}
                    european={dataInformation?.european}
                    selectNationValue={selectNationValue}
                    setSelectNationValue={setSelectNationValue}
                    prevStep={prevTabFormDelivery}
                    nextStep={
                      dataInformation?.information?.insurance
                        ? '5'
                        : dataInformation?.information?.package
                        ? '6'
                        : '7'
                    }
                  />
                )}
              </TabsContent>
              <TabsContent
                value='5'
                className='mt-0'
              >
                <Insurance
                  type={dataInformation?.type}
                  setDataFromOrder={setDataFromOrder}
                  dataFromOrder={dataFromOrder}
                  setSelectedImage={setSelectedImage}
                  setIndexTab={setIndexTab}
                  indexTab={indexTab}
                  data={dataInformation?.information?.insurance}
                  handleClickcurrentTab={handleClickcurrentTab}
                />
              </TabsContent>

              <TabsContent
                value='6'
                className='mt-0'
              >
                <Package
                  setDataFromOrder={setDataFromOrder}
                  dataFromOrder={dataFromOrder}
                  data={dataInformation?.information?.package}
                  handleClickcurrentTab={handleClickcurrentTab}
                  setIndexTab={setIndexTab}
                  indexTab={indexTab}
                />
              </TabsContent>

              <TabsContent
                value='7'
                className='mt-0'
              >
                <Instruct
                  setSelectedImage={setSelectedImage}
                  setIndexTab={setIndexTab}
                  indexTab={indexTab}
                  data={dataInformation?.information?.instruct}
                  paymentMethod={dataInformation?.information?.payment_method}
                  handleClickcurrentTab={handleClickcurrentTab}
                  dataFromOrder={dataFromOrder}
                  setSubmitting={setSubmitting}
                  setDataFromOrder={setDataFromOrder}
                  type={dataInformation?.type}
                  european={dataInformation?.european}
                  importantNote={dataInformation?.information?.important_note}
                  prevStep={'6'}
                  setDataInformation={setDataInformation}
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
          // !faq && 'block',
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
        <p className='text-center text-pc-14 text-[rgba(0,0,0,0.80)] mb-[2rem] xsm:mb-[1.5rem]'>
          Đơn hàng của bạn đã được tạo thành công. Chúng tôi đã gửi thông tin
          xác nhận qua email của bạn.
        </p>
        <div
          onClick={() => {
            setSubmitting(false)
          }}
          className='cursor-pointer h-[3rem] w-full p-[0.75rem_1.5rem] flex-center rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]'
        >
          <p className='text-pc-sub16m text-white'>Xong</p>
        </div>
      </div>
      {selectedImage && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in'
          onClick={() => setSelectedImage(null)}
        >
          <div
            onClick={(e) => {
              e.stopPropagation() // Ngăn việc click vào ảnh đóng popup
            }}
            className='relative xsm:overflow-x-auto overflow-hidden max-w-[100vw] sm:max-w-[80vw] max-h-[100vh] flex flex-col items-center animate-scale-in'
          >
            <TransformWrapper
              initialScale={1}
              initialPositionX={200}
              initialPositionY={100}
            >
              {() => (
                <>
                  <TransformComponent>
                    <Image
                      width={1000 * 2}
                      height={800 * 2}
                      src={selectedImage}
                      alt='Zoomed Image'
                      quality={100}
                      className='max-w-full h-auto object-contain transition-transform duration-300 rounded-[1rem]'
                    />
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
        </div>
      )}
      {/* <div
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
      </div> */}
    </>
  )
}
