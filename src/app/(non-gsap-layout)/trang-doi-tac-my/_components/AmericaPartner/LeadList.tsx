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
}

// Transform data to create rows for each package
function transformDataToRows(leads: LeadData[]): TableRowData[] {
  const rows: TableRowData[] = []

  leads.forEach((lead) => {
    const packageCount = lead.packages.length

    lead.packages.forEach((_, packageIndex) => {
      rows.push({
        lead,
        packageIndex,
        isFirstPackage: packageIndex === 0,
        rowspan: packageCount,
      })
    })
  })

  return rows
}

export default function LeadList() {
  const tableRows = transformDataToRows(MOCK_LEAD_DATA)

  return (
    <div className='w-full max-w-full xsm:overflow-x-auto'>
      <Table className='w-full border-collapse border-[0.8px] border-solid border-[#DCDFE4] xsm:ml-[1rem] xsm:mr-[1rem]'>
        <TableHeader>
          <TableRow className='border-[0.8px] border-solid border-[#DCDFE4] !bg-[#F1F9FF]'>
            <TableHead className='h-[3rem] w-[2.8125rem] max-w-[2.8125rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <p>STT</p>
            </TableHead>
            <TableHead className='h-[3rem] w-[10.625rem] max-w-[10.625rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <p>Họ tên</p>
            </TableHead>
            <TableHead className='h-[3rem] w-[6.875rem] max-w-[6.875rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <p>SĐT</p>
            </TableHead>
            <TableHead className='h-[3rem] w-[10.625rem] max-w-[10.625rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <p>Email</p>
            </TableHead>
            <TableHead className='h-[3rem] w-[5.625rem] max-w-[5.625rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <p>Mã KH</p>
            </TableHead>
            <TableHead className='h-[3rem] w-[5.625rem] max-w-[5.625rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <p>Pick up</p>
            </TableHead>
            <TableHead className='h-[3rem] w-[12.5rem] max-w-[12.5rem] whitespace-normal border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <p>Địa chỉ lấy hàng</p>
            </TableHead>
            <TableHead className='h-[3rem] w-[6.25rem] max-w-[6.25rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <p>Kiện hàng</p>
            </TableHead>
            <TableHead className='h-[3rem] w-[5.625rem] max-w-[5.625rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <p>Cân nặng</p>
            </TableHead>
            <TableHead className='h-[3rem] w-[5.625rem] max-w-[5.625rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <p>Dạng label</p>
            </TableHead>
            <TableHead className='h-[3rem] w-[8.75rem] max-w-[8.75rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8]'>
              <p>Upload label (PDF)</p>
            </TableHead>
            <TableHead className='h-[3rem] w-[7.0625rem] max-w-[7.0625rem] border-[0.8px] border-solid border-[#DCDFE4] text-center text-[0.875rem] font-semibold leading-[1.4] tracking-[-0.02625rem] text-[#33A6E8] xsm:sticky xsm:right-0 xsm:z-10 xsm:border-l-[0.125rem] xsm:border-l-[#DCDFE4] xsm:bg-[#F1F9FF]'>
              <p>Gửi label</p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableRows.map((rowData) => {
            const {lead, packageIndex, isFirstPackage, rowspan} = rowData
            const packageInfo = lead.packages[packageIndex]

            return (
              <TableRow
                key={uuidv4()}
                className={cn(
                  'border-[0.8px] border-solid border-[#DCDFE4]',
                  lead.index % 2 === 1 ? '!bg-white' : '!bg-[#f8f8f8]',
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
                <TableCell className='w-[7.0625rem] max-w-[7.0625rem] border-[0.8px] border-solid border-[#DCDFE4] py-[0.75rem] xsm:sticky xsm:right-0 xsm:z-10 xsm:!bg-[#F1F9FF]'>
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
                    <button className='h-[1.75rem] rounded-full bg-[#38B6FF] px-[0.875rem] text-[0.75rem] font-medium leading-[1.3] tracking-[-0.0225rem] text-white'>
                      Send label
                    </button>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
