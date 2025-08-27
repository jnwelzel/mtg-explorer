import { BiSort } from 'react-icons/bi'
import { Button, Input, Select } from '../../../ui'
import type { SortingDirection, SortingOrder } from '../../../../types/search'
import { useAdvancedSearchForm } from './useAdvancedSearchForm'

interface AdvancedSearchFormProps {
  onSubmit: () => void
  onCancel: () => void
}

export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({ onSubmit, onCancel }) => {
  const { formState, handleSubmit, setFormState } = useAdvancedSearchForm({ onSubmit })

  return (
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

      <Button variant="secondary" className="col-start-7 col-span-3" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" className="col-start-10 col-span-3">
        Search
      </Button>
    </form>
  )
}
