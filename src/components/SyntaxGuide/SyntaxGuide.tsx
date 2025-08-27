import { useClickAway } from '@uidotdev/usehooks'
import { useState } from 'react'
import { Button } from '../ui'
import { createPortal } from 'react-dom'
import { SyntaxGuideModal } from './SyntaxGuideModal'

export const SyntaxGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(false)
  }
  const ref = useClickAway<HTMLDialogElement>(() => {
    onClose()
  })

  return (
    <>
      <Button variant="link" size="small" onClick={() => setIsOpen(true)}>
        Syntax Guide
      </Button>
      {isOpen
        ? createPortal(<SyntaxGuideModal onClose={onClose} ref={ref} />, document.body)
        : null}
    </>
  )
}
