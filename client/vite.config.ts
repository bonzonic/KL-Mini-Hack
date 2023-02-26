import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/KL-Mini-Hack/',
  plugins: [react(), 
    define({
      'process.env': {
        BASE_URL: JSON.stringify('/KL-Mini-Hack/')
      }
    })]
})
