import { useState } from 'react'
import { Button } from './Button'
import { useClickAway } from '@uidotdev/usehooks'
import { createPortal } from 'react-dom'
import { AdvancedSearchModal } from './AdvancedSearchModal'

interface AdvancedSearchProps {
  className?: string
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickAway<HTMLDialogElement>(() => {
    setIsOpen(false)
  })

  return (
    <>
      <Button variant="link" size="small" className={className} onClick={() => setIsOpen(true)}>
        Advanced Search
      </Button>
      {isOpen
        ? createPortal(
            <AdvancedSearchModal onClose={() => setIsOpen(false)} ref={ref} onSubmit={() => {}} />,
            document.body
          )
        : null}
    </>
  )
}
