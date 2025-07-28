import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

type BreadcrumbItem = {
  name: string
  path: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> = props => {
  const { items, className = '' } = props

  return (
    <ol
      className={`py-2 inline-flex flex-nowrap list-none items-center${className ? ` ${className}` : ''}`}>
      <li>
        <a href="/" aria-label="Home" title="Home">
          <HomeIcon className="size-5 text-neutral-500 hover:text-neutral-600" />
        </a>
      </li>
      {items.map(item => (
        <li className="text-sm ml-2 md:ml-3 flex items-center" key={item.path}>
          <ChevronRightIcon className="size-5 text-neutral-500 mr-2 md:mr-3" />
          <a href={`${item.path}`} className="text-neutral-500 hover:text-neutral-600 line-clamp-1">
            {item.name}
          </a>
        </li>
      ))}
    </ol>
  )
}
