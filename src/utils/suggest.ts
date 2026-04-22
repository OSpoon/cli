import { closestMatch } from 'leven'

/**
 * Find the closest match to `input` from a list of `candidates`.
 * Returns the best match if its edit distance is within `maxDistance`,
 * otherwise returns undefined.
 *
 * @param input       - The string the user typed
 * @param candidates  - The list of valid strings to compare against
 * @param maxDistance - Max allowed edit distance (default: floor(input.length / 2) + 1)
 */
export function suggest(
  input: string,
  candidates: string[],
  maxDistance = Math.floor(input.length / 2) + 1,
): string | undefined {
  return closestMatch(input, candidates, { maxDistance })
}
