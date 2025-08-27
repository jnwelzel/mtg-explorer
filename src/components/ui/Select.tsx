import type { SelectHTMLAttributes } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string }[]
  value: string
  onChangeHandler: (value: string) => void
  icon?: React.ReactNode
  name: string
  className?: string
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChangeHandler,
  icon,
  name,
  className,
  ...rest
}) => {
  return (
    <div className={`relative flex items-center${className ? ` ${className}` : ''}`}>
      {icon && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
          {icon}
        </span>
      )}
      <select
        {...rest}
        name={name}
        value={value}
        onChange={e => onChangeHandler(e.target.value)}
        className={`border border-gray-300 rounded-md h-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          icon ? 'pl-6' : 'pl-1'
        }`}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
