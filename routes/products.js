const express = require('express');
const router = express.Router();
const productsController = require('../controllers/Products');
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getSingleProduct);
router.post('/', isAuthenticated, productsController.createProduct);
router.put('/:id', isAuthenticated, productsController.updateProduct);
router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;
    