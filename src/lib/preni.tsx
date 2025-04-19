'use client'

import {useEffect} from 'react'

const PrenyAI = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://app.preny.ai/embed-global.js'
    script.async = true
    script.defer = true

    script.setAttribute('data-preny-bot-id', '675bd0353dba1eaa09aecd92')
    script.setAttribute(
      'data-image',
      'http://cms.amamy.net/wp-content/uploads/2025/04/Ai-tron.svg',
    )

    const updateStyle = () => {
      const isMobile = window.innerWidth <= 480
      const style = isMobile
        ? 'width:2.5rem;height:2.5rem;right:1.5rem;bottom:1.5rem'
        : 'width:3rem;height:3rem;right:2.5rem;bottom:1.6rem'

      const containerStyle = isMobile ? 'height:90dvh' : ''
      script.setAttribute('data-button-style', style)
      script.setAttribute('data-container-style', containerStyle)
    }

    // Set initial style + responsive
    updateStyle()
    window.addEventListener('resize', updateStyle)

    document.body.appendChild(script)

    return () => {
      window.removeEventListener('resize', updateStyle)
      document.body.removeChild(script)
    }
  }, [])

  return null // Không cần render gì cả
}

export default PrenyAI
