const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Vendors Api',
        description: 'Vendors Api'
    },
    host: 'cse341-project2-hhgl.onrender.com',
    schemes: ['http', 'https']
}

const outputFile = './swagger.json';
const endpoinstFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpoinstFiles, doc);