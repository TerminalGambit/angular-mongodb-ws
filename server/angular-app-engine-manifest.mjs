
export default {
  basePath: 'https://TerminalGambit.github.io/angular-mongodb-ws',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
