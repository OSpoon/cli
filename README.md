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

This starter recommands using [npm Trusted Publisher](https://github.com/e18e/ecosystem-issues/issues/201), where the release is done on CI to ensure the security of the packages.

To do so, you need to run `pnpm publish` manually for the very first time to create the package on npm, and then go to `https://www.npmjs.com/package/cli/access` to set the connection to your GitHub repo.

Then for the future releases, you can run `pnpm run release` to do the release and the GitHub Actions will take care of the release process.

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
