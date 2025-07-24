import { useIntersectionObserver, useWindowScroll } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'

type UseFooterResult = {
  footerRef: React.RefCallback<HTMLDivElement>
  isFooterVisible: boolean
  scrollToTop: () => void
  isBackToTopVisible: boolean
}

export const useFooter = (): UseFooterResult => {
  const [footerRef, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  })
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false)
  const [{ y }, scrollTo] = useWindowScroll()

  useEffect(() => {
    if (y && y > 235) {
      setIsBackToTopVisible(true)
    } else {
      setIsBackToTopVisible(false)
    }
  }, [y])

  const scrollToTop = () => {
    scrollTo({ left: 0, top: 0, behavior: 'smooth' })
  }

  return {
    footerRef,
    isFooterVisible: entry?.isIntersecting ?? false,
    isBackToTopVisible,
    scrollToTop,
  }
}
