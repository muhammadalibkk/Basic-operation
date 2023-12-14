const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    components: {},
    info: {
      title: 'Objection JS',
      version: '1.0.0',
      description: 'Descripution',
    },
    servers:[
        {
            api:"http://localhost:8080/"
        }
    ]
  },
  apis: ['./routes/*.js'], // Path to the API routes folder
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerSpec,
  swaggerUi,
};

