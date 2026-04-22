import process from 'node:process'
import { cac } from 'cac'
import Conf from 'conf'
import { consola } from 'consola'
import pc from 'picocolors'
import updateNotifier from 'update-notifier'
import pkg from '../package.json'
import { addHandler } from './commands/add'
import { suggest } from './utils/suggest'

const config = new Conf({ projectName: pkg.name })

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
  const input = parsed.args[0]
  if (input) {
    const commandNames = cli.commands.map(c => c.name).filter(Boolean)
    const match = suggest(input, commandNames)
    consola.error(`Unknown command: ${pc.bold(input)}`)
    if (match)
      consola.info(`Did you mean ${pc.bold(match)}?`)
    process.exit(1)
  }
  cli.outputHelp()
}
