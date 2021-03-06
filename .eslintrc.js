module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-alert': 'off',
    'no-console': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-filename-extension': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
  },
};
