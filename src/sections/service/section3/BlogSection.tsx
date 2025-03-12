import React from 'react'
import SlideDocs from './SlideDocs'
import {IBlogResponse} from '@/utils/type'

interface Prop {
  listBlog: IBlogResponse
}
const BlogSection = ({listBlog}: Prop) => {
  return (
    <div className='flex pt-24 pl-24 pb-24 flex-col items-start gap-2.5 self-stretch w-full xsm:pl-[1rem] bg-[#EDF5FA]'>
      <div className='flex justify-between w-full flex-col'>
        <div className='flex  justify-between w-full mb-[2.5rem] xsm:items-center'>
          <h2 className='text-[2.875rem] not-italic font-bold leading-[120%] xsm:text-[1.375rem]'>
            Các tin tức mới nhất
          </h2>
          <button
            className='flex rounded-[1.25rem] mr-24 xsm:mr-[1rem] xsm:rounded-full xsm:w-[2.66rem] xsm:flex-shrink-0 xsm:h-[2.66rem] xsm:p-0 text-white h-12 pl-6 pr-4 py-3 
            justify-center items-center gap-1 rounded-tl-[var(--8,] 
            rounded-br-[var(--8,] rounded-tr-[0.5rem)] rounded-bl-[0.5rem)] border-[1.5px] border-solid border-[rgba(255,255,255,0.80)] 
            bg-[var(--Blue-Primary,_#38B6FF)]'
          >
            <span className='xsm:hidden'>Tất cả bài viết</span>
            <ArrowIcon />
          </button>
        </div>
        <SlideDocs posts={listBlog.posts} />
      </div>
    </div>
  )
}

export default BlogSection

const ArrowIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M18.7058 12.7071C19.0963 12.3166 19.0963 11.6834 18.7058 11.2929L14.7058 7.29289C14.3152 6.90237 13.6821 6.90237 13.2916 7.29289C12.901 7.68342 12.901 8.31658 13.2916 8.70711L15.5844 11L7.33199 11C6.77971 11 6.33199 11.4477 6.33199 12C6.33199 12.5523 6.77971 13 7.33199 13L15.5844 13L13.2916 15.2929C12.901 15.6834 12.901 16.3166 13.2916 16.7071C13.6821 17.0976 14.3152 17.0976 14.7058 16.7071L18.7058 12.7071Z'
        fill='white'
      />
    </svg>
  )
}

// const ArrowRightIcon = () => {
//   return (
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       width='32'
//       height='32'
//       viewBox='0 0 32 32'
//       fill='none'
//     >
//       <path
//         d='M14.9997 22.9995L8 15.9998M8 15.9998L14.9997 9.00017M8 15.9998L24 15.9998'
//         stroke='black'
//         stroke-width='2'
//         stroke-linecap='round'
//         stroke-linejoin='round'
//       />
//     </svg>
//   )
// }
