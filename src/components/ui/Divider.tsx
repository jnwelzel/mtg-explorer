interface DividerProps {
  className?: string
}

export const Divider: React.FC<DividerProps> = ({ className }) => {
  return (
    <hr
      className={`my-3 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent dark:via-neutral-400 via-neutral-500 to-transparent${className ? ` ${className}` : ''}`}
    />
  )
}
