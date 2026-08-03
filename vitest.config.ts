import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    // Node >=26 enables an experimental localStorage global that shadows jsdom's
    execArgv: ['--no-experimental-webstorage'],
  },
})
