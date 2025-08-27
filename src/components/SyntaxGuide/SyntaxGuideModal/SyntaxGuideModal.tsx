import type { ModalBaseProps } from '../../../types/modal'
import { Modal } from '../../ui'

export const SyntaxGuideModal: React.FC<ModalBaseProps> = ({ ...modalProps }) => {
  return (
    <Modal title="Syntax Guide" {...modalProps}>
      <p>Here you can find information about the syntax used in the search.</p>
    </Modal>
  )
}
