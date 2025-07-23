'use client'

import {usePathname} from 'next/navigation'
import {useEffect} from 'react'

// import Script from 'next/script'

export default function GoogleAnalytics({id}: {id: string}) {
  const pathname = usePathname()
  useEffect(() => {
    if (pathname === '/tao-don-hang') {
      document.body.classList.add('page-tao-don-hang')
    } else {
      document.body.classList.remove('page-tao-don-hang')
    }
  }, [pathname])
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${id}', {
                page_path: window.location.pathname,
              });
              `,
        }}
      />
    </>
  )
}
