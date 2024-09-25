Muutoksia:

- Jos puussa on maalipinta se on lakattu, esim puu on harmaa se on lakattu. Ulkokalusteet voi olla mustia mutta ne ei ole lakattu.
- PINTAKÄSITTELY Kaikki ulkokalusteet on aina öljytty, vaikka olisivat mustia.
- Muissa tuotteissa musta väri tai muu väri tarkoittaa sen olevan lakattu (maalattu).
- Jokaiseen valintaan Sonner niinkuin oli outdoorissa

puunvärinen saunajakkara huolletaan samoin kuin normaalit öljytyt huonekalut. Mustan saunajakkaran tilanne on hieman eri: mikäli musta väri ei ole kulunut puhki, käytetään samaa ohjeistusta kuin kaikissa öljytyissä. Jos musta väri on kulunut puhki, pyydetään ottamaan yhteyttä sales@nikari.fi

- Fixaa että muuntaa kaikki kuvat tiettyyn muotoon nyt saan virheen.
Error in POST /api/visio/ BadRequestError: 400 You uploaded an unsupported image. Please make sure your image is below 20 MB in size and is of one the following formats: ['png', 'jpeg', 'gif', 'webp'].
    at APIError.generate (webpack-internal:///(rsc)/./node_modules/openai/error.mjs:60:20)
    at OpenAI.makeStatusError (webpack-internal:///(rsc)/./node_modules/openai/core.mjs:304:65)
    at OpenAI.makeRequest (webpack-internal:///(rsc)/./node_modules/openai/core.mjs:347:30)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async POST (webpack-internal:///(rsc)/./app/api/visio/route.ts:125:26)
    at async C:\Users\h03068\dev\woodnotes\node_modules\next\dist\compiled\next-server\app-route.runtime.dev.js:6:55755
    at async eO.execute (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\compiled\next-server\app-route.runtime.dev.js:6:46523)
    at async eO.handle (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\compiled\next-server\app-route.runtime.dev.js:6:57089)
    at async doRender (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\server\base-server.js:1359:42)
    at async cacheEntry.responseCache.get.routeKind (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\server\base-server.js:1581:28)
    at async DevServer.renderToResponseWithComponentsImpl (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\server\base-server.js:1489:28)
    at async DevServer.renderPageComponent (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\server\base-server.js:1920:24)
    at async DevServer.renderToResponseImpl (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\server\base-server.js:1958:32)
    at async DevServer.pipeImpl (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\server\base-server.js:917:25)
    at async NextNodeServer.handleCatchallRenderRequest (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\server\next-server.js:272:17)
    at async DevServer.handleRequestImpl (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\server\base-server.js:813:17)
    at async C:\Users\h03068\dev\woodnotes\node_modules\next\dist\server\dev\next-dev-server.js:339:20
    at async Span.traceAsyncFn (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\trace\trace.js:154:20)
    at async DevServer.handleRequest (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\server\dev\next-dev-server.js:336:24)
    at async invokeRender (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\server\lib\router-server.js:173:21)
    at async handleRequest (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\server\lib\router-server.js:350:24)
    at async requestHandlerImpl (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\server\lib\router-server.js:374:13)
    at async Server.requestListener (C:\Users\h03068\dev\woodnotes\node_modules\next\dist\server\lib\start-server.js:141:13) {
  status: 400,
  headers: {
    'access-control-expose-headers': 'X-Request-ID',
    'cf-cache-status': 'DYNAMIC',
    'cf-ray': '8c88c35efc6c376e-HEL',
    connection: 'keep-alive',
    'content-length': '284',
    'content-type': 'application/json',
    date: 'Wed, 25 Sep 2024 05:55:04 GMT',
    'openai-organization': 'user-h9a2tzk28ilkxludkdpeodwe',
    'openai-processing-ms': '87',
    'openai-version': '2020-10-01',
    server: 'cloudflare',
    'set-cookie': '__cf_bm=ZTCQk4VLNHRctSIxVsA_Q1Wa8fsyRMp_f_EeiJJk9VE-1727243704-1.0.1.1-9I0J8Why7gzUllJDJ.PE03mtrfa3.L.GxP6QfYmbT5MW1LsMRsTX.KZuEy4dsflV87bxf3MbrDdrsMQ_B.Rn1A; path=/; expires=Wed, 25-Sep-24 06:25:04 GMT; domain=.api.openai.com; HttpOnly; Secure; SameSite=None, _cfuvid=1Eh6fhxbJ.RuKFkA6HRDX5f.GQlKrR4AM4THHqlvrpA-1727243704580-0.0.1.1-604800000; path=/; domain=.api.openai.com; HttpOnly; Secure; SameSite=None',
    'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
    'x-content-type-options': 'nosniff',
    'x-ratelimit-limit-requests': '5000',
    'x-ratelimit-limit-tokens': '800000',
    'x-ratelimit-remaining-requests': '4999',
    'x-ratelimit-remaining-tokens': '797955',
    'x-ratelimit-reset-requests': '12ms',
    'x-ratelimit-reset-tokens': '153ms',
    'x-request-id': 'req_e7d7133a1be2ef47dd14c56533490248'
  },
  request_id: 'req_e7d7133a1be2ef47dd14c56533490248',
  error: {
    message: "You uploaded an unsupported image. Please make sure your image is below 20 MB in size and is of one the following formats: ['png', 'jpeg', 'gif', 'webp'].",
    type: 'invalid_request_error',
    param: null,
    code: 'invalid_image_format'
  },
  code: 'invalid_image_format',
  param: null,
  type: 'invalid_request_error'
}
 POST /api/visio 200 in 4741ms
