import { mkdir, writeFile } from 'node:fs/promises'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'
import { createAlphaHead } from '../lib/alpha-head-model.ts'

// GLTFExporter uses FileReader for its binary buffer even without textures.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(buffer => { this.result = buffer; this.onloadend?.() })
  }
}
const model = createAlphaHead()
const binary = await new GLTFExporter().parseAsync(model, { binary: true })
await mkdir(new URL('../public/models/', import.meta.url), { recursive: true })
await writeFile(new URL('../public/models/alpha-head.glb', import.meta.url), Buffer.from(binary))
console.log(`Exported Alpha head: ${binary.byteLength} bytes`)
