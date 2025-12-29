import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ToolNext API',
      version: '1.0.0',
      description: 'Backend API for ToolNext project',
    },

    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],

    // ✅ ВОТ ЭТОГО НЕ ХВАТАЛО
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
        },
      },
    },
  },

  apis: ['./src/routes/*.js'],
});
