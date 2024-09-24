const esbuild = require('esbuild');
const fs = require('node:fs').promises;
const path = require('node:path');

async function getSubfolders(dir) {
  const files = await fs.readdir(dir);
  const directories = await Promise.all(
    files.map(async file => {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      return stat.isDirectory() ? file : null;
    }),
  );
  return directories.filter(Boolean);
}

async function build(dirPath, entryPath, bundlePath) {
  await fs.mkdir(dirPath, {recursive: true});
  await fs.writeFile(entryPath, 'export * as pagegram from \'../index\';\n');
  await esbuild.build({
    entryPoints: [entryPath],
    bundle: true,
    // minify: true,
    outfile: bundlePath,
    format: 'esm',
  });
  fs.unlink(entryPath);
  let fileContent = await fs.readFile(bundlePath, 'utf8');
  const regex = /export\s*{\s*(\S*) as pagegram\s*};[\s\S]*$/g;
  const replacement = 'var pagegram=$1;\n';
  fileContent = fileContent.replaceAll(regex, replacement);
  await fs.writeFile(bundlePath, fileContent, 'utf8');
}

async function main() {
  const folders = await getSubfolders(path.join(__dirname, 'projects'));
  for (const folder of folders) {
    const dirPath = path.join(__dirname, `projects/${folder}/bundle`);
    const entryPath = path.join(__dirname, `projects/${folder}/bundle/index.ts`);
    const bundlePath = path.join(__dirname, `projects/${folder}/bundle/bundle.js`);
    await build(dirPath, entryPath, bundlePath);
  }
}

main();
