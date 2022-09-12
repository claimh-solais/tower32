const { join } = require("path")

module.exports = {
  "publicPath": "https://192.168.56.200:30001/asset/",
  "outputDir": "dist/public/",
  "devServer": {
    "host": "0.0.0.0",
    "port": 30001,
    "compress": false,
    "disableHostCheck": true,
    "noInfo": true,
    "open": false,
    "hot": true,
    "inline": true,
    "liveReload": true,
    "https": true,
    "headers": {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
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
              if (clients[index].match(/10.0.2.15:30001\/sockjs-node/)) {
                clients[index] = clients[index].replace(/10.0.2.15:30001\/sockjs-node/, '192.168.56.200:30001/sockjs-node')
              }
            }
          })
        }
      }
    ],
  },
  "transpileDependencies": [
    "vuetify"
  ]
}
