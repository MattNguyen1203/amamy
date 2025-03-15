'use client'
import ICDrop from '@/components/header/ICDrop'
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
import {cn} from '@/lib/utils'
import {ICreateOder} from '@/sections/tao-don/oder.interface'
import Link from 'next/link'
import {useState} from 'react'

interface INavItems {
  name: string
  href?: string
}

const MobileMenu = ({
  navItems,
  dataCreateOrder,
}: {
  navItems: INavItems[]
  dataCreateOrder: ICreateOder[]
}) => {
  const [toggle, setToggle] = useState<boolean>(false)
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
            href={navItems?.[0]?.href || '#'}
            className='text-mb-13M text-black py-4 block'
          >
            {navItems?.[0]?.name}
          </Link>
          <div className='w-full bg-[#DCDFE4] h-[1px]' />
          <Link
            href='/tao-don-hang'
            className='text-mb-13M text-black py-4 block'
          >
            Tạo đơn hàng
          </Link>
        </div>

        <div className='mt-6 px-4 bg-white rounded-[1.25rem]'>
          <Link
            href={navItems?.[1]?.href || '#'}
            className='text-mb-13M text-black py-4 block'
          >
            {navItems?.[1]?.name}
          </Link>
          <div className='w-full bg-[#DCDFE4] h-[1px]' />
          <Link
            href={navItems?.[3]?.href || '#'}
            className='text-mb-13M text-black py-4 block'
          >
            {navItems?.[3]?.name}
          </Link>
          <div className='w-full bg-[#DCDFE4] h-[1px]' />
          <div
            onClick={() => {
              setToggle(!toggle)
            }}
            className='text-mb-13M text-black py-4 flex w-full justify-between'
          >
            <p className='text-mb-13M text-black'>Dịch vụ</p>
            <ICDrop className='size-[1.5rem]' />
          </div>
          <div
            style={{
              height: toggle
                ? `calc(2.5rem*${dataCreateOrder?.length + 1})`
                : '0',
            }}
            className={cn(
              'space-y-[1rem] h-0 transition-all duration-500 overflow-hidden',
              toggle && 'pb-[1rem]',
            )}
          >
            {Array.isArray(dataCreateOrder) &&
              dataCreateOrder?.map((item: ICreateOder, index: number) => (
                <Link
                  href={item?.slug || ''}
                  key={index}
                  className='flex w-full justify-between space-x-[1rem] py-[0.5rem]'
                >
                  <ImageV2
                    src={item?.thumbnail}
                    alt=''
                    width={50 * 2}
                    height={50 * 2}
                    className='size-[1rem]'
                  />
                  <p className='flex-1 text-mb-13M text-black'>{item?.title}</p>
                </Link>
              ))}
          </div>
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
