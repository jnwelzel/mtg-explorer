import { useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'
import { createPortal } from 'react-dom'
import { Button } from '../ui'
import { AdvancedSearchModal } from './AdvancedSearchModal'

interface AdvancedSearchProps {
  className?: string
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(false)
  }
  const ref = useClickAway<HTMLDialogElement>(() => {
    onClose()
  })

  return (
    <>
      <Button variant="link" size="small" className={className} onClick={() => setIsOpen(true)}>
        Advanced Search
      </Button>
      {isOpen
        ? createPortal(<AdvancedSearchModal onClose={onClose} ref={ref} />, document.body)
        : null}
    </>
  )
}
