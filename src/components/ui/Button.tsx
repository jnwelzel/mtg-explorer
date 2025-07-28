import React, { type ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  isLoading?: boolean
  variant?: 'default' | 'link' | 'unstyled' | 'primary' | 'secondary'
  isCircle?: boolean
  size?: 'small' | 'medium' | 'large'
  underline?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  isLoading = false,
  variant = 'default',
  type = 'button',
  isCircle = false,
  size = 'medium',
  underline = false,
  ...props
}) => {
  const heightClasses = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-12',
  }
  const widthClasses = {
    small: 'w-8',
    medium: 'w-10',
    large: 'w-12',
  }
  const baseClasses = `flex items-center justify-center cursor-pointer whitespace-nowrap transition-colors${isCircle ? ' rounded-full' : ' rounded'}${variant !== 'link' && !isCircle ? ' px-4' : ''}${' ' + heightClasses[size]}${isCircle ? ' ' + widthClasses[size] : ''}${underline ? ' underline' : ''}`
  const buttonClasses = {
    default: `${baseClasses} bg-blue-600 text-white ${props.disabled ? '' : 'hover:bg-blue-700'}`,
    link: `${baseClasses} text-blue-600 h-auto${props.disabled ? '' : ' hover:underline'}`,
    unstyled: '',
    primary: `${baseClasses} bg-black text-white ${props.disabled ? '' : 'hover:bg-stone-800'}`,
    secondary: `${baseClasses} bg-gray-200 text-gray-800 ${props.disabled ? '' : 'hover:bg-gray-300'}`,
  }

  return (
    <button
      type={type}
      className={`${buttonClasses[variant]} ${isLoading || props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
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
