import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { AssetService } from './asset/asset.service';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly assetService: AssetService,
    ) { }

  @Get()
  @Render('home/page.njk')
  async home() {
      const headTagHTML = await this.assetService.getHeadTagHTML();
      return { headTagHTML };
  }
}

/*

    '/*.html': {
        GET: async function (req, res, next) {
            const { shopId } = req
            let filepath = req.query.template || req.url

            const categoryInfos = await req
                .sitecommerce('category', 'findAll')
                .exec({ shopId })
                .catch(next)

            const tmplContent = await loadTemplate({
                filepath,
                api: req.sitecommerce,
                shopId,
                namespace: null,
                data: {
                    categories: categoryInfos.results,
                },
            })

            return res
                .header('Content-Type', 'text/html')
                .status(200)
                .end(tmplContent)
        },
    },

    '/*.:ext': {
        GET: async function (req, res, next) {
            const { shopId } = req
            const filepath = req.query.template || req.url

            let srcContent, mimetype

            const fileResult = await req
                .sitecommerce('file', 'getContent')
                .exec({ filepath }, { shopId })
                .catch((err) => new Error(err))

            if (fileResult instanceof Error) {
                const reqResult = await asyncRequest({
                    method: 'GET',
                    baseUrl: proxiedAppDomainURL,
                    url: filepath,
                }).catch(next)

                srcContent = reqResult.body
                mimetype = reqResult.resp.headers['content-type']
            }
            else {
                srcContent = Buffer.isBuffer(fileResult.data)
                    ? fileResult.data.toString('utf8')
                    : String(fileResult.data)
                mimetype = fileResult.results.mimetype
            }

            return res
                .header('Content-Type', mimetype)
                .status(200)
                .end(srcContent)
        },
    },

    '/*': {
        GET: async function (req, res, next) {
            const { shopId } = req

            let filepath = req.query.template || req.url
            if (_.isEmpty(filepath) || _.isEqual(filepath, '/')) {
                filepath = `/cms/home.html`
            }
            else {
                filepath = $.path.normalize(`/cms/${filepath}`)
            }

            const categoryInfos = await req
                .sitecommerce('category', 'findAll')
                .exec({ shopId })
                .catch(next)

            const tmplContent = await loadTemplate({
                filepath,
                api: req.sitecommerce,
                shopId,
                namespace: 'cms',
                data: {
                    categories: categoryInfos.results,
                },
            })

            return res
                .header('Content-Type', 'text/html')
                .status(200)
                .end(tmplContent)
        },
    },
*/
