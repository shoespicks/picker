const stylelintConfig = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order', 'stylelint-prettier/recommended'],
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      customSyntax: '@stylelint/postcss-css-in-js',
    },
  ],
  rules: {
    'value-keyword-case': null,
  },
  ignoreFiles: ['**/node_modules/**'],
};

module.exports = stylelintConfig;
