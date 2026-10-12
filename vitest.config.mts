import { defineConfig } from "vitest/config"
import path from "path"
import { fileURLToPath } from "url"

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts", "scripts/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": rootDir,
    },
  },
})
