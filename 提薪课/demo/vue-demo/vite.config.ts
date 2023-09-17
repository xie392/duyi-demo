/*
 * @Author: xie392
 * @Date: 2023-09-15 00:56:55
 * @Description: 
 */
import { defineConfig, loadEnv, UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const http = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: http.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  })
}
