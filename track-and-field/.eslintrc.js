module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: ['vue', 'import'],
  // add your custom rules here
  rules: {
    'no-extra-semi': 'warn',
    quotes: ['warn', 'single'],
    'no-console': 'off',
    'vue/multi-word-component-names': 'off'
  },
  ignorePatterns: ['dist', '**/generated', '.nuxt', 'node_modules']
};
