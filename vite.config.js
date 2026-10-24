import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // De NOVI Dynamic API accepteert alleen requests vanaf localhost:5173 (CORS).
    // strictPort voorkomt dat Vite ongemerkt een andere poort kiest.
    port: 5173,
    strictPort: true,
  },
})
