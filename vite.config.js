import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This file explicitly forces the build tool to process CSS using Tailwind and Autoprefixer,
// which is the solution for the unstyled website issue on Netlify/Cloudflare.

export default defineConfig({
  plugins: [react()],
  // CRITICAL FIX 1: Sets the base path to relative ('./')
  base: './', 
  
  // CRITICAL FIX 2: Add this 'css' block back in
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
