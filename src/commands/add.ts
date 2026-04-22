import process from 'node:process'
import { cancel, intro, isCancel, outro, text } from '@clack/prompts'
import { consola } from 'consola'
import pc from 'picocolors'
import { add } from '../core/add'

export async function addHandler(aStr?: string, bStr?: string): Promise<void> {
  intro(pc.inverse(' cli template - add command '))

  let numA = Number(aStr)
  if (!aStr || Number.isNaN(numA)) {
    const resA = await text({
      message: 'Enter the first number:',
      validate: value => Number.isNaN(Number(value)) ? 'Please enter a valid number' : undefined,
    })

    if (isCancel(resA)) {
      cancel('Operation cancelled.')
      process.exit(0)
    }
    numA = Number(resA)
  }

  let numB = Number(bStr)
  if (!bStr || Number.isNaN(numB)) {
    const resB = await text({
      message: 'Enter the second number:',
      validate: value => Number.isNaN(Number(value)) ? 'Please enter a valid number' : undefined,
    })

    if (isCancel(resB)) {
      cancel('Operation cancelled.')
      process.exit(0)
    }
    numB = Number(resB)
  }

  const result = add(numA, numB)
  consola.success(`${numA} + ${numB} = ${pc.green(result)}`)

  outro('Done!')
}
