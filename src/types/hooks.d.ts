import type { ZoomTypes } from "./magicCard"

export type UseZoomLevelResult = {
  zoomLevel: ZoomLevel
  onResultsPerPageClick: (type: ZoomTypes) => void
  isMaxZoom: boolean
  isMinZoom: boolean
}