'use strict'

//
// Determine instances of a string and return line and column numbers.
//

function lineNumberByIndex (index, string) {
  const re = /^[\S\s]/gm
  let line = 0
  let match
  let lastRowIndex = 0
  while ((match = re.exec(string))) {
    if (match.index > index) break
    lastRowIndex = match.index
    line++
  }
  return [Math.max(line - 1, 0), lastRowIndex]
}

const findOccurrences = (needle, haystack) => {
  let match
  const result = []
  while ((match = needle.exec(haystack))) {
    const pos = lineNumberByIndex(needle.lastIndex, haystack)
    result.push({
      match,
      lineNumber: pos[0],
      column: needle.lastIndex - pos[1] - match[0].length,
    })
  }
  return result
}

module.exports = {
  findOccurrences,
}
