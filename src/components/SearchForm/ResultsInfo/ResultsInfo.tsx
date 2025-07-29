import { Button } from '../../ui'

import zoomInIcon from '../../../assets/zoomIn.svg'
import zoomOutIcon from '../../../assets/zoomOut.svg'

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
        <div className="w-full mt-3 flex flex-nowrap items-center">
          <p className="text-gray-500 text-sm">
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
          <span className="flex gap-2 items-center ml-2">
            <Button
              disabled={isMaxZoom}
              onClick={onZoomInClick}
              isCircle
              size="small"
              variant="secondary">
              <img src={zoomInIcon} alt="Show more results per page" className="w-5 h-5" />
            </Button>
            <Button
              disabled={isMinZoom}
              onClick={onZoomOutClick}
              isCircle
              size="small"
              variant="secondary">
              <img src={zoomOutIcon} alt="Show fewer results per page" className="w-5 h-5" />
            </Button>
          </span>
        </div>
      ) : null}
    </>
  )
}
