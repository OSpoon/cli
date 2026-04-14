import { describe, expect, it } from 'vitest'
import { add } from '../src/index'

describe('core logic', () => {
  it('should add two numbers correctly', () => {
    expect(add(1, 2)).toEqual(3)
    expect(add(-1, 5)).toEqual(4)
  })
})
