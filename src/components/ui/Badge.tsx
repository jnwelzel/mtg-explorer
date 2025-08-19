type BadgeVariants = 'default' | 'info' | 'success' | 'warning' | 'error'

const badgeVariants: Record<BadgeVariants, string> = {
  default: 'bg-stone-700 text-gray-300',
  info: 'bg-blue-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-white',
  error: 'bg-red-500 text-white',
}

export const Badge: React.FC<{
  text: string
  title?: string
  variant?: BadgeVariants
}> = ({ text, title, variant = 'default' }) => {
  return (
    <span
      className={`${badgeVariants[variant]} font-semibold text-[8px] px-1 py-0.5 rounded`}
      title={title}>
      {text.toUpperCase()}
    </span>
  )
}
