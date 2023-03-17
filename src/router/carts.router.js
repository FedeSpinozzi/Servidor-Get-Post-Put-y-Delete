import { Router } from 'express';
import CartManager from '../services/cart.service.js';

const cartManager = new CartManager('./carts.json');
const router = Router();

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const response = await cartManager.getProductsCartById(cid);
        return res.json({ products: response });
    } catch (error) {
        return res.status(401).send(error.message);
    }
});

router.post('/', async (req, res) => {
    const cart = req.body;
    if(!cart.products){
        return res.status(400).send("Bad request");
    }
    const response = await cartManager.createCart(cart);
    res.json(response);
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    if(!cid || !pid){
        return res.status(400).send("Bad request");
    }
    const response = await cartManager.createProductByCart(cid, pid);
    res.json(response);
});

export default router;