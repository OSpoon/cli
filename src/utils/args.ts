import process from 'node:process'
import { cancel, isCancel, text } from '@clack/prompts'

export async function readNumberArgument(
  value: string | undefined,
  message: string,
): Promise<number> {
  const parsed = Number(value)

  if (value !== undefined && value !== '' && Number.isFinite(parsed))
    return parsed

  const response = await text({
    message,
    validate: input => Number.isFinite(Number(input))
      ? undefined
      : 'Please enter a valid number',
  })

  if (isCancel(response)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  return Number(response)
}
