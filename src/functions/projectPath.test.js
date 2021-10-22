const projectPath = require('./projectPath')

describe('projectPath()', () => {
  const input = [
    { cwd: '__dirname', path: '.' },
    { cwd: '__dirname', path: '../../' },
  ]

  input.forEach(item => {
    const arg = `${item.cwd}, ${item.path}`
    test(`returns a value for ${item.path}`, () => {
      expect(projectPath(arg)).toBeTruthy()
    })
    test(`returns an absolute directory for ${item.path}`, () => {
      expect(projectPath(arg)).toMatch(/^\//)
    })
  })
})
