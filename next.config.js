const { withExpo } = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images')

module.exports = withExpo(
  withFonts(
    withImages({
      projectRoot: __dirname,
    })
  )
)
