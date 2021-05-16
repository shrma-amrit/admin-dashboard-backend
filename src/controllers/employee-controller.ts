import { NextFunction, Request, Response, Router } from 'express';

import { BaseController } from './base-controller';
import { Validation } from '../helpers';
import { AppContext, Errors, LooseObject, ValidationFailure } from '../typings';
import { Employee } from '../models';

export class EmployeeController extends BaseController {
  public basePath: string = '/employee';
  public router: Router = Router();

  constructor(ctx: AppContext) {
    super(ctx);
    this.initializeRoutes();
  }

  private initializeRoutes() {}
}
