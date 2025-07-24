import React, { type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  ref?: React.Ref<HTMLInputElement>
}

const Input: React.FC<InputProps> = ({ className = '', ref, ...props }) => (
  <input
    ref={ref}
    type="text"
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
)

export { Input }
