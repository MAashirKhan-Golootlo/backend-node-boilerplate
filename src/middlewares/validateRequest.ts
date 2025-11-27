import type { RequestHandler } from 'express';
import type Joi from 'joi';
import HttpError from '../core/httpError';

type SchemaMap = {
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
};

const validateRequest =
  (schema: SchemaMap): RequestHandler =>
  (req, _res, next) => {
    const segments: Array<keyof SchemaMap> = ['body', 'params', 'query'];

    for (const segment of segments) {
      if (schema[segment]) {
        const { error, value } = schema[segment]!.validate(req[segment], {
          abortEarly: false,
          stripUnknown: true
        });

        if (error) {
          return next(
            new HttpError(400, 'Validation failed', {
              segment,
              details: error.details.map((detail) => detail.message)
            })
          );
        }

        (req as Record<string, unknown>)[segment] = value;
      }
    }

    next();
  };

export default validateRequest;

