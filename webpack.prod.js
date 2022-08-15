const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// Webpack config for production: will make minified build
// and dump all required assets into `/public` folder. 
// Type `npm run-script build` command)
module.exports = function(env) {    
  return merge(common(env), {
    mode: 'production',
  });
};