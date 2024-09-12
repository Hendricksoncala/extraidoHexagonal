// Definimos las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const ProductController = require('../controllers/productController');
const ProductValidator = require('../validator/productValidator');

const router = express.Router();
const productController = new ProductController();
const productValidator = new ProductValidator();

//Zona de producto

router.get('/getallproducts', productValidator.validateProductDataEmpty(), (req, res) => productController.getProducts(req, res));
router.post('/', productValidator.validateProductData(), (req, res) => productController.createProduct(req, res));
router.put('/:id', productValidator.validateProductUpdateDataByID(), (req, res) => productController.updateProduct(req, res));
router.delete('/:id', productValidator.validateProductID(), (req, res) => productController.deleteProduct(req, res));
router.get('/search', (req, res) => productController.searchProducts(req, res));

module.exports = router;