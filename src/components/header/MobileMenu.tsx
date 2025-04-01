'use client'
import {IDataHeader, Isocial} from '@/components/header/Header'
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
import Link from 'next/link'
import {Fragment} from 'react'

interface INavItems {
  name: string
  href?: string
}

const MobileMenu = ({
  navItems,
  social,
  dataHeader,
}: {
  navItems: INavItems[]
  social: Isocial[]
  dataHeader: IDataHeader
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='size-6 stroke-black' />
      </SheetTrigger>
      <SheetContent className='w-full overflow-auto p-4 pt-0 bg-[#F6F8FA]'>
        <SheetTitle className='hidden' />
        <SheetClose className='sticky top-0 py-4 bg-[#F6F8FA]'>
          <ArrowRight className='size-6 stroke-black' />
        </SheetClose>
        <div className='px-4 bg-white rounded-[1.25rem]'>
          <SheetClose asChild>
            <Link
              href={navItems?.[0]?.href || '#'}
              className='text-mb-13M text-black py-4 block'
            >
              {navItems?.[0]?.name}
            </Link>
          </SheetClose>
          <div className='w-full bg-[#DCDFE4] h-[1px]' />
          <SheetClose asChild>
            <Link
              href='/tao-don-hang'
              className='text-mb-13M text-black py-4 block'
            >
              Tạo đơn hàng
            </Link>
          </SheetClose>
        </div>

        <div className='mt-6 px-4 bg-white rounded-[1.25rem]'>
          <SheetClose asChild>
            <Link
              href={navItems?.[1]?.href || '#'}
              className='text-mb-13M text-black py-4 block'
            >
              {navItems?.[1]?.name}
            </Link>
          </SheetClose>
          <div className='w-full bg-[#DCDFE4] h-[1px]' />
          <SheetClose asChild>
            <Link
              href={navItems?.[3]?.href || '#'}
              className='text-mb-13M text-black py-4 block'
            >
              {navItems?.[3]?.name}
            </Link>
          </SheetClose>
          <div className='w-full bg-[#DCDFE4] h-[1px]' />
          <SheetClose asChild>
            <Link
              href={navItems?.[2]?.href || '#'}
              className='text-mb-13M text-black py-4 block'
            >
              {navItems?.[2]?.name}
            </Link>
          </SheetClose>
        </div>
        <p className='mt-6 text-pc-sub12s text-black/80'>Dịch vụ khác</p>
        <div className='mt-2 px-4 bg-white rounded-[1.25rem]'>
          {Array.isArray(dataHeader?.other_services) &&
            dataHeader?.other_services?.map(
              (
                item: {
                  title: string
                  link: string
                },
                index: number,
              ) => (
                <Fragment key={index}>
                  <Link
                    href={item?.link || ''}
                    target='__blank'
                    className='text-mb-13M text-black py-4 block'
                  >
                    {item?.title}
                  </Link>
                  <div
                    className={cn(
                      'w-full bg-[#DCDFE4] h-[1px]',
                      index + 1 === dataHeader?.other_services?.length &&
                        'hidden',
                    )}
                  />
                </Fragment>
              ),
            )}
        </div>

        <div className='mt-[4.31rem] flex-center space-x-4'>
          <Link
            href={social?.[0]?.link}
            target='__blank'
          >
            <ImageV2
              alt=''
              src='/header/icon-facebook.webp'
              width={100}
              height={100}
              className='size-10 object-cover rounded-full'
            />
          </Link>
          <Link
            href={social?.[1]?.link}
            target='__blank'
          >
            <ImageV2
              alt=''
              src='/header/icon-zalo.webp'
              width={100}
              height={100}
              className='size-10 object-cover rounded-full'
            />
          </Link>
          <Link
            href={social?.[2]?.link}
            target='__blank'
          >
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
              href={dataHeader?.clause || '/'}
              target='__blank'
              className='text-pc-sub12m text-black/80'
            >
              Điều khoản & Điều kiện
            </Link>
            <Link
              href={dataHeader?.privacy_policy || '/'}
              target='__blank'
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
