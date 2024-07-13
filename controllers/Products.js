const Product = require('../models/Products')

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const getSingleProduct = async (req, res) => {
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
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        console.log('Product created:', newProduct);
        return newProduct;
    } catch (err) {
        console.error('Error creating product:', err);
        throw err;
    }
};

const updateProduct = async (req, res) => {
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
        
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

const deleteProduct = async (req, res) => {
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





// const getSingleProduct = async (req, res) => {
//     //#swagger.tags=['Products']    

//     const productId = new ObjectId(req.params.id)
//     const result = await mongodb.getDatabase().db().collection('products').find({ _id: productId });
//     result.toArray().then((users) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(users[0]);
//     })
// };


// const updateProduct = async (req, res) => {
//     //#swagger.tags=['Products']    

//     const productId = new ObjectId(req.params.id)
//     const updatedProduct = {
//         "productName": req.body.productName,
//         "description": req.body.description,
//         "price": req.body.price,
//         "category": req.body.category,
//         "stockQuantity": req.body.stockQuantity,
//         "updatedAt": new Date()
//     };
//     const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId }, updatedProduct);
//     if (response.modifiedCount > 0) {
//         res.status(204).send();
//     } else{
//         res.status(500).json(response.error || 'Some error occurred while updating the product')
//     }
// };

// const deleteProduct = async (req, res) => {
//     //#swagger.tags=['Products']    

//     const productId = new ObjectId(req.params.id)
//     const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId });
//     if (response.deletedCount > 0) {
//         res.status(204).send();
//     } else{
//         res.status(500).json(response.error || 'Some error occurred while deleting the product')
//     }
// };

// module.exports ={
//     getAllProducts,
//     getSingleProduct,
//     createProduct,
//     updateProduct,
//     deleteProduct
// }