const fs = require('fs')
const { Suite } = require('benchmark')
const sjson = require('secure-json-parse')
const destr = require('./dist')

const { log } = console

function createSuite (name) {
  const suite = new Suite(name)

  log(`\n=== ${name} ==`)
  suite.on('cycle', (event) => { log(String(event.target)) })
  suite.on('complete', function () { log('Fastest is ' + this.filter('fastest').map('name')) })

  return suite
}

function bench (name, val) {
  const suite = createSuite(name)
  suite.add('JSON.parse', () => { JSON.parse(val) })
  suite.add('sjson', () => { sjson.parse(val) })
  suite.add('destr', () => { destr(val) })
  suite.run()
}

function benchTryCatch (name, val) {
  const suite = createSuite(name)
  suite.add('JSON.parse (try-catch)', () => { try { JSON.parse(val) } catch (err) { return val } })
  suite.add('sjson (try-catch)', () => { try { sjson.parse(val) } catch (err) { return val } })
  suite.add('destr', () => { destr(val) })
  suite.run()
}

bench('Non-string fallback', 3.14159265359)
bench('Known values', 'true')
benchTryCatch('Plain string', 'salam')

const pkg = fs.readFileSync('./package.json', 'utf-8')
bench('standard object', pkg)
benchTryCatch('invalid syntax', pkg.substr(0, pkg.length - 1))
