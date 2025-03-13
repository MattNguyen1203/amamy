import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/header/sheet-custom'
import ImageV2 from '@/components/image/ImageV2'
import ArrowRight from '@/components/svg/ArrowRight'
import Menu from '@/components/svg/Menu'
import Link from 'next/link'

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='size-6 stroke-black' />
      </SheetTrigger>
      <SheetContent className='w-full overflow-auto p-4 pt-0 bg-[#F6F8FA]'>
        <SheetTitle className='hidden' />
        <SheetClose className='sticky top-0 py-4 bg-[#F6F8FA] w-full'>
          <ArrowRight className='size-6 stroke-black' />
        </SheetClose>
        <div className='px-4 bg-white rounded-[1.25rem]'>
          <Link
            href='#'
            className='text-mb-13M text-black py-4 block'
          >
            Theo dõi bưu kiện
          </Link>
          <div className='w-full bg-[#DCDFE4] h-[1px]' />
          <Link
            href='#'
            className='text-mb-13M text-black py-4 block'
          >
            Tạo đơn hàng
          </Link>
        </div>

        <div className='mt-6 px-4 bg-white rounded-[1.25rem]'>
          <Link
            href='#'
            className='text-mb-13M text-black py-4 block'
          >
            Về chúng tôi
          </Link>
          <div className='w-full bg-[#DCDFE4] h-[1px]' />
          <Link
            href='#'
            className='text-mb-13M text-black py-4 block'
          >
            Hữu ích cho gửi hàng
          </Link>
          <div className='w-full bg-[#DCDFE4] h-[1px]' />
          <Link
            href='#'
            className='text-mb-13M text-black py-4 block'
          >
            Dịch vụ
          </Link>
        </div>

        <p className='mt-6 text-pc-sub12s text-black/80'>Dịch vụ khác</p>
        <div className='mt-2 px-4 bg-white rounded-[1.25rem]'>
          <Link
            href='#'
            className='text-mb-13M text-black py-4 block'
          >
            Đặt hộ shopee
          </Link>
          <div className='w-full bg-[#DCDFE4] h-[1px]' />
          <Link
            href='#'
            className='text-mb-13M text-black py-4 block'
          >
            Hỗ trợ thanh toán
          </Link>
          <div className='w-full bg-[#DCDFE4] h-[1px]' />
          <Link
            href='#'
            className='text-mb-13M text-black py-4 block'
          >
            Gom nhiều đơn
          </Link>
        </div>

        <div className='mt-[4.31rem] flex-center space-x-4'>
          <Link href='#'>
            <ImageV2
              alt=''
              src='/header/icon-facebook.webp'
              width={100}
              height={100}
              className='size-10 object-cover rounded-full'
            />
          </Link>
          <Link href='#'>
            <ImageV2
              alt=''
              src='/header/icon-zalo.webp'
              width={100}
              height={100}
              className='size-10 object-cover rounded-full'
            />
          </Link>
          <Link href='#'>
            <ImageV2
              alt=''
              src='/header/icon-tiktok.webp'
              width={100}
              height={100}
              className='size-10 object-cover rounded-full'
            />
          </Link>
        </div>

        <div className='mt-4 text-center'>
          <p className='text-pc-sub14m text-black/80'>
            Tất cả quyền được bảo lưu.
            <br />
            Bản quyền © 2024 Ltd.
          </p>
          <div className='mt-4 flex-center space-x-8'>
            <Link
              href='#'
              className='text-pc-sub12m text-black/80'
            >
              Điều khoản & Điều kiện
            </Link>
            <Link
              href='#'
              className='text-pc-sub12m text-black/80'
            >
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default MobileMenu
