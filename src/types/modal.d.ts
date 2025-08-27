export type ModalBaseProps = {
  onClose: () => void
  ref: React.Ref<HTMLDialogElement>
}

export type ModalProps =  {
  title: string
  children: React.ReactNode
} & ModalBaseProps
