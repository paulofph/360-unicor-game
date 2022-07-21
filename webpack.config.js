/* eslint-disable @typescript-eslint/no-var-requires */
const singleSpaDefaults = require('@epilot360/webpack-config-epilot360')
const { merge } = require('webpack-merge')

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'epilot360',
    projectName: 'unicorn-game',
    webpackConfigEnv,
    argv
  })

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    externals: ['react', 'react-dom']
  })
}
