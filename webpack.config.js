const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native-linear-gradient': 'react-native-web-linear-gradient',
  }

  if (config.mode === 'development') {
    config.devServer.compress = false
  }

  return config
}
