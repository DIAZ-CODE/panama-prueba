import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('config', () => {
  return {
    URL_PLATFORM: process.env.URL_PLATFORM,
    PORT: process.env.PORT,
    TOKEN_TELEGRAM: process.env.TOKEN_TELEGRAM,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  };
});

export const validationENV = () => {
  return Joi.object({
    URL_PLATFORM: Joi.string().required(),
    PORT: Joi.number().required(),
    TOKEN_TELEGRAM: Joi.string().required(),
    MONGO_URI: Joi.string().required(),
    MONGO_DB_NAME: Joi.string().required(),
  });
};
