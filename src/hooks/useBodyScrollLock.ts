function useBodyScrollLock(isLocked: boolean) {
  const lockScroll = () => {
    document.body.style.overflow = 'hidden'
  }

  const unlockScroll = () => {
    document.body.style.overflow = 'auto'
  }

  if (isLocked) {
    lockScroll()
  } else {
    unlockScroll()
  }

  return () => {
    unlockScroll()
  }
}

export default useBodyScrollLock

export function isLockScroll(isLocked: boolean) {
  if (isLocked) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}
