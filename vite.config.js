import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // CRITICAL FIX: This line MUST be here.
  // It ensures assets load and fixes the blank page issue.
  base: './', 

  css: {
    postcss: {
      plugins: [
        require('tailwindcss')(),
        require('autoprefixer')(),
      ],
    },
  },
});
