import { cac } from 'cac'
import Conf from 'conf'
import { consola } from 'consola'
import updateNotifier from 'update-notifier'
import pkg from '../package.json'
import { addHandler } from './commands/add'

const config = new Conf({})

// 默认示例，暂时仅写入: name: 'cli', version: '0.0.0'
config.set('name', pkg.name)
config.set('version', pkg.version)

// Check for updates quietly in the background
updateNotifier({ pkg: pkg as any }).notify()

const cli = cac('cli')

// Add a global debug flag directly appended to options
cli.option('--debug', 'Enable debug log level')

cli
  .command('add [a] [b]', 'Add two numbers')
  .alias('a')
  .action((a, b, options) => {
    // Configure debug level if present
    if (options.debug) {
      consola.level = 4
      consola.debug('Debug mode enabled. Arguments parsed:', { a, b })
    }
    return addHandler(a, b)
  })

cli.help()
cli.version(pkg.version)

const parsed = cli.parse()

// Prevent silent exits: if no valid command was triggered (and no --help/--version used), display help.
if (!cli.matchedCommand && !parsed.options.help && !parsed.options.version) {
  cli.outputHelp()
}
