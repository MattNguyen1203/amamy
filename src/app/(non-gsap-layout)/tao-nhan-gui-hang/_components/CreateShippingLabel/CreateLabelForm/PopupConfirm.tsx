import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {cn} from '@/lib/utils'
import {DialogConfirmType} from '@/types/tao-nhan-gui-hang.interface'
import React from 'react'

interface PopupConfirmProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  dialogConfirmType: DialogConfirmType | null
  email?: string
}

export default function PopupConfirm({
  open,
  setOpen,
  dialogConfirmType,
  email,
}: PopupConfirmProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className='w-[31.25rem] !rounded-[2rem] bg-white p-[2rem] xsm:w-[21.4375rem] xsm:p-[1.25rem]'>
        <DialogHeader className='hidden'>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='flex w-full flex-col space-y-[1.5rem] xsm:space-y-[1rem]'>
          <div className='flex flex-col items-center space-y-[0.5rem] xsm:space-y-[0.375rem]'>
            <p className='text-[1.5rem] font-semibold leading-[1.4] tracking-[-0.06rem] text-black xsm:text-[1.125rem] xsm:tracking-[-0.045rem]'>
              Xác nhận thông tin
            </p>
            <p
              className={cn(
                'text-center font-semibold leading-[1.5] tracking-[-0.03rem] text-black/80 xsm:text-[0.875rem] xsm:tracking-[-0.02625rem]',
                dialogConfirmType && dialogConfirmType === 'useLabel'
                  ? 'xsm:w-[81.25%]'
                  : '',
              )}
            >
              {dialogConfirmType && dialogConfirmType === 'useLabel'
                ? 'Dùng QR Code – Bạn tự mang ra UPS Drop-off'
                : 'Dùng Label – UPS đến lấy hàng tận nhà (Pick-up)'}
            </p>
          </div>

          <div className='text-center text-[0.875rem] font-medium leading-[1.5] tracking-[-0.02625rem] text-black/80 xsm:text-[0.8125rem] xsm:leading-[1.4] xsm:tracking-[-0.02438rem] [&_strong]:font-normal [&_strong]:text-[#479667]'>
            <p
              className={cn(
                'hidden',
                dialogConfirmType && dialogConfirmType === 'useLabel'
                  ? 'block'
                  : '',
              )}
            >
              Amamy gửi QR Code qua email: <strong>{email}</strong> <br />
              Bạn chỉ cần mang kiện hàng ra UPS gần nhà và đưa QR Code cho nhân
              viên UPS để họ quét.
              <br />
              Không cần in, không cần Label, không thanh toán tại UPS.
              <br />
              Tất cả chi phí đã thanh toán 1 lần với Amamy.
            </p>

            <p
              className={cn(
                'hidden',
                dialogConfirmType && dialogConfirmType === 'usePickup'
                  ? 'block'
                  : '',
              )}
            >
              Bạn sẽ nhận Label dạng file PDF qua email:{' '}
              <strong>{email}</strong> <br />
              Vui lòng in Label ra giấy và dán chắc chắn lên thùng hàng.
              <br />
              Khi nhân viên UPS đến lấy hàng, kiện hàng phải được dán Label sẵn
              để UPS quét mã.
              <br />
              Bạn không cần thanh toán thêm, chỉ thanh toán 1 lần với Amamy.
            </p>
          </div>
          <div className='pt-[0.5rem]'>
            <button
              type='button'
              onClick={() => setOpen(false)}
              className='h-[2.8125rem] w-full rounded-[1.25rem] bg-[#38B6FF] ring-1 ring-white/80 flex-center xsm:h-[2.625rem]'
            >
              <span className='text-[1rem] font-medium leading-[1.3] tracking-[-0.03rem] text-white xsm:text-[0.875rem] xsm:tracking-[-0.02625rem]'>
                Xác nhận và gửi thông tin
              </span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
