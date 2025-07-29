import { useLocalStorage, useWindowSize } from '@uidotdev/usehooks'
import { type ZoomLevel, type ZoomTypes } from '../types'

type UseZoomLevelResult = {
  zoomLevel: ZoomLevel
  onResultsPerPageClick: (type: ZoomTypes) => void
  isMaxZoom: boolean
  isMinZoom: boolean
}

const MEDIUM_SCREEN_WIDTH = 768 // Width at which zoom level is considered minimum
const LARGE_SCREEN_WIDTH = 1024 // Width at which zoom level is considered minimum
const BASE_ZOOM_LEVEL = '1' as ZoomLevel // Default zoom level
const MAX_ZOOM_LEVEL = '2' as ZoomLevel // Limit zoom level to a maximum of 2
const MIN_ZOOM_LEVEL = '0' as ZoomLevel // Limit zoom level to a minimum of 0
const ZOOM_STEP = 0.25 // Step size for zooming in and out

export const useZoomLevel = (): UseZoomLevelResult => {
  const [zoomLevel, setZoomLevel] = useLocalStorage<ZoomLevel>('zoomLevel', BASE_ZOOM_LEVEL)
  const { width } = useWindowSize()
  const isMaxedOutInSmallScreen = (width ?? 0) < MEDIUM_SCREEN_WIDTH && zoomLevel === '1'
  const isMaxedOutInMediumScreen =
    (width ?? 0) > MEDIUM_SCREEN_WIDTH && (width ?? 0) < LARGE_SCREEN_WIDTH && zoomLevel === '1.75'
  const isMaxZoom =
    Number(zoomLevel) >= Number(MAX_ZOOM_LEVEL) ||
    isMaxedOutInSmallScreen ||
    isMaxedOutInMediumScreen
  const isMinZoom = Number(zoomLevel) <= Number(MIN_ZOOM_LEVEL)

  // Function to handle zoom in and zoom out
  const onResultsPerPageClick = (type: ZoomTypes) => {
    // We can go any one way 4x
    if (type === 'zoomIn') {
      setZoomLevel(
        prev => Math.min(Number(prev) + ZOOM_STEP, Number(MAX_ZOOM_LEVEL)).toString() as ZoomLevel
      )
    } else {
      setZoomLevel(
        prev => Math.max(Number(prev) - ZOOM_STEP, Number(MIN_ZOOM_LEVEL)).toString() as ZoomLevel
      )
    }
  }

  return {
    zoomLevel,
    onResultsPerPageClick,
    isMaxZoom,
    isMinZoom,
  }
}
