const { Suite } = require('benchmark')
const destr = require('./dist')

function createSuite(name, setup) {
  const suite = new Suite(name)

  suite.on('cycle', function (event) {
    console.log(String(event.target));
  })

  suite.on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })

  return suite
}

function bench(name, val) {
  const suite = createSuite(name)
  suite.add('JSON.parse', () => { JSON.parse(val) })
  suite.add('destr', () => { destr(val) })
  suite.run()
}

function benchTryCatch(name, val) {
  const suite = createSuite(name)
  suite.add('JSON.parse (try-catch)', () => { try { JSON.parse(val) } catch(err) { return val } })
  suite.add('destr', () => { destr(val) })
  suite.run()
}

bench('Non-string fallback', 3.14159265359)

bench('Known values', 'true')

benchTryCatch('Plain string', 'salam')
