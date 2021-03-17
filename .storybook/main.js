const path = require('path')

module.exports = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    })

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    })

    config.resolve.extensions.push('.ts', '.tsx')

    return config
  }
}
