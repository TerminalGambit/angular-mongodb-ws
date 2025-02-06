
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://TerminalGambit.github.io/angular-mongodb-ws/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/https:/TerminalGambit.github.io/angular-mongodb-ws"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 543, hash: 'e1f4a03ba531e7149977aafaf219d5e3384e92a360761905bfafb1aa7284c87b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1056, hash: 'a4d583a7dee25af72e5be2e9b3682cb9dc7cbc5e4ff2bf179fc15cb259218320', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'https:/TerminalGambit.github.io/angular-mongodb-ws/index.html': {size: 4660, hash: '50f290ef89b1a39a2cdd0435b5a1a519b0fd5a07fa8f2919e004baa9bb951e2d', text: () => import('./assets-chunks/https:_TerminalGambit_github_io_angular-mongodb-ws_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
