import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: './lib/axios',
      //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      tsConfigFilePath: './tsconfig.json'
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true
      },
      '/file': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        rewrite: (path) => {
          let newpath = path.replace(/file/, '')
          return newpath
        }
      }
    }
  },
  build: {
    //打包后文件目录
    outDir: 'dist',
    //压缩
    minify: false,
    rollupOptions: {},
    lib: {
      entry: './lib/axios/index.ts',
      name: 'axios',
      fileName: (format: any) => `axios.${format}.js`
    }
  }
})
