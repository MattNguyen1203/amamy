import React from 'react'

type Props = {
    children: React.ReactNode
}

const ButtonCreateOrder = ({children}: Props) => {
  return (
    <button className='rounded-[1.25rem] flex items-center bg-[#38B6FF] 
    py-[1rem] px-[1.5rem] h-[3rem] gap-[0.5rem] justify-center align-center border-[1.5px]'
    style={{borderColor: 'rgba(255, 255, 255, 0.80)'}}>

        <p>{children}</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 4L11.9988 12M11.9988 20V12M11.9988 12H20H4" stroke="#D9F1FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
  )
}

export default ButtonCreateOrder