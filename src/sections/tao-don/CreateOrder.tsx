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
import './style.css'

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
export interface IOptionField {
  notification_description: string
  notification_title: string
}
export interface IOptionFieldNotePopupJapan {
  title: string
  description: string
  text_note: string
  image: string
}
export default function CreateOrder({
  data,
  dataNoticeDanger,
  dataNotePopupJapan,
}: {
  data: ICreateOder[]
  dataNoticeDanger?: IOptionField
  dataNotePopupJapan?: IOptionFieldNotePopupJapan
}) {
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
    // Validate that the step exists in StepForm before switching
    const tabIndex = StepForm.findIndex((item) => item.value === nextTab)
    if (tabIndex === -1) {
      // If step doesn't exist, find the next valid step
      const nextValidStep = StepForm.find((item) => {
        const itemIndex = StepForm.findIndex((i) => i.value === item.value)
        return itemIndex > indexTab
      })
      if (nextValidStep) {
        const validIndex = StepForm.findIndex(
          (item) => item.value === nextValidStep.value,
        )
        setCurrentTab(nextValidStep.value)
        setIndexTab(validIndex)
      }
      return
    }
    setCurrentTab(nextTab)
    setIndexTab(tabIndex)
  }
  const handlesetDataInformation = (shipping: string) => {
    setDataInformation(undefined)
    const foundItem = data?.find((item) => item.id === Number(shipping))
    setDataInformation(foundItem)
    setStepOrder(2)

    const newStepForm: {title: string; value: string}[] = [
      {title: 'Thông tin gửi hàng', value: '1'},
    ]

    // Check if time exists and is a valid non-empty array
    const hasValidTime =
      foundItem?.information?.time &&
      Array.isArray(foundItem.information.time) &&
      foundItem.information.time.length > 0

    if (hasValidTime) {
      newStepForm.push({title: 'Thời gian gửi hàng', value: '2'})
    }

    if (
      foundItem &&
      ['nhatviet', 'ducvn', 'viethan', 'vietnhat'].includes(foundItem.type) &&
      foundItem.information?.note
    ) {
      newStepForm.push({title: 'Lưu ý quan trọng', value: '3'})
    }

    newStepForm.push({title: 'Thông tin nhận hàng', value: '4'})

    const insurance = foundItem?.information?.insurance
    if (insurance) {
      const hasInsuranceStep =
        (foundItem.type === 'vietduc' &&
          (insurance?.compensation?.title ||
            insurance?.compensation?.desc ||
            insurance?.compensation?.policy)) ||
        (foundItem.type !== 'vietduc' &&
          (insurance?.user_chooses || insurance?.cargo_insurance_japanvn))

      if (hasInsuranceStep) {
        newStepForm.push({title: 'Bảo hiểm hàng hóa', value: '5'})
      }
    }

    newStepForm.push({title: 'Chọn cách đóng gói', value: '6'})

    if (!foundItem?.information?.instruct?.hidden_step) {
      newStepForm.push({
        title: 'Hướng dẫn gửi hàng lên Amamy Post',
        value: '7',
      })
    }

    StepForm = newStepForm
    // Reset indexTab to 0 when StepForm changes
    setIndexTab(0)
    setCurrentTab('1')
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setFaq(false)
  //   }, 1000)
  // }, [])
  useEffect(() => {
    // debugger
    if (
      dataInformation?.information?.note &&
      (dataInformation?.type === 'nhatviet' ||
        dataInformation?.type === 'ducvn' ||
        dataInformation?.type === 'viethan' ||
        dataInformation?.type === 'vietnhat')
    ) {
      setPrevTabFormDelivery('3')
    } else if (
      dataInformation?.information?.time &&
      Array.isArray(dataInformation.information.time) &&
      dataInformation.information.time.length > 0
    ) {
      setPrevTabFormDelivery('2')
    } else {
      setPrevTabFormDelivery('1')
    }
  }, [dataInformation])

  // useEffect(() => {
  //   let ticking = false

  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY

  //     if (!ticking) {
  //       window.requestAnimationFrame(() => {
  //         if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
  //           setHideHeader(true)
  //         } else {
  //           setHideHeader(false)
  //         }

  //         lastScrollY.current = currentScrollY
  //         ticking = false
  //       })
  //       ticking = true
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)

  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  return (
    <>
      <Tabs
        value={currentTab}
        className='flex bg-white pb-[4rem] sm:space-x-[1.5rem] xsm:flex-col xsm:bg-[#FAFAFA] xsm:p-[0.75rem_0.75rem_0rem_0.75rem] xsm:pb-[5rem]'
      >
        {/* desktop */}
        {!isMobile && (
          <TabsList className='sticky top-[7rem] z-[49] flex h-max w-[28.3125rem] rounded-[2.25rem] bg-[#FAFAFA] p-[1.25rem] xsm:hidden'>
            <div className='flex flex-1 flex-col space-y-[2.5rem]'>
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
                      'flex space-x-[0.62rem] p-0 data-[state=active]:shadow-none [&_.box-text]:data-[state=active]:text-black',
                      index > Number(indexTab) && 'pointer-events-none',
                    )}
                  >
                    {index < Number(indexTab) ? (
                      <ICCheck className='size-[2.0125rem]' />
                    ) : (
                      <div
                        className={cn(
                          'box-index size-[1.8125rem] rounded-[100%] border-[0.038rem] border-[#38B6FF] bg-white p-[0.34375rem] font-montserrat text-[1.11538rem] font-semibold leading-[1.67306rem] tracking-[-0.02231rem] text-[#38B6FF] flex-center',
                          index === +indexTab &&
                            'bg-[#38B6FF] font-medium text-white',
                        )}
                      >
                        {index + 1}
                      </div>
                    )}
                    <p className='box-text flex-1 text-start text-[rgba(0,0,0,0.30)] text-pc-sub14s'>
                      {item?.title}
                    </p>
                  </TabsTrigger>
                ),
              )}
            </div>
            <div
              className={cn(
                'absolute z-[-1] w-[0.125rem] rounded-[1rem] bg-[rgba(0,0,0,0.08)] before:absolute before:top-0 sm:bottom-[1.5rem] sm:left-[2.1rem] sm:top-[1.5rem]',
              )}
            >
              <div
                style={{
                  height: `${(indexTab / (StepForm?.length - 1)) * 100}%`,
                }}
                className='bg-[#38B6FF] transition-all duration-1000'
              ></div>
            </div>
          </TabsList>
        )}

        {/* mobile */}
        {isMobile && (
          <TabsList
            className={cn(
              'ease-[cubic-bezier(0.4,0,0.2,1)] will-change-opacity inset-x-[0.75rem] top-[4.25rem] z-[49] flex h-max flex-col space-y-[0.5rem] rounded-[2.25rem] bg-white p-0 shadow-[0_2px_6px_-1px_rgba(15,15,16,0.04)] transition-all duration-500 will-change-transform sm:hidden',
            )}
          >
            {/* title */}
            <div className='flex w-full items-center justify-between p-[0.75rem_0.8125rem_0.625rem_1rem] pl-[1rem]'>
              <h1 className='flex-1 text-[0.875rem] font-bold leading-[1.05rem] tracking-[-0.035rem] text-[#000000EB]'>
                Tạo đơn hàng
              </h1>
              <CustomBack />
            </div>

            {/* steps */}
            <div className='relative w-full px-[1rem]'>
              {/* progress line */}
              <div
                className={cn(
                  'absolute bottom-[1.8125rem] left-[1.25rem] right-[1.25rem] top-[50%] z-[-1] h-[0.0625rem] w-auto translate-y-[50%] rounded-[1rem] bg-[rgba(0,0,0,0.08)] before:absolute before:top-0',
                )}
              >
                <div
                  style={{
                    width: `${(indexTab / (StepForm?.length - 1)) * 100}%`,
                  }}
                  className='bg-[#38B6FF] transition-all duration-1000 xsm:h-[0.0625rem]'
                ></div>
              </div>

              {/* numbers */}
              <div className='flex w-full flex-1 justify-between'>
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
                        'flex w-full space-x-[0.62rem] p-0 data-[state=active]:shadow-none xsm:w-max xsm:justify-start [&_.box-text]:data-[state=active]:text-black',
                        index > Number(indexTab) && 'pointer-events-none',
                      )}
                    >
                      {index < Number(indexTab) ? (
                        <ICCheck className='size-[2.0125rem] xsm:size-[1.75rem]' />
                      ) : (
                        <div
                          className={cn(
                            'box-index size-[1.8125rem] rounded-[100%] bg-[#DCDFE4] p-[0.34375rem] font-montserrat text-[1.11538rem] font-semibold leading-[1.5] tracking-[-0.02231rem] text-white flex-center xsm:size-[1.45rem] xsm:border-[0.5px] xsm:border-solid xsm:border-[#38B6FF] xsm:bg-white xsm:text-[0.75rem] xsm:tracking-[-0.01788rem] xsm:text-[#38B6FF]',
                            index === +indexTab &&
                              'bg-[#38B6FF] xsm:bg-[#38B6FF] xsm:text-white',
                          )}
                        >
                          {index + 1}
                        </div>
                      )}
                    </TabsTrigger>
                  ),
                )}
              </div>
            </div>

            {/* section title */}
            <div className='flex w-full items-start p-[0.25rem_0.8125rem_0.75rem_1rem] pl-[1rem]'>
              <p className='flex-1 text-[0.875rem] font-semibold leading-[1.1375rem] tracking-[-0.02625rem] text-[#33A6E8]'>
                {StepForm[indexTab]?.title || ''}
              </p>
            </div>
          </TabsList>
        )}

        <div className='flex-1 rounded-[2.25rem] bg-[#FAFAFA] p-[1.5rem] xsm:px-0'>
          {!isMobile && (
            <h1 className='mb-[1.5rem] text-[rgba(0,0,0,0.92)] text-pc-heading20b'>
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
                  ? (() => {
                      // Check if time is valid non-empty array
                      const hasValidTime =
                        dataInformation?.information?.time &&
                        Array.isArray(dataInformation.information.time) &&
                        dataInformation.information.time.length > 0

                      if (hasValidTime) {
                        return '2'
                      } else if (dataInformation?.information?.note) {
                        return '3'
                      } else {
                        return '4'
                      }
                    })()
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
                  nextStep={
                    dataInformation?.type === 'nhatviet' ||
                    dataInformation?.type === 'ducvn' ||
                    dataInformation?.type === 'viethan' ||
                    (dataInformation?.type === 'vietnhat' &&
                      dataInformation?.information?.note)
                      ? '3'
                      : '4'
                  }
                  setDataFromOrder={setDataFromOrder}
                  dataFromOrder={dataFromOrder}
                />
              </TabsContent>
              <TabsContent
                value='3'
                className='mt-0'
              >
                {(dataInformation?.type === 'nhatviet' ||
                  dataInformation?.type === 'ducvn' ||
                  dataInformation?.type === 'viethan' ||
                  (dataInformation?.type === 'vietnhat' &&
                    dataInformation?.information?.note)) && (
                  <CeateNote
                    setSelectedImage={setSelectedImage}
                    setIndexTab={setIndexTab}
                    indexTab={indexTab}
                    handleClickcurrentTab={handleClickcurrentTab}
                    data={dataInformation?.information?.note}
                    prevStep={dataInformation?.information?.time ? '2' : '1'}
                    type={dataInformation?.type}
                    importantNote={dataInformation?.information?.important_note}
                    setDataFromOrder={setDataFromOrder}
                    dataNotePopupJapan={dataNotePopupJapan}
                  />
                )}
              </TabsContent>
              <TabsContent
                value='4'
                className='mt-0'
              >
                {dataInformation?.type === 'ducvn' && (
                  <FormDeliveryInformationAboutVN
                    idOrder={dataInformation?.id}
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
                  minhBachCanNang={
                    dataInformation?.information?.minh_bach_can_nang
                  }
                  type={dataInformation?.type}
                  setDataFromOrder={setDataFromOrder}
                  dataFromOrder={dataFromOrder}
                  setSelectedImage={setSelectedImage}
                  setIndexTab={setIndexTab}
                  indexTab={indexTab}
                  data={dataInformation?.information?.insurance}
                  handleClickcurrentTab={handleClickcurrentTab}
                  dataNoticeDanger={dataNoticeDanger}
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
                  stepEnd={dataInformation?.information?.instruct?.hidden_step}
                  type={dataInformation?.type}
                  european={dataInformation?.european}
                  setSubmitting={setSubmitting}
                  setDataInformation={setDataInformation}
                  importantNote={dataInformation?.information?.important_note}
                  paymentMethod={dataInformation?.information?.payment_method}
                  nation={dataInformation?.nation}
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
                  nation={dataInformation?.nation}
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
          'fixed inset-0 z-[51] !mt-0 hidden bg-black/70 transition-all duration-700',
          submitting && 'block',
          // !faq && 'block',
        )}
      ></div>
      <div
        className={cn(
          'pointer-events-none visible fixed left-[50%] top-[75%] z-[51] w-[29.375rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-[1.25rem] bg-white p-[2rem_1.25rem_1.25rem_1.25rem] opacity-0 transition-all duration-500 flex-center xsm:w-[21.4375rem] xsm:rounded-[1.25rem] xsm:p-[1.5rem_1rem_1rem_1rem]',
          submitting && 'pointer-events-auto top-[50%] opacity-[1]',
        )}
      >
        <ICSuccess className='mb-[1.5rem] size-[2rem] xsm:size-[2.5rem]' />
        <p className='mb-[0.5rem] w-full text-center text-black text-pc-heading20b xsm:text-pc-sub16b'>
          Tạo đơn hàng thành công!
        </p>
        <p className='mb-[2rem] text-center text-[rgba(0,0,0,0.80)] text-pc-14 xsm:mb-[1.5rem]'>
          Đơn hàng của bạn đã được tạo thành công. Chúng tôi đã gửi thông tin
          xác nhận qua email của bạn.
        </p>
        <div
          onClick={() => {
            setSubmitting(false)
          }}
          className='h-[3rem] w-full cursor-pointer rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF] p-[0.75rem_1.5rem] flex-center'
        >
          <p className='text-white text-pc-sub16m'>Xong</p>
        </div>
      </div>
      {selectedImage && (
        <div
          className='fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black bg-opacity-50'
          onClick={() => setSelectedImage(null)}
        >
          <div
            onClick={(e) => {
              e.stopPropagation() // Ngăn việc click vào ảnh đóng popup
            }}
            className='relative flex max-h-[100vh] max-w-[100vw] animate-scale-in flex-col items-center overflow-hidden sm:max-w-[80vw] xsm:overflow-x-auto'
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
                      className='h-auto max-w-full rounded-[1rem] object-contain transition-transform duration-300'
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
