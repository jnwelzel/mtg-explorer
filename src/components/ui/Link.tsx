import { NavLink, type NavLinkProps } from 'react-router'

type LinkVariant = 'primary' | 'secondary' | 'nav' | 'unstyled'

interface LinkProps extends NavLinkProps {
  to: string
  children?: React.ReactNode
  onClick?: () => void
  variant?: LinkVariant
  className?: string
  title?: string
  shouldUnderlineActive?: boolean
}

const VARIANT_BASE_CLASSES: Record<LinkVariant, string> = {
  primary: 'text-blue-500 hover:underline',
  secondary: 'text-black hover:underline',
  nav: 'text-white hover:underline',
  unstyled: 'text-inherit hover:underline',
}

const VARIANT_ACTIVE_CLASSES: Record<LinkVariant, string> = {
  primary: 'text-blue-500 underline',
  secondary: 'text-black underline',
  nav: 'text-purple-300 underline',
  unstyled: 'text-inherit underline',
}

export const Link: React.FC<LinkProps> = ({
  to,
  children,
  onClick,
  variant = 'primary',
  className,
  title,
  shouldUnderlineActive = true,
  ...rest
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        (isActive && shouldUnderlineActive
          ? VARIANT_ACTIVE_CLASSES[variant]
          : VARIANT_BASE_CLASSES[variant]) + (className ? ` ${className}` : '')
      }
      onClick={onClick}
      title={title}
      {...rest}>
      {children}
    </NavLink>
  )
}
