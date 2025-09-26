import { Link } from 'react-router'
import type { Set } from 'scryfall-api'
import { routesPath } from '../../routes'
import { useSets } from '../../hooks'
import { Button } from './Button'

interface SetsTableProps {
  setsData: Set[]
}

export const SetsTable: React.FC<SetsTableProps> = ({ setsData }) => {
  const { pages, currentPage, setCurrentPage, pageSize, setPageSize } = useSets(setsData)
  console.log({ pages, currentPage, pageSize })

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex flex-nowrap items-baseline">
        <p className="text-gray-500 text-sm">{`Showing ${currentPage * pageSize - pageSize + 1}-${Math.min(
          currentPage * pageSize,
          setsData.length
        )} of ${setsData.length} result${setsData.length === 1 ? '' : 's'}`}</p>
        <div className="flex ml-auto items-center gap-2">
          <span className="text-gray-500 text-sm">Items per page</span>
          <select
            name="pageSize"
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value) as 10 | 20 | 50 | 100)}
            className="border border-gray-300 rounded-md p-1">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 border-b border-gray-200 text-left">
            <tr>
              <th className="p-2 border-r border-gray-200">Name</th>
              <th className="p-2 border-r border-gray-200">Cards</th>
              <th className="p-2 border-r border-gray-200">Date</th>
              <th className="p-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {pages[currentPage - 1]?.map(set => (
              <tr key={set.id} className="even:bg-white odd:bg-gray-50">
                <td className="p-2 border-r border-gray-200">
                  <Link
                    to={`${routesPath.setView(set.code)}?q=s:${set.code}`}
                    className="flex items-center gap-2">
                    <img src={set.icon_svg_uri} alt={`${set.name} icon`} className="w-5 h-5 mr-1" />
                    {set.name} <small className="text-gray-400">{set.code.toUpperCase()}</small>
                  </Link>
                </td>
                <td className="p-2 border-r border-gray-200">{set.card_count ?? 'N/A'}</td>
                <td className="p-2 border-r border-gray-200">
                  {set?.released_at?.toLocaleDateString() ?? 'Unknown'}
                </td>
                <td className="p-2">{set.set_type}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-100 border-t border-gray-200">
            <tr>
              <td className="p-2" colSpan={4}>
                <div className="flex gap-2 justify-center items-center">
                  <Button
                    size="small"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}>
                    First
                  </Button>
                  <Button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    size="small">
                    Previous
                  </Button>
                  <span className="text-sm text-gray-500">
                    {currentPage} / {Object.keys(pages).length}
                  </span>
                  <Button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === Object.keys(pages).length}
                    size="small">
                    Next
                  </Button>
                  <Button
                    onClick={() => setCurrentPage(Object.keys(pages).length)}
                    disabled={currentPage === Object.keys(pages).length}
                    size="small">
                    Last
                  </Button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
