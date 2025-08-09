import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/confi
// g/
export default defineConfig({
  plugins: [react(), tailwindcss()]
})
