import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // If your app uses client-side routing, set the "historyApiFallback" option to true
    historyApiFallback: true,
  },
})
