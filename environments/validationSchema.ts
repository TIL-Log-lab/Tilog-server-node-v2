import Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().valid('local', 'dev', 'prod').default('local'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
});
