/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import useIsMobile from '@/hooks/useIsMobile'
import {useGSAP} from '@gsap/react'
import {gsap} from 'gsap'
import {CustomEase} from 'gsap/dist/CustomEase'
import {ScrollToPlugin} from 'gsap/dist/ScrollToPlugin'
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase, ScrollToPlugin)

export default function GsapProvider({children}: {children: React.ReactNode}) {
  const isMobile = useIsMobile()
  useGSAP(() => {
    CustomEase.create('easeOut', '0,0,0.58,1')
    CustomEase.create('easeInOut', '0.42,0,0.58,1')
    gsap.defaults({
      ease: 'power2',
      duration: 0.9,
    })
    ScrollTrigger.defaults({
      toggleActions: 'play play play none',
      start: 'top top+=100%',
      end: 'bottom top',
    })
    const elements = gsap.utils.toArray('.fade-in-box')
    elements.forEach((el: any) =>
      gsap.from(el, {
        autoAlpha: 0,
        y: 50,
        scrollTrigger: el,
        delay: 0.2,
        duration: 1,
      }),
    )
  }, [isMobile])
  return (
    <div id='smooth-wrapper'>
      <div id='smooth-content'>{children}</div>
    </div>
  )
}
