import { Modal } from '../../ui'
import { AdvancedSearchForm } from './AdvancedSearchForm'

interface AdvancedSearchModalProps {
  onClose: () => void
  ref: React.RefObject<HTMLDialogElement | null>
}

export const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({ onClose, ref }) => {
  return (
    <Modal title="Advanced Search" onClose={onClose} ref={ref}>
      <AdvancedSearchForm onSubmit={onClose} onCancel={onClose} />
    </Modal>
  )
}
