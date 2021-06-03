/* eslint-disable no-mixed-spaces-and-tabs */
module.exports = {
  'env': {
	  'browser': true,
	  'commonjs': true,
	  'node': true,
	  'es2021': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
	  'ecmaVersion': 12
  },
  'rules': {
	  'indent': [
      'error',
      2
	  ],
	  'eqeqeq': 'error',
	  'linebreak-style': 0,
	  'quotes': [
      'error',
      'single'
	  ],
	  'semi': [
      'error',
      'never'
	  ],
	  'no-trailing-spaces': 'error',
	  'object-curly-spacing': [
      'error', 'always'
	  ],
	  'arrow-spacing': [
      'error', { 'before': true, 'after': true }
	  ],
	  'no-console': 0
  }
}