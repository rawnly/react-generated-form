const path = require( 'path' )

module.exports = {
  stories: [ "../src/**/*.stories.@(ts|tsx)" ],
  addons: [ {
    name: '@storybook/addon-postcss',
    options: {
      postcssLoaderOptions: {
        implementation: require( 'postcss' ),
      },
    },
  }, ],
  webpackFinal: async config => {
    // config.module.rules.push( {
    //   test: /\.css$/,
    //   use: [ 'style-loader', 'css-loader' ]
    // } )

    config.module.rules.push({
      test: /\,css&/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('tailwindcss'),
              require('autoprefixer')
            ]
          }
        }
      ],
      include: path.resolve(__dirname, '../'),
    })

    config.module.rules.push( {
      test: /\.scss$/,
      use: [ 'style-loader', 'css-loader', 'sass-loader' ]
    } )

    config.resolve.extensions.push( '.ts', '.tsx' )

    return config
  }
}
