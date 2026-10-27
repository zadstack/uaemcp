import { readFileSync, appendFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// Reuse a numbered image only when its verified identity is the exact source
// being released. A duplicate release event must never rebuild that number.
export function numberedImagePlan(version, revision, manifest, images) {
  if (!version || !manifest) return { reuse: false, digest: '' };
  if (!/^sha256:[a-f0-9]{64}$/.test(manifest.digest ?? '')) throw Error('Existing image has no verified manifest digest');
  const platforms = new Set((manifest.manifests ?? []).map(m => `${m.platform?.os}/${m.platform?.architecture}`));
  const configs = images?.architecture ? [images] : Object.values(images ?? {});
  for (const architecture of ['amd64', 'arm64']) {
    const config = configs.find(c => c?.os === 'linux' && c.architecture === architecture);
    const labels = config?.config?.Labels ?? {};
    if (!platforms.has(`linux/${architecture}`) || !config) throw Error(`Existing numbered image lacks linux/${architecture}; do not overwrite it`);
    if (labels['org.opencontainers.image.version'] !== version || labels['org.opencontainers.image.revision'] !== revision || labels['org.opencontainers.image.source'] !== 'https://github.com/zadstack/uaemcp') {
      throw Error(`Numbered image ${version} already exists with different or unverified source. Bump package.json and the release version; numbered images cannot be overwritten.`);
    }
  }
  return { reuse: true, digest: manifest.digest };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const manifest = JSON.parse(readFileSync(process.argv[2], 'utf8'));
  const images = JSON.parse(readFileSync(process.argv[3], 'utf8'));
  const plan = numberedImagePlan(process.env.NUMBERED_VERSION ?? '', process.env.SOURCE_REVISION ?? '', manifest, images);
  const output = `reuse=${plan.reuse}\ndigest=${plan.digest}\n`;
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, output);
  else process.stdout.write(output);
}
