import { test } from 'node:test';
import assert from 'node:assert/strict';
import { numberedImagePlan } from './numbered-image.mjs';
const revision = 'a'.repeat(40), digest = 'sha256:' + 'b'.repeat(64);
const manifest = { digest, manifests: ['amd64','arm64'].map(architecture => ({platform:{os:'linux',architecture}})) };
const config = architecture => ({os:'linux',architecture,config:{Labels:{'org.opencontainers.image.version':'1.2.3','org.opencontainers.image.revision':revision}}});
const images = {'linux/amd64':config('amd64'),'linux/arm64':config('arm64')};
test('new numbered images and mutable snapshots can build',()=>{
 assert.deepEqual(numberedImagePlan('1.2.3',revision,null,{}),{reuse:false,digest:''});
 assert.deepEqual(numberedImagePlan('',revision,manifest,images),{reuse:false,digest:''});
});
test('duplicate tag/release events reuse the same verified multiarch image',()=>assert.deepEqual(numberedImagePlan('1.2.3',revision,manifest,images),{reuse:true,digest}));
test('a numbered image cannot be refreshed from different source',()=>assert.throws(()=>numberedImagePlan('1.2.3','c'.repeat(40),manifest,images),/Bump package.json/));
test('missing or wrong version labels fail closed',()=>{
 const changed=structuredClone(images);delete changed['linux/arm64'].config.Labels['org.opencontainers.image.version'];
 assert.throws(()=>numberedImagePlan('1.2.3',revision,manifest,changed));
 assert.throws(()=>numberedImagePlan('1.2.4',revision,manifest,images));
});
test('missing platform or config cannot silently regress architecture support',()=>{
 assert.throws(()=>numberedImagePlan('1.2.3',revision,{...manifest,manifests:manifest.manifests.slice(0,1)},images),/arm64/);
 assert.throws(()=>numberedImagePlan('1.2.3',revision,manifest,{'linux/amd64':config('amd64')}),/arm64/);
});
test('invalid digest cannot be reused',()=>assert.throws(()=>numberedImagePlan('1.2.3',revision,{...manifest,digest:'unknown'},images)));
