const ProductController= require("../controllers/product.controller")
const { authenticate, isLoggedIn } = require('../config/jwt.config');
module.exports = app => {

    app.get('/api/product',authenticate, ProductController.findAll);

    app.post('/api/product', authenticate,ProductController.create);
    app.get('/api/product/:id',authenticate, ProductController.findOne);
    app.put('/api/product/:id', authenticate,ProductController.updateProduct);
    app.delete('/api/product/:id',authenticate, ProductController.delete);


}