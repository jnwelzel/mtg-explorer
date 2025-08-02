import { useSearch } from '../../../hooks'
import type { UseSearchParams } from '../../../types'
import { CardsList } from './CardsList'

export const CardsListContainer: React.FC<UseSearchParams> = () => {
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
  } = useSearch()

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
    />
  )
}
