import { useSearchParams } from 'react-router'
import { encodeParams, getParams } from '../../utils'
import { Button } from './Button'
import { Input } from './Input'
import { Modal } from './Modal'
import { useState } from 'react'
import type { ScryfallSearchParams, SortingDirection, SortingOrder } from '../../types/search'
import { Select } from './Select'
import { BiSort } from 'react-icons/bi'

interface AdvancedSearchModalProps {
  onClose: () => void
  ref: React.RefObject<HTMLDialogElement | null>
  onSubmit?: () => void
}

interface FormState {
  cardName: string
  oracleText: string
  cardType: string
  set: string
  order: SortingOrder
  direction: SortingDirection
}

export const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  onClose,
  ref,
  onSubmit,
}) => {
  const [urlParams, setSearchParams] = useSearchParams()
  const paramValues = getParams(urlParams)
  const [formState, setFormState] = useState<FormState>({
    cardName: paramValues?.cardName?.join(' ') ?? '',
    oracleText: paramValues?.o?.join(' ') ?? '',
    cardType: paramValues?.t?.join(' ') ?? '',
    set: paramValues?.e ?? '',
    order: paramValues?.order ?? 'name',
    direction: paramValues?.direction ?? 'ascending',
  })
  const handleSubmit = () => {
    const scryfallParams: ScryfallSearchParams = {
      cardName: formState.cardName ? formState.cardName.trim().split(' ') : null,
      o: formState.oracleText ? formState.oracleText.trim().split(' ') : null,
      t: formState.cardType ? formState.cardType.trim().split(' ') : null,
      e: formState.set.trim() || null,
      order: formState.order,
      direction: formState.direction,
      q: null,
    }
    setSearchParams(encodeParams(scryfallParams))
    onClose()
    if (onSubmit) {
      onSubmit()
    }
  }

  return (
    <Modal title="Advanced Search" onClose={onClose} ref={ref}>
      <form className="grid grid-cols-12 gap-3" action={handleSubmit}>
        <label className="col-span-3 self-center leading-5" htmlFor="cardName">
          Card Name
        </label>
        <Input
          name="cardName"
          id="cardName"
          className="col-span-9"
          value={formState.cardName}
          onChange={e => setFormState({ ...formState, cardName: e.target.value })}
        />

        <label className="col-span-3 self-center leading-5" htmlFor="set">
          Set / Expansion
        </label>
        <Input
          name="set"
          id="set"
          className="col-span-9"
          value={formState.set}
          onChange={e => setFormState({ ...formState, set: e.target.value })}
        />

        <label className="col-span-3 self-center leading-5" htmlFor="oracleText">
          Oracle Text
        </label>
        <Input
          name="oracleText"
          id="oracleText"
          className="col-span-9"
          value={formState.oracleText}
          onChange={e => setFormState({ ...formState, oracleText: e.target.value })}
        />

        <label className="col-span-3 self-center leading-5" htmlFor="cardType">
          Card Type
        </label>
        <Input
          name="cardType"
          id="cardType"
          className="col-span-9"
          value={formState.cardType}
          onChange={e => setFormState({ ...formState, cardType: e.target.value })}
        />

        <label className="col-span-3 self-center" htmlFor="order">
          Order
        </label>
        <Select
          className="col-span-9"
          options={[
            { value: 'name', label: 'Name' },
            { value: 'price', label: 'Price' },
            { value: 'cmc', label: 'Mana Cost' },
            { value: 'set', label: 'Set' },
            { value: 'rarity', label: 'Rarity' },
            { value: 'color', label: 'Color' },
          ]}
          value={formState.order}
          name="order"
          id="order"
          onChangeHandler={value => setFormState({ ...formState, order: value as SortingOrder })}
          icon={<BiSort />}
        />

        <label className="col-span-3 self-center" htmlFor="direction">
          Direction
        </label>
        <Select
          className="col-span-9"
          options={[
            { value: 'ascending', label: 'Ascending' },
            { value: 'descending', label: 'Descending' },
          ]}
          value={formState.direction}
          name="direction"
          id="direction"
          onChangeHandler={value =>
            setFormState({ ...formState, direction: value as SortingDirection })
          }
        />

        <hr className="col-span-full text-gray-300" />

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
