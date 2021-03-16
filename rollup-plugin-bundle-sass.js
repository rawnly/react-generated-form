const sass = require('sass')
const util = require('util')

const renderSass = util.promisify(sass.render)

export default ({ targets }) => {
  return {
    name: 'bundle-sass',
    generateBundle() {
      targets.forEach(async ({ src: file, dest: fileName }) => {
        const result = await renderSass({ file })

        this.emitFile({
          type: 'asset',
          fileName,
          source: result.css
        })
      })
    },
    buildEnd() {
      console.log("Sass bundle completed!")
    }
  }
}
