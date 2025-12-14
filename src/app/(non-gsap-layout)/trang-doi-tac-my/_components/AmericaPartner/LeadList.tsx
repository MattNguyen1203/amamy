'use client'
import {v4 as uuidv4} from 'uuid'

import React from 'react'
import {MOCK_LEAD_DATA, type LeadData} from '@/mock/trang-doi-tac-my'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import {cn} from '@/lib/utils'

interface TableRowData {
  lead: LeadData
  packageIndex: number
  isFirstPackage: boolean
  rowspan: number
  realIndex: number
}

// Transform data to create rows for each package
function transformDataToRows(leads: LeadData[]): TableRowData[] {
  const rows: TableRowData[] = []

  leads.forEach((lead, index) => {
    const packageCount = lead.packages.length

    lead.packages.forEach((_, packageIndex) => {
      rows.push({
        lead,
        packageIndex,
        isFirstPackage: packageIndex === 0,
        rowspan: packageCount,
        realIndex: index,
      })
    })
  })

  return rows
}

export default function LeadList() {
  const tableRows = transformDataToRows(MOCK_LEAD_DATA)

  return (
    <div className='w-full max-w-full xsm:overflow-x-auto'>
      <Table className='w-full xsm:ml-[1rem] xsm:mr-[1rem]'>
        <TableHeader>
          <TableRow className='!bg-[#F1F9FF]'>
            <TableHead className='h-[3rem] w-[2.8125rem] max-w-[2.8125rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <div>STT</div>
            </TableHead>
            <TableHead className='h-[3rem] w-[10.625rem] max-w-[10.625rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <div>Họ tên</div>
            </TableHead>
            <TableHead className='h-[3rem] w-[6.875rem] max-w-[6.875rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <div>SĐT</div>
            </TableHead>
            <TableHead className='h-[3rem] w-[10.625rem] max-w-[10.625rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <div>Email</div>
            </TableHead>
            <TableHead className='h-[3rem] w-[5.625rem] max-w-[5.625rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <div>Mã KH</div>
            </TableHead>
            <TableHead className='h-[3rem] w-[5.625rem] max-w-[5.625rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <div>Pick up</div>
            </TableHead>
            <TableHead className='h-[3rem] w-[12.5rem] max-w-[12.5rem] whitespace-normal border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <div>Địa chỉ lấy hàng</div>
            </TableHead>
            <TableHead className='h-[3rem] w-[6.25rem] max-w-[6.25rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <div>Kiện hàng</div>
            </TableHead>
            <TableHead className='h-[3rem] w-[5.625rem] max-w-[5.625rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <div>Cân nặng</div>
            </TableHead>
            <TableHead className='h-[3rem] w-[5.625rem] max-w-[5.625rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <div>Dạng label</div>
            </TableHead>
            <TableHead className='h-[3rem] w-[8.75rem] max-w-[8.75rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <div>Upload label (PDF)</div>
            </TableHead>
            <TableHead className='h-[3rem] w-[7.0625rem] max-w-[7.0625rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8] xsm:sticky xsm:right-0 xsm:z-10 xsm:bg-[#F1F9FF]'>
              <div>Gửi label</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableRows.map((rowData) => {
            const {lead, packageIndex, isFirstPackage, rowspan, realIndex} =
              rowData
            const packageInfo = lead.packages[packageIndex]

            return (
              <TableRow
                key={uuidv4()}
                className={cn(
                  realIndex % 2 === 1 ? '!bg-white' : '!bg-[#f8f8f8]',
                )}
              >
                {/* Common columns - only show on first package row with rowspan */}
                {isFirstPackage && (
                  <>
                    <TableCell
                      rowSpan={rowspan}
                      className='w-[2.8125rem] min-w-[2.8125rem] max-w-[2.8125rem] border-[0.8px] border-solid border-[#DCDFE4] py-[1rem] text-center text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.02438rem] text-black'
                    >
                      <p>{lead.index}</p>
                    </TableCell>
                    <TableCell
                      rowSpan={rowspan}
                      className='w-[10.625rem] min-w-[10.625rem] max-w-[10.625rem] border-[0.8px] border-solid border-[#DCDFE4] py-[1rem] text-center text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.02438rem] text-black'
                    >
                      <p>{lead.fullname}</p>
                    </TableCell>
                    <TableCell
                      rowSpan={rowspan}
                      className='w-[6.875rem] min-w-[6.875rem] max-w-[6.875rem] border-[0.8px] border-solid border-[#DCDFE4] py-[1rem] text-center text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.02438rem] text-black'
                    >
                      <p>{lead.phone}</p>
                    </TableCell>
                    <TableCell
                      rowSpan={rowspan}
                      className='w-[10.625rem] min-w-[10.625rem] max-w-[10.625rem] border-[0.8px] border-solid border-[#DCDFE4] py-[1rem] text-center text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.02438rem] text-black'
                    >
                      <p>{lead.email}</p>
                    </TableCell>
                    <TableCell
                      rowSpan={rowspan}
                      className='w-[5.625rem] min-w-[5.625rem] max-w-[5.625rem] border-[0.8px] border-solid border-[#DCDFE4] py-[1rem] text-center text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.02438rem] text-black'
                    >
                      <p> {lead.customerCode}</p>
                    </TableCell>
                    <TableCell
                      rowSpan={rowspan}
                      className={cn(
                        'w-[5.625rem] min-w-[5.625rem] max-w-[5.625rem] border-[0.8px] border-solid border-[#DCDFE4] py-[1rem] text-center text-[0.8125rem] font-semibold leading-[1.4] tracking-[-0.02438rem]',
                        lead.pickupDate ? 'text-[#33A6E8]' : 'text-black',
                      )}
                    >
                      <p> {lead.pickupDate || '--'}</p>
                    </TableCell>
                    <TableCell
                      rowSpan={rowspan}
                      className='w-[12.5rem] max-w-[12.5rem] shrink-0 whitespace-normal border-[0.8px] border-solid border-[#DCDFE4] px-[0.6875rem] py-[0.875rem] text-left text-[0.8125rem] leading-[1.4] tracking-[-0.02438rem] xsm:min-w-[12.5rem]'
                    >
                      <p className='w-full'>{lead.address}</p>
                    </TableCell>
                  </>
                )}

                {/* Package-specific columns */}
                <TableCell className='w-[6.25rem] min-w-[6.25rem] max-w-[6.25rem] border-[0.8px] border-solid border-[#DCDFE4] py-[1.25rem] text-center text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.02438rem]'>
                  <p>Kiện số {packageIndex + 1}</p>
                </TableCell>
                <TableCell className='w-[5.625rem] min-w-[5.625rem] max-w-[5.625rem] border-[0.8px] border-solid border-[#DCDFE4] py-[1.25rem] text-center text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.02438rem]'>
                  <p>{packageInfo.weight} LBS</p>
                </TableCell>
                <TableCell className='w-[5.625rem] min-w-[5.625rem] max-w-[5.625rem] border-[0.8px] border-solid border-[#DCDFE4] py-[1.25rem] text-center text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.02438rem]'>
                  <p>{packageInfo.labelType}</p>
                </TableCell>
                <TableCell className='w-[8.75rem] max-w-[8.75rem] border-[0.8px] border-solid border-[#DCDFE4] py-[1.25rem] text-center'>
                  <button className='mx-auto flex w-fit items-center justify-center gap-[0.5rem]'>
                    <span className='text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.02438rem] text-black underline'>
                      {packageInfo.uploadedFileName || 'Update label'}
                    </span>
                    <Image
                      alt=''
                      width={16}
                      height={16}
                      src='/icons/icon-download.svg'
                      className='size-[1rem] object-contain'
                    />
                  </button>
                </TableCell>
                <TableCell className='w-[7.0625rem] max-w-[7.0625rem] border-[0.8px] border-solid border-[#DCDFE4] !p-0 py-[0.75rem] xsm:sticky xsm:right-0 xsm:z-10 xsm:!bg-[#F1F9FF]'>
                  <div className='flex-center'>
                    {packageInfo.isLabelSent ? (
                      <p className='flex items-center justify-center space-x-[0.375rem]'>
                        <Image
                          alt=''
                          width={32}
                          height={32}
                          src='/icons/icon-dbcheck.svg'
                          className='size-[1rem] object-contain'
                        />
                        <span className='text-[0.75rem] font-medium leading-[1.3] tracking-[-0.0225rem] text-[#38B6FF]'>
                          Đã gửi
                        </span>
                      </p>
                    ) : (
                      <button className='mx-auto h-[1.75rem] w-fit rounded-full bg-[#38B6FF] px-[0.875rem] text-[0.75rem] font-medium leading-[1.3] tracking-[-0.0225rem] text-white xsm:border-[1.5px] xsm:border-solid xsm:border-white/80'>
                        <span className='block xsm:hidden'>Send label</span>
                        <span className='hidden xsm:block'>Send</span>
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
