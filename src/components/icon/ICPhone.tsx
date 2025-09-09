import React from 'react'

const ICPhone = ({className}: {className?: string}) => {
  return (
    <svg
      width='96'
      height='96'
      viewBox='0 0 96 96'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='48'
        cy='48'
        r='48'
        fill='#38B6FF'
      />
      <circle
        cx='48'
        cy='48'
        r='43.5'
        stroke='white'
      />
      <path
        d='M65.9219 58.2344L64.0469 66.125C63.8125 67.2969 62.875 68.0781 61.7031 68.0781C42.0156 68 26 51.9844 26 32.2969C26 31.125 26.7031 30.1875 27.875 29.9531L35.7656 28.0781C36.8594 27.8438 38.0312 28.4688 38.5 29.4844L42.1719 38C42.5625 39.0156 42.3281 40.1875 41.4688 40.8125L37.25 44.25C39.9062 49.6406 44.2812 54.0156 49.75 56.6719L53.1875 52.4531C53.8125 51.6719 54.9844 51.3594 56 51.75L64.5156 55.4219C65.5312 55.9688 66.1562 57.1406 65.9219 58.2344Z'
        fill='white'
      />
    </svg>
  )
}

export default ICPhone
