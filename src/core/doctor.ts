/**
 * Doctor diagnostics — pure builders from explicit inputs (no process/os I/O).
 */
export interface DoctorDiagnostics {
  cli: {
    name: string
    version: string
    executable: string
  }
  runtime: {
    node: string
    platform: string
    arch: string
    shell: string
    packageManager: string
  }
  system: {
    os: string
    cwd: string
  }
  config: {
    path: string
    keys: string[]
  }
}

export function buildDoctorDiagnostics(input: {
  pkg: { name: string, version: string }
  executable: string
  node: string
  platform: string
  arch: string
  shell: string
  packageManager: string
  osType: string
  osRelease: string
  cwd: string
  configPath: string
  configStoreKeys: string[]
}): DoctorDiagnostics {
  return {
    cli: {
      name: input.pkg.name,
      version: input.pkg.version,
      executable: input.executable,
    },
    runtime: {
      node: input.node,
      platform: input.platform,
      arch: input.arch,
      shell: input.shell,
      packageManager: input.packageManager,
    },
    system: {
      os: `${input.osType} ${input.osRelease}`,
      cwd: input.cwd,
    },
    config: {
      path: input.configPath,
      keys: [...input.configStoreKeys].sort(),
    },
  }
}

export function formatDoctorDiagnosticsJson(d: DoctorDiagnostics): string {
  return `${JSON.stringify(d, null, 2)}\n`
}

export function doctorDiagnosticsTableRows(
  d: DoctorDiagnostics,
): [string, string][] {
  return [
    ['node', d.runtime.node],
    ['platform', d.runtime.platform],
    ['arch', d.runtime.arch],
    ['shell', d.runtime.shell],
    ['packageManager', d.runtime.packageManager],
    ['os', d.system.os],
    ['cwd', d.system.cwd],
    ['config', d.config.path],
    ['configKeys', d.config.keys.join(', ')],
  ]
}
