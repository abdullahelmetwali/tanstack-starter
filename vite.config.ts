import { URL, fileURLToPath } from "node:url"

import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

import { tanstackRouter } from "@tanstack/router-plugin/vite"

// https://vitejs.dev/config/
export default {
  fmt: {
    semi: false,
    singleQuote: false,
    trailingComma: "all",
    tabWidth: 4,
    useTabs: true,
    printWidth: 80,
    sortPackageJson: false,
    ignorePatterns: ["package-lock.json", "pnpm-lock.yaml", "yarn.lock"],
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  preview: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            // react engine
            if (
              id.includes("react/") ||
              id.includes("react-dom/") ||
              id.includes("scheduler")
            ) {
              return "vendor-react-engine"
            }

            // ui
            if (id.includes("radix-ui")) {
              return "vendor-ui"
            }
            // date
            if (id.includes("date-fns")) {
              return "vendor-ui"
            }

            // routing
            if (id.includes("react-router")) {
              return "vendor-router"
            }
            // queries
            if (id.includes("react-query")) {
              return "vendor-query"
            }
            // table
            if (id.includes("react-table")) {
              return "vendor-table"
            }
          }
        },
      },
    },
  },
};