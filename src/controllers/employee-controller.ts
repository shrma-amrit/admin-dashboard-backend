import { NextFunction, Request, Response, Router } from 'express';

import { BaseController } from './base-controller';
import { Validation } from '../helpers';
import { AppContext, Errors, LooseObject, ValidationFailure } from '../typings';
import { Employee } from '../models';
import { SCHEMA_CONSTANTS } from '../storage/mongoose';

export class EmployeeController extends BaseController {
  public basePath: string = '/employee';
  public router: Router = Router();

  constructor(ctx: AppContext) {
    super(ctx);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.basePath}`,
      // updateUserValidator(this.appContext),
      this.createEmployee
    );
    this.router.get(
      `${this.basePath}`,
      // updateUserValidator(this.appContext),
      this.getAllEmployees
    );
    this.router.get(
      `${this.basePath}/:employeeId`,
      // updateUserValidator(this.appContext),
      this.getEmployee
    );
    this.router.patch(
      `${this.basePath}/:employeeId`,
      // updateUserValidator(this.appContext),
      this.updateEmployee
    );
    this.router.delete(
      `${this.basePath}/:employeeId`,
      // updateUserValidator(this.appContext),
      this.deactivateEmployee
    );
  }

  private createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const failures: ValidationFailure[] = Validation.extractValidationErrors(
        req
      );
      if (failures.length > 0) {
        const valError = new Errors.ValidationError(
          res.__('DEFAULT_ERRORS.VALIDATION_FAILED'),
          failures
        );
        return next(valError);
      }

      const {
        name,
        salary,
        email,
        phone,
        department,
      } = req.body;

      const newEmployee = new Employee({
        name,
        salary,
        email,
        phone,
        status: SCHEMA_CONSTANTS.EMPLOYEE_STATUS.ACTIVE,
        department
      });

      const result = await this.appContext.employeeRepo.save(newEmployee);

      res.status(201).json(result.serialize());
    } catch (err) {
      next(err);
    }
  };

  private getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const failures: ValidationFailure[] = Validation.extractValidationErrors(
        req
      );
      if (failures.length > 0) {
        const valError = new Errors.ValidationError(
          res.__('DEFAULT_ERRORS.VALIDATION_FAILED'),
          failures
        );
        return next(valError);
      }

      const searchQuery: LooseObject = { status: SCHEMA_CONSTANTS.EMPLOYEE_STATUS.ACTIVE };

      const result = await this.appContext.employeeRepo.getAll(searchQuery);

      res.status(201).json(result.map(employee => employee.serialize()));
    } catch (err) {
      next(err);
    }
  };

  private getEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const failures: ValidationFailure[] = Validation.extractValidationErrors(
        req
      );
      if (failures.length > 0) {
        const valError = new Errors.ValidationError(
          res.__('DEFAULT_ERRORS.VALIDATION_FAILED'),
          failures
        );
        return next(valError);
      }

      const { employeeId } = req.params;

      const searchQuery: LooseObject = {
        _id: employeeId,
        status: SCHEMA_CONSTANTS.EMPLOYEE_STATUS.ACTIVE
      }

      const result = await this.appContext.employeeRepo.findOne(searchQuery);

      res.status(201).json(result.serialize());
    } catch (err) {
      next(err);
    }
  };

  private updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const failures: ValidationFailure[] = Validation.extractValidationErrors(
        req
      );
      if (failures.length > 0) {
        const valError = new Errors.ValidationError(
          res.__('DEFAULT_ERRORS.VALIDATION_FAILED'),
          failures
        );
        return next(valError);
      }

      const {
        name,
        salary,
        email,
        phone,
        department,
      } = req.body;

      const { employeeId } = req.params;

      const searchQuery: LooseObject = {
        _id: employeeId,
        status: SCHEMA_CONSTANTS.EMPLOYEE_STATUS.ACTIVE
      }

      const updateQuery: LooseObject = JSON.parse(JSON.stringify({
        name,
        salary,
        email,
        phone,
        department,
      }));

      const result = await this.appContext.employeeRepo.update(searchQuery, updateQuery);

      res.status(201).json(result.serialize());
    } catch (err) {
      next(err);
    }
  };  
  
  private deactivateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const failures: ValidationFailure[] = Validation.extractValidationErrors(
        req
      );
      if (failures.length > 0) {
        const valError = new Errors.ValidationError(
          res.__('DEFAULT_ERRORS.VALIDATION_FAILED'),
          failures
        );
        return next(valError);
      }

      const { employeeId } = req.params;

      const searchQuery: LooseObject = {
        _id: employeeId,
        status: SCHEMA_CONSTANTS.EMPLOYEE_STATUS.ACTIVE
      }

      const updateQuery: LooseObject = {
        status: SCHEMA_CONSTANTS.EMPLOYEE_STATUS.INACTIVE
      }

      const result = await this.appContext.employeeRepo.update(searchQuery, updateQuery);

      res.status(201).json(result.serialize());
    } catch (err) {
      next(err);
    }
  };
}
