module.exports = {
  env: { 
    "browser": true,
    "es2020": true,
    "es6": true,
    "jest/globals": true,
    "cypress/globals": true,
   },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh',"react", "jest", "cypress"],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'no-console': ["error", { allow: ["warn", "error"] }],
    "react/prop-types": 0,
  },
}
