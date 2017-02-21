module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // add your custom rules here
  'rules': {
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/first': 0,
    'import/newline-after-import': 0,
    'indent': 0,
    'no-unused-vars': 0,
    'no-tabs': 0,
    "max-len": ["warn", 200],
    'no-param-reassign': 0,
    'class-methods-use-this': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
