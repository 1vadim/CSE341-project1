const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: 'My Project API',
    description: 'Documentation for my CSE341 project2'
  },
  host: 'localhost:3000',
  definitions: {
    Contact: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-01-15'
    },
    ValidationError: {
      errors: [
        {
          type: 'field',
          value: 'not-an-email',
          msg: 'Please provide a valid email address.',
          path: 'email',
          location: 'body'
        }
      ]
    },
    GeneralError: {
      status: 'error',
      statusCode: 404,
      message: 'Contact with the specified ID was not found.'
    }
  }
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/index.js"]; 

swaggerAutogen(outputFile, routes, doc);
