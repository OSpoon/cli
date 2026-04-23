import process from 'node:process'
import { cancel, intro, isCancel, outro, text } from '@clack/prompts'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import pc from 'picocolors'
import { add } from '../core/add'

async function promptNumber(message: string): Promise<number> {
  const res = await text({
    message,
    validate: value => Number.isNaN(Number(value)) ? 'Please enter a valid number' : undefined,
  })
  if (isCancel(res)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }
  return Number(res)
}

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
    intro(pc.inverse(' cli template - add command '))

    const numA = args.a && !Number.isNaN(Number(args.a))
      ? Number(args.a)
      : await promptNumber('Enter the first number:')

    const numB = args.b && !Number.isNaN(Number(args.b))
      ? Number(args.b)
      : await promptNumber('Enter the second number:')

    const result = add(numA, numB)
    consola.success(`${numA} + ${numB} = ${pc.green(result)}`)
    outro('Done!')
  },
})
