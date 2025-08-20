export interface ModalProps {
  onClose: () => void
  title: string
  children: React.ReactNode
  ref: React.Ref<HTMLDialogElement>
}