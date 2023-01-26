import useDrawingStore from '../../../store/bitmapStore';

const history = {
  undo: [],
  redo: [],
};

// Clear undo/redo stacks
function clear() {
  history.undo = [];
  history.redo = [];
}

// Push a new path to undo stack
function push(path) {
  history.undo.push(path);
}

function undo() {
  if (history.undo.length === 0) {
    return;
  }
  // Get the last path in history
  let lastPath = history.undo[history.undo.length - 1];
  // Add the path to redo history
  history.redo.push(lastPath);
  // Remove path from undo history
  history.undo.splice(history.undo.length - 1, 1);
  // Update global state so the drawing board redraws
  useDrawingStore.getState().setCompletedPaths([...history.undo]);
}

function redo() {
  if (history.redo.length === 0) {
    return;
  }
  // Get last path from redo history
  let lastPath = history.redo[history.redo.length - 1];
  // Remove the path from redo history
  history.redo.splice(history.redo.length - 1, 1);
  // Add the path to undo history
  history.undo.push(lastPath);
  // Update the state
  useDrawingStore.getState().setCompletedPaths([...history.undo]);
}

function renderHistory() {
  if (history.undo.length === 0) {
    return;
  }
  useDrawingStore.getState().setCompletedPaths([...history.undo]);
}

export default {
  history,
  clear,
  push,
  undo,
  redo,
  renderHistory,
};
