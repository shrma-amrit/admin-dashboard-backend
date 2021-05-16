import bodyParser from 'body-parser';
import config from 'config';
import express, { Application } from 'express';
import { Server } from 'http';
import i18n from 'i18n';
import path from 'path';

import {
  BaseController,
  EmployeeController
} from '../controllers';
import { ErrorHandler } from '../middleware';
import { EventListeners } from '../server';
import { AppContext } from '../typings';

export class App {
  public expressApp: Application;
  private ctx: AppContext;

  constructor(ctx: AppContext) {
    this.expressApp = express();
    this.ctx = ctx;
  }

  public listen(): Server {
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeErrorHandling();
    const PORT = process.env.PORT || 4200;
    const server = this.expressApp.listen(PORT);
    server.on('listening', EventListeners.onListening);
    server.on('error', EventListeners.onError);
    return server;
  }

  public initializeMiddlewares() {
    i18n.configure({
      autoReload: true,
      directory: path.join(__dirname, '../locales'),
      objectNotation: true
    });
    this.expressApp.use(i18n.init);

    this.expressApp.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Accept-Language'
      );
      next();
    });

    this.expressApp.use(bodyParser.json());
  }

  public initializeErrorHandling() {
    this.expressApp.use(ErrorHandler.notFoundHandler);
    this.expressApp.use(ErrorHandler.serverErrorHandler);
  }

  public initializeControllers() {
    const controllers: BaseController[] = [
      new EmployeeController(this.ctx)
    ];

    for (const ctrl of controllers) {
      this.expressApp.use('/', ctrl.router);
    }
  }
}
