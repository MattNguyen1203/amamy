'use client'

// import Script from 'next/script'

export default function GoogleAnalytics({id}: {id: string}) {
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
