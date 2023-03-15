import { Router } from 'express';
import ProductManager from '../services/product.service.js';

const productManager = new ProductManager('./products.json');
const router = Router();

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.json({ products });
});

router.get('/:idProduct', async (req, res) => {
    const { idProduct } = req.params;
    const product = await productManager.getProductById(+idProduct);
    res.json({ product });
});

router.post('/', async (req, res) => {
    const obj = req.body;
    console.log('informacion', obj);
    const newProduct = await productManager.createProduct(obj);
    res.json({ message: 'Producto creado', product: newProduct });
});

router.delete('/:idProduct', async (req, res) => {
    const { idProduct } = req.params;
    const mensaje = await productManager.deleteProductById(+idProduct);
    res.json({ mensaje });
});

router.put('/:idProduct', async (req,res) => {
    const { idProduct } = req.params;
    const obj = req.body;
    const product = await productManager.updateProduct(+idProduct,obj);
    res.json({ product });
});

export default router;