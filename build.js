import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import esbuild from 'esbuild';
import inlineImportPlugin from 'esbuild-plugin-inline-import';

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

async function build(dirPath, buildPath, entryPath, bundlePath) {
  await fs.mkdir(dirPath, {recursive: true});
  await fs.writeFile(entryPath, 'export * from \'../index\';\n');
  await esbuild.build({
    entryPoints: [buildPath],
    bundle: true,
    // minify: true,
    outfile: bundlePath,
    format: 'esm',
    plugins: [
      inlineImportPlugin({
        filter: /\.svg$/,
      }),
    ],
  });
  fs.unlink(entryPath);
  let bundle = await fs.readFile(bundlePath, 'utf8');
  const regex = /export ?{[\s\S]*};[\s\S]*$/g;
  const replacement = '';
  bundle = bundle.replaceAll(regex, replacement);
  await fs.writeFile(bundlePath, bundle, 'utf8');
}

const dir = path.dirname(fileURLToPath(import.meta.url));
const folders = await getSubfolders(path.join(dir, 'projects'));
const buildPromises = folders.map(async folder => {
  const dirPath = path.join(dir, `projects/${folder}/bundle`);
  const buildPath = path.join(dir, `projects/${folder}/index.ts`);
  const entryPath = path.join(dir, `projects/${folder}/bundle/index.ts`);
  const bundlePath = path.join(dir, `projects/${folder}/bundle/bundle.js`);
  return build(dirPath, buildPath, entryPath, bundlePath);
});
await Promise.all(buildPromises);
