import create from 'zustand';
import utils from '../components/fields/bitmap/utils';

const useDrawingStore = create(set => ({
  completedPaths: [],
  setCompletedPaths: newPaths => set(() => ({completedPaths: newPaths})),
  svgData: {paths: [], rectangles: [], ellipses: [], lines: [], polygons: []},
  setSVGData: newData => set(() => ({svgData: newData})),
  allPaths: [],
  setAllPaths: newPaths => set(() => ({allPaths: newPaths})),
  stroke: utils.getPaint(3, 'red'),
  setStroke: newStroke => set(() => ({stroke: newStroke})),
  strokeWidth: 1,
  setStrokeWidth: newStrokeWidth => set(() => ({strokeWidth: newStrokeWidth})),
  color: 'red',
  setColor: newColor => set(() => ({color: newColor})),
  canvasInfo: null,
  setCanvasInfo: newCanvasInfo => set(() => ({canvasInfo: newCanvasInfo})),
  visibleBitmapDrawingDlg: false,
  setVisibleBitmapDrawingDlg: newValue =>
    set(() => ({visibleBitmapDrawingDlg: newValue})),
  visibleRegionDrawingDlg: false,
  setVisibleRegionDrawingDlg: newValue =>
    set(() => ({visibleRegionDrawingDlg: newValue})),
  bitmapImageData: {},
  setBitmapImageData: data => set(() => ({bitmapImageData: data})),
  visibleDlg: {},
  setVisibleDlg: newValue => set(() => ({visibleDlg: newValue})),
  svgRegions: [],
  setSvgRegions: newRegions => set(() => ({svgRegions: newRegions})),
  addSvgRegions: newRegion => set((state) => ({svgRegions: [...state.svgRegions, newRegion]})),
  visibleMarkerDrawingDlg: false,
  setVisibleMarkerDrawingDlg: newValue =>
    set(() => ({visibleMarkerDrawingDlg: newValue})),
  svgMarkers: [],
  setSvgMarkers: newMarkers => set(() => ({svgMarkers: newMarkers})),
  addSvgMarkers: newMarker => set((state) => ({svgMarkers: [...state.svgMarkers, newMarker]})),
  selectedMarkerType: {},
  setMarkerTypeToAdd: newType=> set(() => ({selectedMarkerType: newType})),
}));

export default useDrawingStore;