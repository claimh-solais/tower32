// const ManifestPlugin = require('webpack-manifest-plugin');
// const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
const { join } = require("path")

module.exports = {
  "publicPath": "/asset/",
  "outputDir": "dist/public/",
  "devServer": {
    "host": "0.0.0.0",
    "port": 3001,
    "compress": true,
    "disableHostCheck": true,
    "noInfo": true,
    "open": false,
    "hot": true,
    "inline": true
  },
  "configureWebpack": {
    "resolve": {
      "alias": {
        '@': join(__dirname, './src/frontend/')
      }
    },
    "entry": {
      "app": join(__dirname, './src/frontend/', 'main.js')
    },
    "plugins": [
      {
        apply: compiler => {
          compiler.hooks.entryOption.tap('entry', () => {
            const clients = compiler.options.entry.app
            for (const index in clients) {
              if (clients[index].match(/localhost/)) {
                clients[index] = clients[index].replace('localhost', '0.0.0.0')
              }
            }
          })
        }
      }
    ]
  },
  "transpileDependencies": [
    "vuetify"
  ]
}
