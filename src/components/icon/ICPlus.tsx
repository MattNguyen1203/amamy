import React from 'react'

const ICPlus = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      className={className}
    >
      <path
        d='M8 0.999878L8 14.9999M15 7.99988L1 7.99988'
        stroke='black'
        stroke-opacity='0.8'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default ICPlus
