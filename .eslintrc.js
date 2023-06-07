module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:vite/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'vite'],
  rules: {
    // Cấu hình các quy tắc tùy chỉnh
  },
};
