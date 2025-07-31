import { Button, Select } from '../../ui'

import zoomInIcon from '../../../assets/zoomIn.svg'
import zoomOutIcon from '../../../assets/zoomOut.svg'
import { BiSort } from 'react-icons/bi'

interface ResultsInfoProps {
  query?: string
  totalCount: number
  onClearSearch?: () => void
  isLoading?: boolean
  onZoomInClick: () => void
  onZoomOutClick: () => void
  isMaxZoom: boolean
  isMinZoom: boolean
}

export const ResultsInfo: React.FC<ResultsInfoProps> = ({
  query,
  totalCount,
  onClearSearch,
  isLoading,
  onZoomInClick,
  onZoomOutClick,
  isMaxZoom,
  isMinZoom,
}) => {
  return (
    <>
      {isLoading ? <p className="skeleton-animation w-full rounded-sm md:w-1/2 h-5 mt-3" /> : null}
      {totalCount > 0 && !isLoading ? (
        <div className="w-full mt-3 flex flex-nowrap flex-col gap-2 md:flex-row md:items-center">
          <p className="text-gray-500 text-sm text-left">
            Search for '{query}' returned {totalCount} result
            {totalCount > 1 ? 's ' : ' '}
            {onClearSearch ? (
              <>
                •{' '}
                <Button onClick={onClearSearch} type="button" variant="link" className="inline">
                  clear results
                </Button>
              </>
            ) : null}
          </p>
          <span className="flex gap-2 items-center md:ml-auto">
            <Button disabled={isMaxZoom} onClick={onZoomInClick} isCircle variant="secondary">
              <img src={zoomInIcon} alt="Show more results per page" className="w-6 h-6" />
            </Button>
            <Button disabled={isMinZoom} onClick={onZoomOutClick} isCircle variant="secondary">
              <img src={zoomOutIcon} alt="Show fewer results per page" className="w-6 h-6" />
            </Button>
            <Select
              options={[
                { value: 'name+asc', label: 'Name (A → Z)' },
                { value: 'name+desc', label: 'Name (Z → A)' },
                { value: 'price+asc', label: 'Price (Low → High)' },
                { value: 'price+desc', label: 'Price (High → Low)' },
                { value: 'cmc+asc', label: 'CMC (Low → High)' },
                { value: 'cmc+desc', label: 'CMC (High → Low)' },
                { value: 'type+asc', label: 'Type (A → Z)' },
                { value: 'type+desc', label: 'Type (Z → A)' },
              ]}
              value="name+asc"
              name="sort"
              onChange={value => console.log(value)}
              icon={<BiSort />}
            />
          </span>
        </div>
      ) : null}
    </>
  )
}
