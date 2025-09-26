import React from 'react'
import { Button, Link } from './ui'
import { useFooter } from '../hooks'
import topIcon from '../assets/top.svg'

const Footer: React.FC = () => {
  const { footerRef, isFooterVisible, scrollToTop, isBackToTopVisible } = useFooter()

  return (
    <>
      <footer ref={footerRef} className="bg-gray-800 p-4 text-white relative">
        <Button
          className={`shadow z-20 transition-opacity ${
            isFooterVisible
              ? 'absolute top-[-56px] md:bottom-[92px] right-4'
              : 'fixed bottom-3 right-4'
          } ${isBackToTopVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          variant="primary"
          isCircle
          onClick={scrollToTop}
          title="Scroll to top">
          <img src={topIcon} alt="Back to top" className="inline-block" />
        </Button>
        <div className="flex flex-col container mx-auto gap-3">
          <p className="text-xs text-gray-400">
            Wizards of the Coast, Magic: The Gathering, and their logos are trademarks of Wizards of
            the Coast LLC in the United States and other countries. © 1993-
            {new Date().getFullYear()} Wizards. All Rights Reserved.
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} MTG Explorer by{' '}
            <Link to="https://jonwelzel.online" target="_blank">
              Jonathan Welzel
            </Link>{' '}
            · Terms of Service · Privacy Policy
          </p>
        </div>
      </footer>
    </>
  )
}

export { Footer }
