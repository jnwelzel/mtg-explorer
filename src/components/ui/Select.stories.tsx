import { useState } from 'react'
import { Select } from './Select'
import { FaMagic } from 'react-icons/fa'

export default {
  title: 'Components/UI/Select',
  component: Select,
}

const options = [
  { value: 'usd', label: 'USD' },
  { value: 'eur', label: 'EUR' },
  { value: 'tix', label: 'TIX' },
]

export const Default = () => {
  const [value, setValue] = useState('usd')
  return (
    <div className="grid grid-cols-1 md:grid-cols-6">
      <Select options={options} value={value} onChangeHandler={setValue} name="currency" />
    </div>
  )
}

export const WithIcon = () => {
  const [value, setValue] = useState('usd')
  return (
    <div className="grid grid-cols-1 md:grid-cols-6">
      <Select
        options={options}
        value={value}
        onChangeHandler={setValue}
        name="currency"
        icon={<FaMagic />}
      />
    </div>
  )
}
