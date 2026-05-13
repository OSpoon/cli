import type { DoctorDiagnostics } from './core/doctor'
import os from 'node:os'
import process from 'node:process'
import pkg from '~/package.json'
import { createConfig } from './config'
import { buildDoctorDiagnostics } from './core/doctor'

export interface CollectDoctorDiagnosticsOptions {
  config?: ReturnType<typeof createConfig>
}

export function collectDoctorDiagnostics(
  options: CollectDoctorDiagnosticsOptions = {},
): DoctorDiagnostics {
  const config = options.config ?? createConfig()

  return buildDoctorDiagnostics({
    pkg: { name: pkg.name, version: pkg.version },
    executable: process.argv[1] ?? 'unknown',
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    shell: process.env.SHELL ?? process.env.ComSpec ?? 'unknown',
    packageManager: process.env.npm_config_user_agent?.split(' ')[0] || 'unknown',
    osType: os.type(),
    osRelease: os.release(),
    cwd: process.cwd(),
    configPath: config.path,
    configStoreKeys: Object.keys(config.store),
  })
}
