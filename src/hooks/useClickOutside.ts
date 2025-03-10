'use client'

import {useEffect, useRef, useState} from 'react'

export default function useClickOutside<T extends HTMLElement>() {
  const [isOutside, setIsOutside] = useState(false)
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOutside(true)
      } else {
        setIsOutside(false)
      }
    }

    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return {ref, isOutside}
}
