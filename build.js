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

async function build(dirPath, entryPath, bundlePath, envPath) {
  await fs.mkdir(dirPath, {recursive: true});
  await fs.writeFile(entryPath, 'export * as pagegram from \'../index\';\n');
  await esbuild.build({
    entryPoints: [entryPath],
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
  const regex = /export\s*{\s*(\S*) as pagegram\s*};[\s\S]*$/g;
  const replacement = 'var pagegram=$1;\n';
  bundle = bundle.replaceAll(regex, replacement);
  try {
    const env = await fs.readFile(envPath, 'utf8');
    bundle = [env, bundle].join('\n');
  } catch {}

  await fs.writeFile(bundlePath, bundle, 'utf8');
}

const dir = path.dirname(fileURLToPath(import.meta.url));
const folders = await getSubfolders(path.join(dir, 'projects'));
const buildPromises = folders.map(async folder => {
  const dirPath = path.join(dir, `projects/${folder}/bundle`);
  const entryPath = path.join(dir, `projects/${folder}/bundle/index.ts`);
  const bundlePath = path.join(dir, `projects/${folder}/bundle/bundle.js`);
  const envPath = path.join(dir, `projects/${folder}/bundle/env.js`);
  return build(dirPath, entryPath, bundlePath, envPath);
});
await Promise.all(buildPromises);
