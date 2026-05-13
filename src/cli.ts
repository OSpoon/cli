import { defineCommand, runMain } from 'citty'
import updateNotifier from 'update-notifier'
import pkg from '~/package.json'
import { subCommands } from './commands'
import { createConfig, seedConfig } from './config'

const config = createConfig()
seedConfig(config)

updateNotifier({ pkg: pkg as any }).notify()

const main = defineCommand({
  meta: {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
  },
  subCommands,
})

runMain(main)
