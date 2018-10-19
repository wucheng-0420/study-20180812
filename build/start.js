// Set the current environment
process.env.NODE_ENV = 'development';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { choosePort, prepareUrls, createCompiler } = require('react-dev-utils/WebpackDevServerUtils');


const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;


// Returns a Promise resolving to either defaultPort or next available port if the user confirms it is okay to do. 
// If the port is taken and the user has refused to use another port, or if the terminal is not interactive and can’t present user with the choice, resolves to null
// choosePort(host: string, defaultPort: number): Promise<number | null>
choosePort(HOST, DEFAULT_PORT).then(port => {
  if (port) {
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const config = require('./webpack.config')();
    const { name: appName } = require(path.join(__dirname, '../package.json'));
    // Returns an object with local and remote URLs for the development server. 
    // Pass this object to createCompiler() described above.
    // prepareUrls(protocol: string, host: string, port: number): Object
    const urls = prepareUrls(protocol, HOST, port);
    const useYarn = fs.existsSync(path.join(__dirname, '../yarn.lock'));
    // Creates a Webpack compiler instance for WebpackDevServer with built-in helpful messages.
    // Takes the require('webpack') entry point as the first argument.
    // To provide the urls argument, use prepareUrls() described below.
    // createCompiler(webpack: Function, config: Object, appName: string, urls: Object, useYarn: boolean): WebpackCompiler
    const compiler = createCompiler(webpack, config, appName, urls, useYarn);
    const devServer = new WebpackDevServer(compiler, {
      // webpack-dev-server options
    
      contentBase: "/path/to/directory",
      // Can also be an array, or: contentBase: "http://localhost/",
    
      hot: true,
      // Enable special support for Hot Module Replacement
      // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
      // Use "webpack/hot/dev-server" as additional module in your entry point
      // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does. 
    
      // Set this as true if you want to access dev server from arbitrary url.
      // This is handy if you are using a html5 router.
      historyApiFallback: false,
    
      // Set this if you want to enable gzip compression for assets
      compress: true,
    
      // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
      // Use "**" to proxy all paths to the specified server.
      // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
      // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
      proxy: {
        "**": "http://localhost:9090"
      },
    
      setup: function(app) {
        // Here you can access the Express app object and add your own custom middleware to it.
        // For example, to define custom handlers for some paths:
        // app.get('/some/path', function(req, res) {
        //   res.json({ custom: 'response' });
        // });
      },
    
      // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
      staticOptions: {
      },
    
      // webpack-dev-middleware options
      quiet: false,
      noInfo: false,
      lazy: true,
      filename: "bundle.js",
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      // It's a required option.
      publicPath: "/assets/",
      headers: { "X-Custom-Header": "yes" },
      stats: { colors: true }
    });
    devServer.listen(port, HOST, error => {
      
    });
  }
}).catch(error => {
  if (error && error.message) {
    console.log(error.message);
  }
  process.exit(1);
});

