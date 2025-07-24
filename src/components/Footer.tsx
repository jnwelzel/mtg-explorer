import React from 'react'
import { Button } from './ui'
import { useFooter } from '../hooks'

const Footer: React.FC = () => {
  const { footerRef, footerVisible } = useFooter()

  return (
    <div className="col-span-2 relative">
      <Button
        className={`shadow z-20 transition-all ${
          footerVisible ? 'absolute bottom-[72px] right-3' : 'fixed bottom-3 right-3'
        }`}
        variant="primary">
        ↑ Back to top
      </Button>
      <footer ref={footerRef} className="bg-gray-800 p-4 text-white">
        Footer
      </footer>
    </div>
  )
}

export { Footer }
