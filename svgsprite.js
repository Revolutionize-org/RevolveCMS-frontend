import fs from 'fs-extra'
import {optimize} from 'svgo'
import svgStore from 'svgstore'

const src = './src/assets/icons/'
const dest = './public/icons.svg'

const sprite = svgStore({
    cleanDefs: true,
    cleanSymbols: true,
    svgAttrs: { style: 'display:none' }
})

fs.readdir(src)
    .then(files =>
        files
            .filter(file => /\.svg$/.test(file))
            .map(file => ({
                id: file.replace(/\.svg$/, ''),
                path: src + file
            }))
    )
    .then(files => {
        const n = files.length
        files.forEach(({ id, path }) => sprite.add(id, fs.readFileSync(path, 'utf8')))

        optimize(sprite, {path: dest})

        fs.outputFile(dest, sprite)
            .then(() => console.log(`Successfully compiled ${n} icon${n > 1 ? 's' : ''}`))
            .catch(err => {
                throw err
            })
    })
