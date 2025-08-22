import type { ModalProps } from '../../types'
import { Button } from './Button'
import { AiOutlineClose } from 'react-icons/ai'

export const Modal: React.FC<ModalProps> = ({ onClose, title, children, ref }) => {
  return (
    <>
      <aside className="fixed inset-0 bg-black opacity-50 z-40" aria-hidden="true" />
      <dialog
        ref={ref}
        className="flex flex-col rounded-lg border border-gray-300 shadow-lg fixed inset-0 m-auto md:w-full md:max-w-lg w-[90%] max-h-[90%] bg-white z-50">
        <div className="flex items-center sticky top-0 bg-white shadow-sm p-3 rounded-t-lg">
          <h2 className="md:text-lg font-bold truncate" title={title}>
            {title}
          </h2>
          <Button
            variant="unstyled"
            className="ml-auto cursor-pointer"
            onClick={onClose}
            aria-label="Close modal">
            <AiOutlineClose className="md:w-6 md:h-6 h-4 w-4" />
          </Button>
        </div>
        <div className="p-3 overflow-auto">{children}</div>
      </dialog>
    </>
  )
}
