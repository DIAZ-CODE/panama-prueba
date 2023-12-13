import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('config', () => {
  return {
    URL_PLATFORM: process.env.URL_PLATFORM,
    PORT: process.env.PORT,
  };
});

export const validationENV = () => {
  return Joi.object({
    URL_PLATFORM: Joi.string().required(),
    PORT: Joi.number().required(),
  });
};
