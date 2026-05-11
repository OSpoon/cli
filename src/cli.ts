import { defineCommand, runMain } from 'citty'
import Conf from 'conf'
import updateNotifier from 'update-notifier'
import pkg from '~/package.json'
import { addCommand } from './commands/add'

const config = new Conf({ projectName: pkg.name })

config.set('name', pkg.name)
config.set('version', pkg.version)

updateNotifier({ pkg: pkg as any }).notify()

const main = defineCommand({
  meta: {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
  },
  subCommands: {
    add: addCommand,
  },
})

runMain(main)
