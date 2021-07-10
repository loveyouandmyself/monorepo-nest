module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: 'tsconfig.json',
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base/legacy',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'typescript',
    'prettier',
    'import',
  ],
  rules: {
    'quotes': [1, 'single'],
    'no-console': 1,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'new-cap': ['error', {
      'properties': false,
      'capIsNew': false,
    }],
    'import/no-extraneous-dependencies': 'off',
    'linebreak-style': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': ['error', {
      'args': 'after-used',
    }],
    'semi': [2, 'always'],
    'object-curly-spacing': [2, 'always'], // 大括号内是否允许不必要的空格
    'no-multi-spaces': 2, // 禁止多余空格
    'indent': ['error', 2], // 缩进空格
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    'comma-dangle': [2, 'always-multiline'],
    // 逗号前后空格
    'comma-spacing': [2, {
      'before': false,
      'after': true,
    }],
    // 控制逗号出现在行首还是行位
    'comma-style': [2, 'last'],
    // key后面添加空格
    'key-spacing': ['error', {
      'afterColon': true,
    }],
    // 
    'max-classes-per-file': ['off'],
    'no-shadow': 'off',
  },
};