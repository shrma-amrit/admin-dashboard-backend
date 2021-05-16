import { BaseRepo } from './base-repo';
import { RepoContext } from './repo-context';
import { CONSTANTS } from './constant';
import { Employee, ModelFactory } from '../../models';

export class EmployeeRepo extends BaseRepo<Employee> {
  constructor(context: RepoContext) {
    super(context);
  }

  protected modelFactory(): ModelFactory<Employee> {
    return {
      getType() {
        return CONSTANTS.REPO_TYPE.EMPLOYEE;
      },
      create(json: any) {
        return new Employee(json);
      }
    };
  }
}
