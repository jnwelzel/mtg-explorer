import { useSearch } from '../../../hooks'
import { CardsList } from './CardsList'

interface CardsListContainerProps {
  onClearSearchCallback?: () => void
  hideClearSearch?: boolean
}

export const CardsListContainer: React.FC<CardsListContainerProps> = ({
  onClearSearchCallback,
  hideClearSearch = false,
}) => {
  const {
    cards,
    isLoading,
    isLoadingMore,
    totalCount,
    hasMoreResults,
    onLoadMore,
    query,
    zoomLevel,
    onResultsPerPageClick,
    isMaxZoom,
    isMinZoom,
    sortOption,
    mapToSortingOption,
    sortingOptions,
    onClearSearch,
  } = useSearch({
    onClearSearchCallback,
  })

  return (
    <CardsList
      cards={cards}
      isLoading={isLoading}
      zoomLevel={zoomLevel}
      totalCount={totalCount}
      onLoadMore={onLoadMore}
      isLoadingMore={isLoadingMore || isLoading}
      hasMoreResults={hasMoreResults ?? false}
      query={query}
      onZoomInClick={() => onResultsPerPageClick('zoomIn')}
      onZoomOutClick={() => onResultsPerPageClick('zoomOut')}
      isMaxZoom={isMaxZoom}
      isMinZoom={isMinZoom}
      sortOption={sortOption}
      mapToSortingOption={mapToSortingOption}
      sortingOptions={sortingOptions}
      onClearSearch={hideClearSearch ? undefined : onClearSearch}
    />
  )
}
