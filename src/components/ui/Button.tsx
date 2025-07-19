import React, { type ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  isLoading?: boolean
  variant?: 'default' | 'link'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  isLoading = false,
  variant = 'default',
  ...props
}) => {
  const buttonClasses = {
    default: 'px-4 bg-blue-600 hover:bg-blue-700 text-white h-10',
    link: 'text-blue-600 hover:underline h-auto',
  }
  return (
    <button
      className={`flex items-center justify-center rounded cursor-pointer ${buttonClasses[variant]} transition 
      ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}>
      {isLoading ? (
        <span className="animate-spin mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
      ) : (
        children
      )}
    </button>
  )
}
