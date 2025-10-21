import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This file explicitly forces the build tool to process CSS using Tailwind and Autoprefixer,
// which is the solution for the unstyled website issue on Netlify/Cloudflare.

export default defineConfig({
  plugins: [react()],
  // CRITICAL FIX 1: Sets the base path to relative ('./') to ensure assets load
  // when deployed under a subdirectory. (Fixes blank page issue)
  base: './', 
  
  // CRITICAL FIX 2: Explicitly tells Vite to use PostCSS and loads the necessary plugins.
  // (Fixes unstyled/broken layout issue)
  css: {
    postcss: {
      plugins: [
        // Load Tailwind for processing utility classes
        require('tailwindcss')(),
        // Load Autoprefixer for browser compatibility
        require('autoprefixer')(),
      ],
    },
  },
});
