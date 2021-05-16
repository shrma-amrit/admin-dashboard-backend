import { BaseModel } from './base-model';
import { LooseObject } from '../typings';

export class Employee extends BaseModel {
  name: string;
  email: string;
  phone: string;
  status: string;
  salary: number;
  doj?: Date;

  constructor(json?: any) {
    super(json);
    if (json) {
      this.name = json.name;
      this.email = json.email;
      this.phone = json.phone;
      this.status = json.status;
      this.salary = json.salary;
      if (json.doj) {
        this.doj = json.createdAt;
      }
    }
  }

  public serialize(): LooseObject {
    const employee: LooseObject = {
      id: this._id,
      name : this.name,
      email : this.email,
      phone : this.phone,
      status : this.status,
      salary : this.salary,
      doj : this.doj
    };

    return employee;
  }
}
