'use client'

import {IDataHeader, Isocial} from '@/components/header/Header'
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
import {Fragment, useState} from 'react'

interface INavItems {
  name: string
  href?: string
}

const MobileMenu = ({
  navItems,
  dataCreateOrder,
  social,
  dataHeader,
}: {
  navItems: INavItems[]
  dataCreateOrder: ICreateOder[]
  social: Isocial[]
  dataHeader: IDataHeader
}) => {
  const [toggle, setToggle] = useState<boolean>(false)
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='size-6 stroke-black' />
      </SheetTrigger>
      <SheetContent className='w-full overflow-auto bg-[#F6F8FA] p-4 pt-0'>
        <SheetTitle className='hidden' />
        <div className='sticky top-0 w-full bg-[#F6F8FA] py-4'>
          <SheetClose className=''>
            <ArrowRight className='size-6 stroke-black' />
          </SheetClose>
        </div>
        <div className='rounded-[1.25rem] bg-white px-4'>
          <SheetClose asChild>
            <Link
              href={navItems?.[0]?.href || '#'}
              className='block py-4 text-black text-mb-13M'
            >
              {navItems?.[0]?.name}
            </Link>
          </SheetClose>
          <div className='h-[1px] w-full bg-[#DCDFE4]' />
          <SheetClose asChild>
            <Link
              href='/tao-don-hang'
              className='block py-4 text-black text-mb-13M'
            >
              Tạo đơn hàng
            </Link>
          </SheetClose>
        </div>

        <div className='mt-6 rounded-[1.25rem] bg-white px-4'>
          <SheetClose asChild>
            <Link
              href={navItems?.[1]?.href || '#'}
              className='block py-4 text-black text-mb-13M'
            >
              {navItems?.[1]?.name}
            </Link>
          </SheetClose>
          <div className='h-[1px] w-full bg-[#DCDFE4]' />
          <SheetClose asChild>
            <Link
              href={navItems?.[3]?.href || '#'}
              className='block py-4 text-black text-mb-13M'
            >
              {navItems?.[3]?.name}
            </Link>
          </SheetClose>
          <div className='h-[1px] w-full bg-[#DCDFE4]' />
          <SheetClose asChild>
            <Link
              href={navItems?.[4]?.href || '#'}
              className='block py-4 text-black text-mb-13M'
            >
              {navItems?.[4]?.name}
            </Link>
          </SheetClose>
          <div className='h-[1px] w-full bg-[#DCDFE4]' />
          <div
            onClick={() => {
              setToggle(!toggle)
            }}
            className='flex w-full justify-between py-4 text-black text-mb-13M'
          >
            <p className='text-black text-mb-13M'>Dịch vụ</p>
            <ICDrop className='size-[1.5rem]' />
          </div>
          <div
            style={{
              height: toggle
                ? `calc(2.5rem*${dataCreateOrder?.length + 2.5})`
                : '0',
            }}
            className={cn(
              'h-0 space-y-[1rem] overflow-hidden transition-all duration-500',
              toggle && 'pb-[1rem]',
            )}
          >
            {Array.isArray(dataCreateOrder) &&
              dataCreateOrder?.map((item: ICreateOder, index: number) => (
                <Fragment key={index}>
                  <SheetClose asChild>
                    <Link
                      href={'/' + item?.slug || ''}
                      className='flex w-full justify-between space-x-[1rem] py-[0.5rem]'
                    >
                      <ImageV2
                        src={item?.thumbnail}
                        alt=''
                        width={50 * 2}
                        height={50 * 2}
                        className='size-[1rem] rounded-[100%]'
                      />
                      <p className='flex-1 text-black text-mb-13M'>
                        {item?.title}
                      </p>
                    </Link>
                  </SheetClose>
                </Fragment>
              ))}
          </div>
        </div>
        <p className='mt-6 text-black/80 text-pc-sub12s'>Dịch vụ khác</p>
        <div className='mt-2 rounded-[1.25rem] bg-white px-4'>
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
                    className='block py-4 text-black text-mb-13M'
                  >
                    {item?.title}
                  </Link>
                  <div
                    className={cn(
                      'h-[1px] w-full bg-[#DCDFE4]',
                      index + 1 === dataHeader?.other_services?.length &&
                        'hidden',
                    )}
                  />
                </Fragment>
              ),
            )}
        </div>

        <div className='mt-[4.31rem] space-x-4 flex-center'>
          <Link
            href={social?.[0]?.link}
            target='__blank'
          >
            <ImageV2
              alt=''
              src='/header/icon-facebook.webp'
              width={100}
              height={100}
              className='size-10 rounded-full object-cover'
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
              className='size-10 rounded-full object-cover'
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
              className='size-10 rounded-full object-cover'
            />
          </Link>
        </div>

        <div className='mt-4 text-center'>
          <p className='text-black/80 text-pc-sub14m'>
            Tất cả quyền được bảo lưu.
            <br />
            Bản quyền © 2025 Ltd.
          </p>
          <div className='mt-4 space-x-8 flex-center'>
            <Link
              href={dataHeader?.clause || '/'}
              target='__blank'
              className='text-black/80 text-pc-sub12m'
            >
              Điều khoản & Điều kiện
            </Link>
            <Link
              href={dataHeader?.privacy_policy || '/'}
              target='__blank'
              className='text-black/80 text-pc-sub12m'
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
