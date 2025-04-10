import Script from 'next/script'
import React from 'react'

const PrenyAI = () => {
  return (
    <Script
      src='https://app.preny.ai/embed-global.js'
      strategy='afterInteractive'
      data-button-style='width:200px;height:200px'
      data-preny-bot-id='675bd0353dba1eaa09aecd92'
    />
  )
}

export default PrenyAI
