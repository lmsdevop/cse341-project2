const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('MongoDB connected');

    app.use('/', require('./routes'));

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
});

