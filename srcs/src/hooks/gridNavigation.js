// Number of columns the grid is currently rendered with (cards sharing the first row's top).
export const getColumnCount = (elements) => {
  const cards = elements.filter(Boolean)
  if (cards.length === 0) return 1
  const firstTop = cards[0].offsetTop
  return Math.max(1, cards.filter(el => el.offsetTop === firstTop).length)
}

// Returns the next selected index, or 'back' when moving down past the last row.
export const getNextGridIndex = (key, index, count, columns) => {
  switch (key) {
    case 'ArrowLeft':
      return Math.max(index - 1, 0)
    case 'ArrowRight':
      return Math.min(index + 1, count - 1)
    case 'ArrowUp':
      return index - columns >= 0 ? index - columns : index
    case 'ArrowDown': {
      if (index + columns < count) return index + columns
      const lastRowStart = Math.floor((count - 1) / columns) * columns
      return index >= lastRowStart ? 'back' : count - 1
    }
    default:
      return index
  }
}
