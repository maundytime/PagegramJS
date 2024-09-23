const esbuild = require('esbuild');
const fs = require('fs').promises;
const path = require('path');

const names = ['home', 'story0', 'story1', 'story2'];

async function build(dirPath, entryPath, bundlePath ) {
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(entryPath, "export * as pagegram from '../index.js';\n");
  await esbuild.build({
    entryPoints: [entryPath],
    bundle: true,
    minify: true,
    outfile: bundlePath,
    format: 'esm',
  })
  fs.unlink(entryPath);
  let fileContent = await fs.readFile(bundlePath, 'utf8');    
  const regex = /export\s*{\s*(\S*) as pagegram\s*};[\s\S]*$/g;
  const replacement = 'var pagegram=$1;\n';
  fileContent = fileContent.replace(regex, replacement);
  await fs.writeFile(bundlePath, fileContent, 'utf8');
}

async function main() {
  for (const name of names) {
    const dirPath = path.join(__dirname, `${name}/bundle`);
    const entryPath = path.join(__dirname, `${name}/bundle/index.ts`);
    const bundlePath = path.join(__dirname, `${name}/bundle/bundle.js`);
    await build(dirPath, entryPath, bundlePath)
  }
}

main();