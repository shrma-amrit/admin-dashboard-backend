// tslint:disable-next-line: no-var-requires
require('module-alias/register');
import i18n from 'i18n';
import { App } from './app';
import { Mongoose, Repos } from '../storage';
import { AppContext } from '../typings';

console.info('www - Initializing HTTP server...');
console.info('www - Initializing connection to Mongo Store...');

const mongoStore = new Mongoose.MongoStore();

const repoContext = {
  store: mongoStore,
  translate: i18n.__
};

const appContext: AppContext = {
  employeeRepo: new Repos.EmployeeRepo(repoContext)
};

mongoStore
  .connect()
  .then(() => {
    console.info('www - Connection to Mongo Store succeeded...');
    const app = new App(appContext);
    const server = app.listen();
    console.info('www - Server started...');
    process.on('SIGINT', () => {
      console.info(
        'www - sigint event received, attempting to shut down application...'
      );
      server.close((err) => {
        if (err) {
          console.error(
            `www - encountered error while shutting down server - ${err.message}`
          );
          process.exit(1);
        } else {
          console.info(
            'www - server was closed gracefully, shutting down...'
          );
          process.exit(0);
        }
      });
    });
  })
  .catch((err) => {
    console.error(`Error starting HTTP server: ${err.message}`);
  });
