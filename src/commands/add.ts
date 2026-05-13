import { intro, outro } from '@clack/prompts'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import pc from 'picocolors'
import { add } from '@/core/add'
import { readNumberArgument } from '@/utils/args'
import pkg from '~/package.json'

export const addCommand = defineCommand({
  meta: {
    name: 'add',
    description: 'Add two numbers',
  },
  args: {
    a: { type: 'positional', description: 'First number', required: false },
    b: { type: 'positional', description: 'Second number', required: false },
  },
  async run({ args }) {
    intro(pc.inverse(` ${pkg.name} - add command `))

    const numA = await readNumberArgument(args.a, 'Enter the first number:')
    const numB = await readNumberArgument(args.b, 'Enter the second number:')

    const result = add(numA, numB)
    consola.success(`${numA} + ${numB} = ${pc.green(result)}`)
    outro('Done!')
  },
})
