module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['@expo/next-adapter/babel'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.web.js',
            '.js',
            '.ts',
            '.tsx',
            '.json',
          ],
          alias: {
            tests: ['./tests/'],
            '@components': './src/components',
            '@lib': './src/lib',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@providers': './src/providers',
            '@redux': './src/redux',
            '@': './src',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  }
}
