/**
 * scripts/init.ts
 *
 * 将项目中所有涉及项目名称的地方统一替换为新名称。
 *
 * 用法：
 *   npx tsx scripts/init.ts <new-name>
 *   # 例如：npx tsx scripts/init.ts my-awesome-cli
 *
 * 会修改以下文件：
 *   - package.json        name / bin key / homepage / repository.url / bugs
 *   - README.md           标题、安装命令、使用示例、badge 链接
 *   - src/cli.ts          cac() 调用名称
 *   - src/commands/add.ts intro() 中的模板标题
 */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import pc from 'picocolors'

// ─── 工具函数 ────────────────────────────────────────────────────────────────

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8')
}

function writeFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content, 'utf-8')
}

function replaceAll(source: string, search: string, replacement: string): string {
  return source.split(search).join(replacement)
}

// ─── 替换逻辑 ────────────────────────────────────────────────────────────────

/**
 * 更新 package.json 中所有与旧名称相关的字段。
 */
function updatePackageJson(root: string, oldName: string, newName: string): void {
  const filePath = path.join(root, 'package.json')
  const pkg = JSON.parse(readFile(filePath))

  // name
  if (pkg.name === oldName) {
    pkg.name = newName
  }

  // bin key
  if (pkg.bin && pkg.bin[oldName] !== undefined) {
    pkg.bin[newName] = pkg.bin[oldName]
    delete pkg.bin[oldName]
  }

  // homepage / repository.url / bugs — 替换 URL 中的旧名称片段
  for (const field of ['homepage', 'bugs'] as const) {
    if (typeof pkg[field] === 'string') {
      pkg[field] = replaceAll(pkg[field], `/${oldName}`, `/${newName}`)
    }
  }

  if (pkg.repository?.url) {
    pkg.repository.url = replaceAll(pkg.repository.url, `/${oldName}`, `/${newName}`)
  }

  writeFile(filePath, `${JSON.stringify(pkg, null, 2)}\n`)
  console.log(pc.green('✔'), 'package.json')
}

/**
 * 更新 README.md 中所有出现旧名称的地方（命令示例、badge、标题等）。
 */
function updateReadme(root: string, oldName: string, newName: string): void {
  const filePath = path.join(root, 'README.md')
  let content = readFile(filePath)

  content = replaceAll(content, oldName, newName)

  writeFile(filePath, content)
  console.log(pc.green('✔'), 'README.md')
}

/**
 * 更新 src/cli.ts 中 cac() 的参数名称。
 */
function updateCliTs(root: string, oldName: string, newName: string): void {
  const filePath = path.join(root, 'src/cli.ts')
  let content = readFile(filePath)

  // cac('cli') → cac('new-name')
  content = replaceAll(content, `cac('${oldName}')`, `cac('${newName}')`)

  writeFile(filePath, content)
  console.log(pc.green('✔'), 'src/cli.ts')
}

/**
 * 更新 src/commands/add.ts 中 intro() 的标题文字。
 */
function updateAddTs(root: string, oldName: string, newName: string): void {
  const filePath = path.join(root, 'src/commands/add.ts')
  let content = readFile(filePath)

  // ' cli template - add command ' → ' new-name template - add command '
  content = replaceAll(content, ` ${oldName} template`, ` ${newName} template`)

  writeFile(filePath, content)
  console.log(pc.green('✔'), 'src/commands/add.ts')
}

// ─── 入口 ────────────────────────────────────────────────────────────────────

function main(): void {
  const newName = process.argv[2]

  if (!newName) {
    console.error(pc.red('错误：请提供新的项目名称。'))
    console.error(pc.dim('用法：npx tsx scripts/init.ts <new-name>'))
    process.exit(1)
  }

  // 校验：npm 包名规范（简单校验）
  // eslint-disable-next-line e18e/prefer-static-regex
  if (!/^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(newName)) {
    console.error(pc.red(`错误："${newName}" 不是合法的 npm 包名。`))
    console.error(pc.dim('包名只能包含小写字母、数字、连字符和下划线，scoped 包名格式为 @scope/name。'))
    process.exit(1)
  }

  const root = path.resolve(import.meta.dirname, '..')
  const pkgPath = path.join(root, 'package.json')
  const oldName: string = JSON.parse(readFile(pkgPath)).name

  if (oldName === newName) {
    console.log(pc.yellow('⚠'), `项目名称已经是 "${newName}"，无需修改。`)
    process.exit(0)
  }

  console.log()
  console.log(`  将项目名称从 ${pc.cyan(oldName)} 替换为 ${pc.cyan(newName)}`)
  console.log()

  updatePackageJson(root, oldName, newName)
  updateReadme(root, oldName, newName)
  updateCliTs(root, oldName, newName)
  updateAddTs(root, oldName, newName)

  console.log()
  console.log(pc.green('✔'), `完成！项目名称已更新为 ${pc.bold(newName)}。`)
  console.log()
}

main()
