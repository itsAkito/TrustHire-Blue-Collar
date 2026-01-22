import Joi from 'joi';

export const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('worker', 'employer').required(),
  });
  return schema.validate(data);
};

export const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

export const validateJobCreation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(5000).required(),
    location: Joi.string().required(),
    salary: Joi.string().allow(''),
    jobType: Joi.string().valid('full-time', 'part-time', 'contract').required(),
    requirements: Joi.string().allow(''),
  });
  return schema.validate(data);
};

export const validateUpdateProfile = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50),
    phone: Joi.string().allow(''),
    bio: Joi.string().max(5000),
    skills: Joi.string().allow(''),
    experience: Joi.number().min(0),
  });
  return schema.validate(data);
};
