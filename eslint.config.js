// eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  // 1) 要 lint 的文件集合（保持你的原样）
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  // 2) 全局忽略（保持你的原样，顺便忽略 functions 的 node_modules）
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'functions/node_modules/**']),

  // 3) 浏览器端语言环境（保持你的原样）
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // 4) 官方 JS 推荐规则 + Vue 基础规则 + 跳过格式化冲突（保持你的原样）
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,

  // 5) ✅ 为 Firebase Functions（Node + CommonJS）添加覆盖
  {
    name: 'functions/node-cjs',
    files: ['functions/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'script', // CommonJS 脚本
      globals: {
        // Node 全局
        ...globals.node,
        // 明确声明这几个，避免 no-undef
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      // 如仍有外部插件对 require/export 提示问题，可在此处关闭或定制
      // 'no-undef': 'off',
    },
  },
])

