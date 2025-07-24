import React, { type ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  isLoading?: boolean
  variant?: 'default' | 'link' | 'unstyled' | 'primary'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  isLoading = false,
  variant = 'default',
  type = 'button',
  ...props
}) => {
  const baseClasses =
    'flex items-center justify-center rounded cursor-pointer whitespace-nowrap transition-colors h-10 px-4'
  const buttonClasses = {
    default: `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`,
    link: `${baseClasses} text-blue-600 hover:underline h-auto`,
    unstyled: '',
    primary: `${baseClasses} bg-black text-white hover:bg-stone-800`,
  }

  return (
    <button
      type={type}
      className={`${buttonClasses[variant]} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
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
