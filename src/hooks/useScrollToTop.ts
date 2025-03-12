'use client'

export const useScrollToTop = (): void => {
  if (window) {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    scrollToTop()
  }
}
