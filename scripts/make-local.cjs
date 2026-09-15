const fs = require('node:fs')
const path = require('node:path')

const distDir = path.join(__dirname, '..', 'dist')
const indexPath = path.join(distDir, 'index.html')
const localPath = path.join(distDir, 'local.html')

let html = fs.readFileSync(indexPath, 'utf8')

html = html.replace(
  /<link rel="stylesheet" crossorigin href="\.\/([^"]+)">/,
  (_, cssPath) => {
    const css = fs.readFileSync(path.join(distDir, cssPath), 'utf8')
    return `<style>\n${css}\n</style>`
  },
)

html = html.replace(
  /<script type="module" crossorigin src="\.\/([^"]+)"><\/script>/,
  (_, jsPath) => {
    const js = fs.readFileSync(path.join(distDir, jsPath), 'utf8')
    return `<script>\n${js}\n</script>`
  },
)

fs.writeFileSync(localPath, html)
console.log(`Created ${path.relative(process.cwd(), localPath)}`)
