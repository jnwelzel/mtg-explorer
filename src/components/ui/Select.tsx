interface SelectProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
  name: string
  className?: string
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  icon,
  name,
  className,
}) => {
  return (
    <div className={`relative flex items-center${className ? ` ${className}` : ''}`}>
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
          {icon}
        </span>
      )}
      <select
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`border border-gray-300 rounded-md h-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          icon ? 'pl-8' : ''
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
