import * as Ariakit from '@ariakit/react'

interface ComboboxProps {
  label?: string
  placeholder?: string
  options: { value: string; label: string }[]
  onItemClick: (value: string) => void
  name?: string
  onChange?: (value: string) => void
}

export const Combobox: React.FC<ComboboxProps> = ({
  label,
  options,
  placeholder,
  onItemClick,
  name,
  onChange,
}) => {
  return (
    <Ariakit.ComboboxProvider>
      {label ? <Ariakit.ComboboxLabel className="label">{label}</Ariakit.ComboboxLabel> : null}
      <Ariakit.Combobox
        name={name}
        onChange={onChange ? event => onChange(event.target.value) : undefined}
        type="search"
        inputMode="search"
        placeholder={placeholder}
        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-md p-2 h-10 flex items-center"
      />
      <Ariakit.ComboboxPopover
        gutter={3}
        sameWidth
        className="z-20 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto overscroll-contain">
        {options.map(option => (
          <Ariakit.ComboboxItem
            key={option.value}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer data-active-item:bg-gray-100"
            value={option.value}
            onClick={() => onItemClick(option.value)}>
            {option.label}
          </Ariakit.ComboboxItem>
        ))}
      </Ariakit.ComboboxPopover>
    </Ariakit.ComboboxProvider>
  )
}
