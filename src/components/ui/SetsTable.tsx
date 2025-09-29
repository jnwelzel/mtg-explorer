import { Link } from 'react-router'
import type { Set } from 'scryfall-api'
import { routesPath } from '../../routes'
import { useSets } from '../../hooks'
import { Button } from './Button'
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'

interface SetsTableProps {
  setsData: Set[]
}

export const SetsTable: React.FC<SetsTableProps> = ({ setsData }) => {
  const { pages, currentPage, setCurrentPage, pageSize, setPageSize } = useSets(setsData)

  return (
    <>
      <div className="w-full flex items-center mb-2">
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
      <div className="overflow-x-auto rounded-lg relative border border-gray-200 mb-2">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200 text-left">
            <tr>
              <th className="p-2 whitespace-nowrap">Name</th>
              <th className="p-2 whitespace-nowrap">Cards</th>
              <th className="p-2 whitespace-nowrap">Date</th>
              <th className="p-2 whitespace-nowrap">Type</th>
            </tr>
          </thead>
          <tbody>
            {pages[currentPage - 1]?.map(set => (
              <tr key={set.id} className="even:bg-white odd:bg-gray-50">
                <td className="p-2 whitespace-nowrap">
                  <Link
                    to={`${routesPath.setView(set.code)}?q=s:${set.code}`}
                    className="flex items-center gap-2">
                    <img src={set.icon_svg_uri} alt={`${set.name} icon`} className="w-5 h-5 mr-1" />
                    <span className="max-w-[290px] truncate">{set.name}</span>
                    <small className="text-gray-400">{set.code.toUpperCase()}</small>
                  </Link>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <Link
                    to={`${routesPath.setView(set.code)}?q=s:${set.code}`}
                    className="flex items-center">
                    {set.card_count ?? 'N/A'}
                  </Link>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <Link
                    to={`${routesPath.setView(set.code)}?q=s:${set.code}`}
                    className="flex items-center">
                    {set?.released_at?.toLocaleDateString() ?? 'Unknown'}
                  </Link>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <Link
                    to={`${routesPath.setView(set.code)}?q=s:${set.code}`}
                    className="flex items-center">
                    {set.set_type}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-2 whitespace-nowrap">
        <div className="flex gap-3 justify-center items-center">
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            isCircle>
            <RxDoubleArrowLeft className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            isCircle
            variant="secondary">
            <SlArrowLeft className="w-3 h-3" />
          </Button>
          <span className="text-sm text-gray-500">
            {currentPage} / {Object.keys(pages).length}
          </span>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Object.keys(pages).length}
            isCircle
            variant="secondary">
            <SlArrowRight className="w-3 h-3" />
          </Button>
          <Button
            onClick={() => setCurrentPage(Object.keys(pages).length)}
            disabled={currentPage === Object.keys(pages).length}
            isCircle
            variant="secondary">
            <RxDoubleArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  )
}
