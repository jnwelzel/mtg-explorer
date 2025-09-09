import { useState } from 'react'
import { Button } from './Button'
import { RxTriangleDown } from 'react-icons/rx'
import { RiExternalLinkLine } from 'react-icons/ri'
import { useClickAway } from '@uidotdev/usehooks'

interface DropdownProps {
  label: string
  items: DropdownItem[]
  className?: string
}

type DropdownItem = {
  label: string
  href: string
}

export const Dropdown: React.FC<DropdownProps> = ({ label, items, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickAway<HTMLUListElement>(() => {
    setIsOpen(false)
  })

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="secondary"
        size="medium"
        onClick={() => setIsOpen(prev => !prev)}
        isActive={isOpen}
        className="flex items-center">
        {label}
        {isOpen ? (
          <RxTriangleDown className="w-4 h-4 ml-1 transform rotate-180" />
        ) : (
          <RxTriangleDown className="w-4 h-4 ml-1" />
        )}
      </Button>
      {isOpen && (
        <ul
          className="absolute z-10 mt-0.5 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden"
          ref={ref}>
          {items.map(item => (
            <li key={item.label}>
              <a
                className="px-4 py-2 text-gray-700 bg-white hover:bg-gray-100 flex items-center"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer">
                {item.label}
                <RiExternalLinkLine className="ml-1 w-4 h-4 text-gray-500" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
