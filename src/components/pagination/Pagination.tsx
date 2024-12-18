'use client'
import ReactPaginate from 'react-paginate'
const Pagination = () => {
  return (
    <ReactPaginate
      breakLabel='...'
      nextLabel='next >'
      onPageChange={(e) => console.log(e.selected)}
      pageRangeDisplayed={2}
      pageCount={10}
      previousLabel='< previous'
      renderOnZeroPageCount={null}
      marginPagesDisplayed={2}
      pageClassName='rounded-full size-[2.5rem] bg-gray-400 flex justify-center items-center'
      className='flex items-center gap-2 my-4'
    />
  )
}

export default Pagination
