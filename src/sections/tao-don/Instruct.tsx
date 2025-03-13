'use client'
import useStore from '@/app/(store)/store'
import {ICLoading} from '@/components/icon/ICLoading'
import ImageV2 from '@/components/image/ImageV2'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {useScrollToTop} from '@/hooks/useScrollToTop'
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import ICWarning from '@/sections/tao-don/ICWarning'
import {
  IInformationInstructOrder,
  IInformationInstructOrder_SelectBranch,
} from '@/sections/tao-don/oder.interface'
import {useEffect, useState, useTransition} from 'react'
import {toast} from 'sonner'

export default function Instruct({
  data,
  handleClickcurrentTab,
  dataFromOrder,
  setSubmitting,
  setDataFromOrder,
}: {
  data?: IInformationInstructOrder
  handleClickcurrentTab: (nextTab: string) => void
  dataFromOrder?: IDataFromOrder
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  setDataFromOrder: React.Dispatch<React.SetStateAction<IDataFromOrder>>
}) {
  const {setStepOrder} = useStore((state) => state)
  const [isPending, setTransition] = useTransition()
  const [triggerScroll, setTriggerScroll] = useState<boolean>(false)
  useEffect(() => {
    if (triggerScroll) {
      useScrollToTop()
      setTriggerScroll(false)
    }
  }, [triggerScroll])
  function handleCreateOrder() {
    setTransition(async () => {
      const formData = new FormData()
      formData.append('ten_nguoi_nhan', dataFromOrder?.recipientName)
      formData.append('dia_chi_nguoi_nhan', dataFromOrder?.recipientAddress)
      formData.append('user', dataFromOrder?.email)
      formData.append(
        'loai_tien_te',
        dataFromOrder?.recipientPaymentInformation,
      )
      formData.append('sdt', dataFromOrder?.recipientPhone)
      if (dataFromOrder?.recipientAddressDetail) {
        formData.append(
          'dia_chi_nguoi_nhan_chi_tiet',
          dataFromOrder?.recipientAddressDetail,
        )
      }
      formData.append('chieu_van_don', dataFromOrder?.shipping)
      if (dataFromOrder?.customercode) {
        formData.append('ma_khach_hang', dataFromOrder?.customercode)
      }
      if (dataFromOrder?.recipientCity) {
        formData.append('thanh_pho', dataFromOrder?.recipientCity)
      }
      if (dataFromOrder?.recipientCodeCity) {
        formData.append('ma_thanh_pho', dataFromOrder?.recipientCodeCity)
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ORDER}v1/add`,
        {
          method: 'POST',
          body: formData,
        },
      )
      if (response?.ok) {
        setDataFromOrder({})
        setSubmitting(true)
        setStepOrder(1)
        handleClickcurrentTab('1')
        setTriggerScroll(true)
      } else {
        toast.error('Có lỗi sãy ra')
      }
    })
  }
  console.log(dataFromOrder)
  return (
    <div className='space-y-[1.5rem] xsm:space-y-[0.75rem]'>
      <p className='text-black text-pc-sub16b'>
        Hướng dẫn gửi hàng lên Amamy Post
      </p>
      <div className='flex xsm:flex-col sm:space-x-[1rem] xsm:space-y-[1rem] p-[1rem] rounded-[1.25rem] bg-white'>
        <div
          className='flex-1 [&_h3]:text-pc-tab-title [&_h3]:text-black [&_strong]:text-pc-sub14s [&_strong]:text-black *:text-[rgba(0,0,0,0.90)] *:text-pc-14 *:xsm:text-mb-13 [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)] xsm:marker:[&_ul_li]:text-[0.5rem]'
          dangerouslySetInnerHTML={{__html: data?.packing_instructions || ''}}
        ></div>
        {data?.images && (
          <ImageV2
            src={data?.images}
            alt=''
            width={300 * 2}
            height={200 * 2}
            className='rounded-[1.25rem] w-[18.75rem] xsm:w-full h-[12.5rem] xsm:h-[12.95831rem] object-cover'
          />
        )}
      </div>
      {data?.select_branch && (
        <div className='p-[1rem] rounded-[1.25rem] bg-white'>
          <p className='mb-[1rem] text-black font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem] xsm:text-pc-sub14s'>
            Chọn chi nhánh Amamy Post
          </p>
          <div className='space-y-[1.5rem]'>
            {Array.isArray(data?.select_branch) &&
              data?.select_branch?.map(
                (
                  item: IInformationInstructOrder_SelectBranch,
                  index: number,
                ) => (
                  <div
                    key={index}
                    className='space-y-[0.5rem]'
                  >
                    <p className='text-pc-sub12s text-[rgba(0,0,0,0.80)]'>
                      {item?.title}
                    </p>
                    <div
                      dangerouslySetInnerHTML={{__html: item?.content}}
                      className='rounded-[1.25rem] p-[1rem] border-[1px] border-solid border-[#DCDFE4] [&_h3]:text-pc-tab-title [&_h3]:text-black [&_strong]:text-pc-sub14s [&_span]:text-pc-sub12s [&_strong]:text-black *:text-[rgba(0,0,0,0.90)] *:text-pc-14 *:xsm:text-mb-13 [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)] xsm:marker:[&_ul_li]:text-[0.5rem]'
                    ></div>
                  </div>
                ),
              )}
          </div>
          {data?.note_more && (
            <div className='text-pc-sub12s text-[rgba(0,0,0,0.80)] mt-[1rem]'>
              {data?.note_more}
            </div>
          )}
        </div>
      )}
      {data?.shipping_instructions_image && (
        <div className='space-y-[1rem]'>
          {Array.isArray(data?.shipping_instructions_image) &&
            data?.shipping_instructions_image?.map(
              (item: string, index: number) => (
                <ImageV2
                  key={index}
                  src={item}
                  alt=''
                  width={891 * 2}
                  height={501 * 2}
                  className='max-h-[80vh] h-auto w-auto mx-auto rounded-[1.25rem] object-cover'
                />
              ),
            )}
        </div>
      )}
      <div className='xsm:p-[1rem] xsm:bg-[#FAFAFA] xsm:shadow-lg xsm:space-x-[0.5rem] xsm:fixed xsm:bottom-0 xsm:z-[50] disabled:xsm:opacity-[1] xsm:left-0 xsm:right-0 flex items-center justify-between sm:w-full'>
        <div
          onClick={() => handleClickcurrentTab('4')}
          className='xsm:flex-1 cursor-pointer sm:p-[0.75rem_1.5rem] xsm:py-[0.75rem] flex-center rounded-[1.25rem] bg-[#D9F1FF]'
        >
          <p className='text-pc-sub16m text-black'>Quay lại</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger className='xsm:flex-1'>
            <div
              className={cn(
                'xsm:flex-1 hover:bg-[#38B6FF] mt-[0rem] ml-auto h-[2.8125rem] flex-center p-[0.75rem_1.5rem] rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]',
              )}
            >
              {isPending ? (
                <ICLoading />
              ) : (
                <p className='text-white text-pc-sub16m'>Xác nhận</p>
              )}
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className='space-y-0 w-[29.375rem] xsm:w-[21.4375rem] xsm:p-[1.5rem_1rem_1rem_1rem] xsm:rounded-[1.25rem] z-[55]'>
            <AlertDialogHeader className='flex-center flex-col'>
              <ICWarning className='size-[2rem] xsm:size-[2.5rem] mb-[1.5rem]' />
              <AlertDialogTitle className='!mt-0 xsm:text-pc-sub16b xsm:mb-[0.5rem]'>
                Xác nhận đơn hàng
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p className='text-pc-14 text-[rgba(0,0,0,0.80)] text-center xsm:!mb-[0.5rem]'>
                  Bạn có chắc chắn muốn xác nhận đơn hàng này không? Vui lòng
                  kiểm tra lại tất cả thông tin trước khi gửi.
                </p>
                <p className='text-[#f00] text-center xsm:text-pc-sub12s'>
                  *Sau khi xác nhận, bạn sẽ không thể chỉnh sửa đơn hàng.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className='flex !mt-[4rem] space-x-[1rem]'>
              <AlertDialogCancel className='flex-1 xsm:text-pc-sub16m flex-center rounded-[1.25rem] h-[3rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#F0F0F0] hover:bg-[#38B6FF] transition-all duration-500 hover:text-white'>
                Hủy
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCreateOrder}
                className='flex-1 xsm:text-pc-sub16m flex-center rounded-[1.25rem] h-[3rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]'
              >
                Xác nhận
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
