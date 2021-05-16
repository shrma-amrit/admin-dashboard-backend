import { model, Schema } from 'mongoose';
import { validator } from 'validator';
import { CONSTANTS } from './constant';

const employeeSchema: Schema = new Schema(
  {
    name: { type: Schema.Types.String, required: true, unique: true },
    department: { type: Schema.Types.String, required: true, enum: CONSTANTS.EMPLOYEE.DEPARTMENT_ENUM },
    status: { type: Schema.Types.String, required: true, enum: CONSTANTS.EMPLOYEE.STATUS_ENUM, default: CONSTANTS.EMPLOYEE.DEFAULT_STATUS },
    salary: { type: Schema.Types.Number, required: true },
    phone: { type: Schema.Types.String, required: true, unique: true, validate: [ isMobilePhone, 'invalid phone number' ] },
    email: { type: Schema.Types.String, required: true, validate: [ isEmail, 'invalid email' ] },
  },
  {
    collection: 'employees',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

const employee = model('Employee', employeeSchema);
export default employee;
