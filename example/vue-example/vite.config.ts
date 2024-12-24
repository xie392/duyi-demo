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
const config = ({ mode }: ConfigEnv): UserConfigExport => {
    const http = loadEnv(mode, process.cwd())

    return defineConfig({
        plugins: [
            vue(),
            viteMockServe({
                mockPath: 'mock',
                enable: true
            })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
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
        },
        // 打包输出目录
        // build: {
        //   outDir: "../../public/html/vue-example"
        // }
    })
}

export default config
