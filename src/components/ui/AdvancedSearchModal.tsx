import { Button } from './Button'
import { Input } from './Input'
import { Modal } from './Modal'

interface AdvancedSearchModalProps {
  onClose: () => void
  ref: React.RefObject<HTMLDialogElement | null>
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  onClose,
  ref,
  onSubmit,
}) => {
  return (
    <Modal title="Advanced Search" onClose={onClose} ref={ref}>
      <form className="grid grid-cols-12 gap-3" onSubmit={onSubmit}>
        <label className="col-span-3 self-center">Card Name</label>
        <Input name="cardName" className="col-span-9" />
        <label className="col-span-3 self-center">Set/Expansion</label>
        <Input name="setName" className="col-span-9" />
        <label className="col-span-3 self-center">Oracle Text</label>
        <Input name="oracleText" className="col-span-9" />
        <label className="col-span-3 self-center">Card Type</label>
        <Input name="cardType" className="col-span-9" />
        <Button variant="secondary" className="col-start-7 col-span-3" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="col-start-10 col-span-3">
          Search
        </Button>
      </form>
    </Modal>
  )
}
