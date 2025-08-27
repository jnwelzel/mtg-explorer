import type { ModalBaseProps } from '../../../types/modal'
import { Modal } from '../../ui'
import { AdvancedSearchForm } from './AdvancedSearchForm'

export const AdvancedSearchModal: React.FC<ModalBaseProps> = ({ ...modalProps }) => {
  return (
    <Modal title="Advanced Search" {...modalProps}>
      <AdvancedSearchForm onSubmit={modalProps.onClose} onCancel={modalProps.onClose} />
    </Modal>
  )
}
