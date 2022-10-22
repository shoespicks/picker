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
    'property-no-unknown': null,
    'function-name-case': null,
    'function-no-unknown': null,
  },
  ignoreFiles: ['**/node_modules/**'],
};

module.exports = stylelintConfig;
