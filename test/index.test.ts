import { describe, expect, it } from 'vitest'
import {
  add,
  buildDoctorDiagnostics,
  doctorDiagnosticsTableRows,
  formatDoctorDiagnosticsJson,
} from '../src/index'

describe('core logic', () => {
  it('should add two numbers correctly', () => {
    expect(add(1, 2)).toEqual(3)
    expect(add(-1, 5)).toEqual(4)
  })

  it('should build and format doctor diagnostics', () => {
    const diagnostics = buildDoctorDiagnostics({
      pkg: { name: 'fixture-cli', version: '1.0.0' },
      executable: '/bin/fixture',
      node: 'v24.0.0',
      platform: 'darwin',
      arch: 'arm64',
      shell: '/bin/zsh',
      packageManager: 'pnpm/10.33.0',
      osType: 'Darwin',
      osRelease: '25.0.0',
      cwd: '/tmp/fixture',
      configPath: '/tmp/config.json',
      configStoreKeys: ['version', 'name'],
    })

    expect(diagnostics.config.keys).toEqual(['name', 'version'])
    expect(formatDoctorDiagnosticsJson(diagnostics)).toContain('"fixture-cli"')
    expect(doctorDiagnosticsTableRows(diagnostics)).toContainEqual(['configKeys', 'name, version'])
  })
})
