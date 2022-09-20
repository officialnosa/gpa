const { getDefaultConfig } = require('expo/metro-config')
const { makeMetroConfig } = require('@rnx-kit/metro-config')
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks')

const config = getDefaultConfig(__dirname)

// Remove all console logs in production...
config.transformer.minifierConfig.compress.drop_console = true

module.exports = makeMetroConfig({
  projectRoot: __dirname,
  resolver: {
    resolveRequest: MetroSymlinksResolver(),
  },
})