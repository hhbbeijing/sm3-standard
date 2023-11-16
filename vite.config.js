import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// vite默认会打包出umd和es模块化两种导出方式的文件，以下配置会打包出两份结果：
export default defineConfig({
    plugins: [dts()],
    build: {
        lib: {
            entry: resolve(__dirname, './src/sm3.ts'),
            name: 'sm3',
            // 构建好的文件名（不包括文件后缀）
            fileName: 'sm3',
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue'],
            output: {
                // 在 UMD 构建模式下,全局模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    liteMove: 'sm3',
                },
            },
        },
    },
})
