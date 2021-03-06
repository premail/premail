const projectPath = require('./projectPath')

describe('projectPath()', () => {
  const input = [{ cwd: '/home/foo', path: '../../', result: '/home' }]

  input.forEach((item) => {
    const arg = `${item.cwd}, ${item.path}`
    it(`returns a value for "${item.cwd}, ${item.path}"`, () => {
      expect(projectPath(arg)).toBeTruthy()
    })
  })
})
