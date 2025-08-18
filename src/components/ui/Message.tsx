interface MessageProps {
  text: string
  className?: string
  variant?: 'error' | 'info' | 'success'
}

const textColors = {
  error: 'text-error',
  info: 'text-info',
  success: 'text-success',
}

const borderColors = {
  error: 'border-error/30',
  info: 'border-info/30',
  success: 'border-success/30',
}

const bgColors = {
  error: 'bg-error/10',
  info: 'bg-info/10',
  success: 'bg-success/10',
}

export const Message: React.FC<MessageProps> = ({ text, className, variant = 'info' }) => {
  return (
    <p
      className={`text-sm/4 ${className} ${textColors[variant]} border rounded px-2 py-1 ${bgColors[variant]} ${borderColors[variant]}`}>
      {text}
    </p>
  )
}
