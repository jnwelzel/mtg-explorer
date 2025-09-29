import React, { type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  ref?: React.Ref<HTMLInputElement>
}

const Input: React.FC<InputProps> = ({ className = '', ref, ...props }) => (
  <input
    ref={ref}
    className={`w-full border-gray-300 p-2 h-10 flex items-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500${className ? ` ${className}` : ''}`}
    {...props}
  />
)

export { Input }
