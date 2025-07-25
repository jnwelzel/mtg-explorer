import { Button } from '../../ui'

interface ResultsInfoProps {
  query?: string
  totalCount: number
  onClearSearch: () => void
  isLoading?: boolean
}

export const ResultsInfo: React.FC<ResultsInfoProps> = ({
  query,
  totalCount,
  onClearSearch,
  isLoading,
}) => {
  return (
    <>
      {isLoading ? <p>Loading...</p> : null}
      {totalCount > 0 && !isLoading ? (
        <p className="text-gray-500 text-sm mt-3">
          Search for '{query}' returned {totalCount} result
          {totalCount > 1 ? 's ' : ' '}•{' '}
          <Button onClick={onClearSearch} type="button" variant="link" className="inline">
            clear results
          </Button>
        </p>
      ) : null}
    </>
  )
}
