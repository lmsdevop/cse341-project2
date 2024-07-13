const Product = require('../models/Products')

const getAllProducts = async (req, res) => {
    //#swagger.tags=['Products']    

    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const getSingleProduct = async (req, res) => {
    //#swagger.tags=['Products']    

    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.status(200).json(product);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

const createProduct = async (req, res) => {
    //#swagger.tags=['Products']    

    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        console.log('Product created:', newProduct);
        return res.status(204).json(newProduct);
    } catch (err) {
        console.error('Error creating product:', err);
        throw err;
    }
};

const updateProduct = async (req, res) => {
    //#swagger.tags=['Products']    

    try {
        const productId = req.params.id;
        const { productName, description, price, category, stockQuantity } = req.body;
        
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            productName,
            description,
            price,
            category,
            stockQuantity,
            updatedAt: new Date(),
        }, { new: true });
        
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.status(204).json(updatedProduct);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

const deleteProduct = async (req, res) => {
    //#swagger.tags=['Products']    

    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}