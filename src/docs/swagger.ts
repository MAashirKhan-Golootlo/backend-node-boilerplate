import swaggerJsdoc from 'swagger-jsdoc';
import config from '../config';

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Golootlo Backend Starter',
    version: '1.0.0',
    description: 'Feature-based Express + TypeScript API starter.'
  },
  servers: [
    {
      url: `http://localhost:${config.port}`,
      description: 'Local development'
    }
  ],
  tags: [
    {
      name: 'Users',
      description: 'User management feature'
    }
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'user_123' },
          name: { type: 'string', example: 'Ada Lovelace' },
          email: { type: 'string', example: 'ada@example.com' },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      CreateUserInput: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string', example: 'Grace Hopper' },
          email: { type: 'string', example: 'grace@example.com' }
        }
      },
      ApiError: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Validation failed' },
              details: { type: 'object' }
            }
          },
          requestId: { type: 'string', example: 'req-123' }
        }
      }
    }
  },
  paths: {
    '/api/v1/users': {
      get: {
        tags: ['Users'],
        summary: 'List users',
        responses: {
          200: {
            description: 'List of users',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Users'],
        summary: 'Create user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateUserInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'User created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' }
              }
            }
          }
        }
      }
    }
  }
};

const swaggerSpec = swaggerJsdoc({
  definition: swaggerDefinition,
  apis: []
});

export default swaggerSpec;

