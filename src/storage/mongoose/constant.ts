const status = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive'
};

const departments = {
  FINANCE: 'Finance',
  OPERATIONS: 'Operations',
  ENGINEERING: 'Engineering',
  HUMAN_RESOURCE: 'Human Resource',
  QUALITY_ASSURANCE: 'Quality Assurance',
  TECHNICAL_SUPPORT: 'Technical Support',
  TALENT_ACQUISITION: 'Talent Acquisition'
}

export const CONSTANTS = {
  EMPLOYEE_STATUS: status,
  EMPLOYEE: {
    DEPARTMENT_ENUM: Object.values(departments),
    STATUS_ENUM: Object.values(status),
    DEFAULT_STATUS: status.ACTIVE
  }
};
