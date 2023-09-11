import react from '@vitejs/plugin-react'

import {defineConfig, loadEnv} from 'vite'

export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL)
    },
    plugins: [react()]
  }
})
