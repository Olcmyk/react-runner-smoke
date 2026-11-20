import assert from 'node:assert/strict'
import { access } from 'node:fs/promises'
import { preview } from 'vite'

await access(new URL('../dist/index.html', import.meta.url))

const server = await preview({ preview: { host: '127.0.0.1', port: 0 } })
try {
  const { port } = server.httpServer.address()
  const origin = `http://127.0.0.1:${port}`
  const page = await fetch(origin, { signal: AbortSignal.timeout(5000) })
  assert.equal(page.status, 200)
  const html = await page.text()
  assert.match(html, /<title>React Runner 测试<\/title>/)
  const bundlePath = html.match(/<script[^>]*src="([^"]+\.js)"/)?.[1]
  assert.ok(bundlePath, 'The HTML must reference a compiled JavaScript bundle')

  const bundle = await fetch(new URL(bundlePath, origin), {
    signal: AbortSignal.timeout(5000),
  })
  assert.equal(bundle.status, 200)
  assert.match(bundle.headers.get('content-type'), /javascript/)
  assert.match(await bundle.text(), /React Runner 测试/)
  console.log('Static site and React bundle returned HTTP 200.')
} finally {
  await new Promise((resolve, reject) => {
    server.httpServer.close((error) => (error ? reject(error) : resolve()))
  })
}
