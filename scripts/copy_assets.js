const fs = require('fs')
const path = require('path')

const assetsDir = path.join(__dirname, '..', 'src', 'assets', 'projects')
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true })
}

const images = [
  { src: 'C:/Users/HP/.gemini/antigravity/brain/03de6582-a419-4ab8-8e22-5f36eab3c556/dgnews_1775506750527.png', dest: 'dgnews.png' },
  { src: 'C:/Users/HP/.gemini/antigravity/brain/03de6582-a419-4ab8-8e22-5f36eab3c556/tiffin_1775506821552.png', dest: 'tiffin.png' },
  { src: 'C:/Users/HP/.gemini/antigravity/brain/03de6582-a419-4ab8-8e22-5f36eab3c556/ipl_1775506782317.png', dest: 'ipl.png' }
]

images.forEach(img => {
  if (fs.existsSync(img.src)) {
    fs.copyFileSync(img.src, path.join(assetsDir, img.dest))
    console.log(`Copied ${img.dest}`)
  } else {
    console.error(`Missing source: ${img.src}`)
  }
})
