module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extends',
          'apply',
          'tailwind',
          'components',
          'utilities',
          'screen'
        ]
      }
    ]
  }
}
