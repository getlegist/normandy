module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	globals: {
		chrome: true,
	},
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js', 'dist/'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'no-restricted-globals': 0,
		'no-plusplus': 0,
		'@typescript-eslint/no-empty-function': 0,
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/member-delimiter-style': 0,
		'prettier/prettier': 0,
		'class-methods-use-this': 0,
		'import/newline-after-import': 0,
		// "@typescript-eslint/no-empty-function": 0,
		'no-shadow': 0, // This is just for enums until https://github.com/typescript-eslint/typescript-eslint/issues/325 is fixed,
		camelcase: 0,
		'import/no-cycle': 0,
		'react/jsx-filename-extension': 0,
		'react/prop-types': 0,
		'react/jsx-props-no-spreading': 0,
		'import/no-named-default': 0,
		'no-use-before-define': 0,
		'import/no-unresolved': 0,
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts'],
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.ts'],
			},
		},
	},
}
