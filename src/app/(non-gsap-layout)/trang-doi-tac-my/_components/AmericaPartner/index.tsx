'use client'

import LeadFilter from '@/app/(non-gsap-layout)/trang-doi-tac-my/_components/AmericaPartner/LeadFilter'
import LeadFilterMobile from '@/app/(non-gsap-layout)/trang-doi-tac-my/_components/AmericaPartner/LeadFilterMobile'
import LeadList from '@/app/(non-gsap-layout)/trang-doi-tac-my/_components/AmericaPartner/LeadList'
import LeadSearch from '@/app/(non-gsap-layout)/trang-doi-tac-my/_components/AmericaPartner/LeadSearch'
import PaginationV2 from '@/components/pagination/PaginationV2'
import React from 'react'

export default function AmericaPartner() {
  return (
    <section className='relative w-full pb-[6.25rem] xsm:py-[2rem]'>
      <div className='mx-auto w-full max-w-[88rem] space-y-[1.5rem]'>
        <div className='flex items-center justify-between xsm:flex-col xsm:items-start xsm:justify-start xsm:space-y-[1rem] xsm:px-[1rem]'>
          <h2 className='text-[1.375rem] font-semibold uppercase leading-[1.5] tracking-[-0.04125rem] text-[rgba(0,0,0,0.92)] xsm:text-[1rem] xsm:tracking-[-0.03rem]'>
            Bảng danh sách thu lead từ Form
          </h2>
          <div className='flex shrink-0 items-center space-x-[0.875rem] xsm:w-full xsm:justify-between xsm:space-x-0'>
            <LeadSearch />
            <LeadFilter />
            <LeadFilterMobile />
          </div>
        </div>
        <div className='w-full space-y-[1.5rem]'>
          <LeadList />
          <PaginationV2
            pageCurrent={2}
            pageCount={4}
            setCurrentPage={() => {}}
          />
        </div>
      </div>
    </section>
  )
}
