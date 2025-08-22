import React, { type ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  isLoading?: boolean
  variant?: 'default' | 'link' | 'unstyled' | 'primary' | 'secondary'
  isCircle?: boolean
  size?: 'small' | 'medium' | 'large'
  underline?: boolean
  isActive?: boolean
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
  isActive = false,
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
  const textClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  }
  const baseClasses = `flex items-center justify-center${isLoading || props.disabled ? ' opacity-50 cursor-not-allowed' : ' cursor-pointer'} whitespace-nowrap duration-200 transition-colors transition-bg${isCircle ? ' rounded-full' : ' rounded'}${variant !== 'link' && !isCircle ? ' px-4' : ''}${' ' + heightClasses[size]}${isCircle ? ' ' + widthClasses[size] : ''}${underline ? ' underline' : ''} ${textClasses[size]}`
  const buttonClasses = {
    default: `${baseClasses} bg-blue-600 text-white${props.disabled ? '' : ' hover:bg-blue-700'}`,
    link: `${baseClasses} text-blue-600 h-auto${props.disabled ? '' : ' hover:underline'}`,
    unstyled: '',
    primary: `${baseClasses} bg-black text-white${props.disabled ? '' : ' hover:bg-stone-800'}`,
    secondary: `${baseClasses} border-gray-300 border ${isActive ? 'bg-gray-100' : 'bg-white'} text-gray-800${props.disabled ? '' : ' hover:bg-gray-100'}`,
  }

  return (
    <button
      type={type}
      className={`${buttonClasses[variant]} ${isLoading || props.disabled ? 'opacity-50 cursor-not-allowed' : ''}${className ? ' ' + className : ''}`}
      disabled={isLoading || props.disabled}
      {...props}>
      {isLoading ? (
        <>
          <span className="animate-spin mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  )
}
