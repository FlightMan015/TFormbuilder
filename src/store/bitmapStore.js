import create from 'zustand';
import utils from '../components/fields/bitmap/utils';

const useDrawingStore = create(set => ({
  completedPaths: [],
  setCompletedPaths: newPaths => set(() => ({completedPaths: newPaths})),
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
  bitmapImageData: {},
  setBitmapImageData: data => set(() => ({bitmapImageData: data})),
  visibleDlg: {},
  setVisibleDlg: newValue => set(() => ({visibleDlg: newValue})),
}));

export default useDrawingStore;