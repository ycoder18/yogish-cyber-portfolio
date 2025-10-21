import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 1. **CRITICAL FIX:** Sets the base public path for the application.
  // This ensures that all bundled assets (CSS, JS, images) are referenced 
  // correctly regardless of where the site is hosted (e.g., at the root 
  // of a domain or inside a sub-path like on GitHub Pages).
  base: './', 
})
