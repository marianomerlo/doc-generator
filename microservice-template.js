const containerFactory     = require('./src/containerFactory');
// ---

if (require.main === module) {
  main();
}

// ---

function main() {
  containerFactory.createContainer().resolve(function (app, config) {
    app.listen(config.express.port, config.express.host, () => {
      console.info(`listening on ${config.express.host}:${config.express.port} ...`);
    });
  });
}
