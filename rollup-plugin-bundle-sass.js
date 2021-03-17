const sass = require('sass')
const fs = require('fs/promises')
const util = require('util')

const renderSass = util.promisify(sass.render)

export default ({ targets }) => {
  return {
    name: 'bundle-sass',
    generateBundle() {
      targets.forEach(async ({ src: file, dest: fileName }) => {
        const result = await renderSass({ file })
        await fs.writeFile(fileName, result.css)

        // this.emitFile({
        //   type: 'asset',
        //   fileName,
        //   source: result.css
        // })
      })
    },
    buildEnd() {
      console.log("Sass bundle completed!")
    }
  }
}
