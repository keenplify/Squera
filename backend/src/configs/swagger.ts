import {getMe} from "../openAPI/v1/user.swagger";

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
      version: '1.0.0',
      title: 'Quera Backend',
      description: 'Test Swagger ',
      termsOfService: '',
      contact: {
          name: 'Aczell Florencio',
          email: 'keenplify@gmail.com',
          url: 'https://keenplify.github.io'
      },
      license: {
          name: 'Apache 2.0',
          url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
      }
  },
  tags: [
    {
      name: "User"
    }
  ],
  servers: [
    {
      url: 'http://localhost:3777/api/v1',
      description: 'Local server'
    }
  ],
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  },
  paths: {
    "/users/me": {
      "get": getMe
    }
  }
}