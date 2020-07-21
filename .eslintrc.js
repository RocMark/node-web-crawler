module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    /* Coding Style 相關 */
    semi: ['error', 'never'], // 結尾分號
    'linebreak-style': 0, // 作業系統 LF & CRLF 差異
    'array-bracket-spacing': 'warn',
    'no-trailing-spaces': 'warn',
    'import/order': 'warn',
    'eol-last': 'warn',
    quotes: ['error', 'single'],
    'comma-dangle': 'warn',
    'operator-linebreak': 'warn',
    'arrow-body-style': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'object-curly-newline': 'off',
    'max-len': 'off',

    /* For Testing */
    'no-unused-vars': 'off',
    'no-console': 'off',
  },
}
