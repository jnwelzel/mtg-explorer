import { BiSort } from 'react-icons/bi'
import { Button, Input, Select } from '../../../ui'
import { useAdvancedSearchForm } from './useAdvancedSearchForm'
import { COLORS } from '../../../../utils/card'
import type { SortingDirection, SortingOrder } from '../../../../types/search'

interface AdvancedSearchFormProps {
  onSubmit: () => void
  onCancel: () => void
}

export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({ onSubmit, onCancel }) => {
  const { formState, handleSubmit, setFormState, shouldDisableColorInput } = useAdvancedSearchForm({
    onSubmit,
  })

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

      <span aria-label="Colors" className="col-span-3 self-center leading-5">
        Colors
      </span>
      <div className="col-span-9 flex flex-col">
        <div className="flex gap-2">
          {Object.entries(COLORS).map(([value, label]) => {
            const isInputDisabled = shouldDisableColorInput(value)

            return (
              <div key={value} className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  disabled={isInputDisabled}
                  checked={formState.colors.split('').includes(value)}
                  name={`color-${value}`}
                  id={`color-${value}`}
                  onChange={e => {
                    const checked = e.target.checked
                    setFormState({
                      ...formState,
                      colors: checked
                        ? formState.colors + value
                        : formState.colors.replace(value, ''),
                    })
                  }}
                />
                <label aria-label={label} className="flex items-center" htmlFor={`color-${value}`}>
                  <i
                    role="img"
                    title={label}
                    className={`ms ms-shadow ms-cost ms-${value}${isInputDisabled ? ' opacity-50' : ''}`}
                  />
                </label>
              </div>
            )
          })}
        </div>
        <Select
          name="colorComparison"
          onChangeHandler={value => setFormState({ ...formState, colorComparison: value })}
          value={formState.colorComparison}
          options={[
            { value: 'c:', label: 'Must have all selected' },
            { value: 'c=', label: 'Exactly these colors' },
            { value: 'c<=', label: 'Any of the selected' },
          ]}
        />
      </div>

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
