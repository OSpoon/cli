# cli

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A modern CLI template powered by TypeScript, cac and clack.

## Installation

```bash
npm install -g cli
# or using pnpm
pnpm install -g cli
```

## Usage

This scaffolding template provides a reference implementation of a typical CLI application.

### Interactive Mode

If you run the CLI without arguments, it provides a fallback guide or an intuitive step-by-step UI to gather required parameters:
```bash
$ cli add
# ┌   cli template - add command
# │
# ◇  Enter the first number:
# │  ...
```

### Commands

| Command | Description |
| --- | --- |
| `cli add [a] [b]` | Adds two numbers. If `a` or `b` is omitted, it triggers prompt inputs. |

### Global Options

| Option | Description |
| --- | --- |
| `--debug` | Enters debug mode, enabling detailed background logging utilizing `consola`. |
| `-h, --help` | Display full global help usage and command lists. |
| `-v, --version` | Display the currently installed version dynamically. |

## Note for Developers

### Project Structure

```
src/
├── core/           # Pure functions — no I/O, no side effects
│   └── add.ts      # Business logic, independently testable
├── commands/       # CLI command handlers (interactive layer)
│   └── add.ts      # Wraps core functions with @clack/prompts UI
├── utils/          # Shared utilities
│   └── suggest.ts  # Fuzzy command suggestion via leven
├── cli.ts          # CLI entry point (cac setup, command registration)
└── index.ts        # Public API — re-exports from core for programmatic use
```

The `core/` layer is intentionally decoupled from the CLI. This means you can use the same logic both as a CLI tool and as a library:

```ts
// Programmatic use
import { add } from 'cli'

const result = add(1, 2) // 3
```

When adding a new command, follow this pattern:
1. Implement the pure logic in `src/core/<name>.ts`
2. Export it from `src/index.ts`
3. Add the interactive CLI handler in `src/commands/<name>.ts`, importing from `core/`
4. Register the command in `src/cli.ts`

This scaffolding template provides a reference implementation of a typical CLI application.

This starter recommends using [npm Trusted Publisher](https://github.com/e18e/ecosystem-issues/issues/201), where the release is done on CI to ensure the security of the packages. To do so, run `pnpm publish` manually for the first time to create the package on npm, then go to `https://www.npmjs.com/package/cli/access` to link your GitHub repo. For future releases, run `pnpm run release` and GitHub Actions will handle the rest.

### Configuration Storage

This template uses [`conf`](https://github.com/sindresorhus/conf) for persistent configuration. The config file is stored at a platform-specific location based on the `projectName` (i.e. the package `name` field):

| Platform | Path |
| --- | --- |
| macOS | `~/Library/Preferences/<name>-nodejs/config.json` |
| Linux | `~/.config/<name>/config.json` |
| Windows | `%APPDATA%\<name>-nodejs\config.json` |

After running `npx tsx init.ts <new-name>`, the storage path will automatically reflect the new name.

## License

[MIT](./LICENSE) License © [OSpoon](https://github.com/OSpoon)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/cli?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/cli
[npm-downloads-src]: https://img.shields.io/npm/dm/cli?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/cli
[bundle-src]: https://img.shields.io/bundlephobia/minzip/cli?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=cli
[license-src]: https://img.shields.io/github/license/OSpoon/cli.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/OSpoon/cli/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/cli
