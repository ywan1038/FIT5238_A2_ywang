
module.exports = {
  root: true,
  env: { node: true, es2021: true },
  extends: ['eslint:recommended'],
  parserOptions: { ecmaVersion: 2021, sourceType: 'script' }, // CommonJS
  rules: {
    // 这里可以按需补充/覆盖，比如:
    // 'no-console': 'off',
  },
}
