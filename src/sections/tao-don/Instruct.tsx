'use client'
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
import {cn} from '@/lib/utils'
import {IDataFromOrder} from '@/sections/tao-don/CreateOrder'
import ICWarning from '@/sections/tao-don/ICWarning'
import {
  IInformationInstructOrder,
  IInformationInstructOrder_SelectBranch,
} from '@/sections/tao-don/oder.interface'
import {useTransition} from 'react'

export default function Instruct({
  data,
  handleClickcurrentTab,
  dataFromOrder,
}: {
  data?: IInformationInstructOrder
  handleClickcurrentTab: (nextTab: string) => void
  dataFromOrder?: IDataFromOrder
}) {
  const [isPending, setTransition] = useTransition()
  function handleCreateOrder() {
    // setTransition(async () => {
    //   const formData = new FormData()
    //   formData.append('ten_nguoi_nhan', dataFromOrder?.recipientName)
    //   formData.append('ten_nguoi_nhan', dataFromOrder?.recipientName)
    //   await fetch(`${process.env.NEXT_PUBLIC_API}/order/v1/add`, {
    //     method: 'POST',
    //     body: formData,
    //   })
    //     .then((response) => response.json())
    //     .then((data) => console.log('Thành công:', data))
    //     .catch((error) => console.error('Lỗi:', error))
    // })
  }
  return (
    <div className='space-y-[1.5rem]'>
      <p className='text-black text-pc-sub16b'>
        Hướng dẫn gửi hàng lên Amamy Post
      </p>
      <div className='flex space-x-[1rem] p-[1rem] rounded-[1.25rem] bg-white'>
        <div
          className='flex-1 [&_strong]:text-pc-sub14s [&_strong]:text-black *:text-[rgba(0,0,0,0.90)] *:text-pc-sub14r [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)]'
          dangerouslySetInnerHTML={{__html: data?.packing_instructions || ''}}
        ></div>
        {data?.images && (
          <ImageV2
            src={data?.images}
            alt=''
            width={300 * 2}
            height={200 * 2}
            className='rounded-[1.25rem] w-[18.75rem] h-[12.5rem] object-cover'
          />
        )}
      </div>
      {data?.select_branch && (
        <div className='p-[1rem] rounded-[1.25rem] bg-white'>
          <p className='mb-[1rem] text-black font-montserrat text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem]'>
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
                      className='rounded-[1.25rem] p-[1rem] border-[1px] border-solid border-[#DCDFE4] [&_strong]:text-pc-sub14s [&_span]:text-pc-sub12s [&_strong]:text-black *:text-[rgba(0,0,0,0.90)] *:text-pc-sub14r [&_ul]:content-ul [&_ul]:!my-0 marker:[&_ul_li]:text-[rgba(0,0,0,0.80)]'
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
      <div className='flex items-center justify-between w-full'>
        <div
          onClick={() => handleClickcurrentTab('4')}
          className='cursor-pointer p-[0.75rem_1.5rem] flex-center rounded-[1.25rem] bg-[#D9F1FF]'
        >
          <p className='text-pc-sub16m text-black'>Quay lại</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <div
              className={cn(
                'hover:bg-[#38B6FF] mt-[0rem] ml-auto h-[2.8125rem] flex-center p-[0.75rem_1.5rem] rounded-[1.25rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]',
              )}
            >
              <p className='text-white text-pc-sub16m'>Xác nhận</p>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className='space-y-0 w-[29.375rem]'>
            <AlertDialogHeader className='flex-center flex-col'>
              <ICWarning className='size-[2rem] mb-[1.5rem]' />
              <AlertDialogTitle className='!mt-0'>
                Xác nhận đơn hàng
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p className='text-pc-sub14r text-[rgba(0,0,0,0.80)] text-center'>
                  Bạn có chắc chắn muốn xác nhận đơn hàng này không? Vui lòng
                  kiểm tra lại tất cả thông tin trước khi gửi.
                </p>
                <p className='text-[#f00] text-center'>
                  *Sau khi xác nhận, bạn sẽ không thể chỉnh sửa đơn hàng.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className='flex !mt-[4rem] space-x-[1rem]'>
              <AlertDialogCancel className='flex-1 flex-center rounded-[1.25rem] h-[3rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#F0F0F0] hover:bg-[#38B6FF] transition-all duration-500 hover:text-white'>
                Hủy
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCreateOrder}
                className='flex-1 flex-center rounded-[1.25rem] h-[3rem] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] bg-[#38B6FF]'
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
