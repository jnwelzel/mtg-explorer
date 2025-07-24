import { useEffect, useRef, useState } from 'react'

type UseFooterResult = {
  footerRef: React.RefObject<HTMLDivElement | null>
  footerVisible: boolean
}

export const useFooter = (): UseFooterResult => {
  const footerRef = useRef<HTMLDivElement>(null)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return { footerRef, footerVisible }
}
