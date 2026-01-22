export const ROLES = {
  WORKER: 'worker',
  EMPLOYER: 'employer',
};

export const JOB_TYPES = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  CONTRACT: 'contract',
};

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn',
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',
  JOB_NOT_FOUND: 'Job not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden',
  BAD_REQUEST: 'Bad request',
};

export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  JOB_CREATED: 'Job created successfully',
  JOB_UPDATED: 'Job updated successfully',
  JOB_DELETED: 'Job deleted successfully',
  APPLICATION_SUBMITTED: 'Application submitted successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
};
