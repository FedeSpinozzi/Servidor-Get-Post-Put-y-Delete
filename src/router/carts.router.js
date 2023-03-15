import { Router } from 'express';
import CartManager from '../services/cart.service.js';

const cartManager = new CartManager('./carts.json');
const router = Router();

router.get('/', async (req, res) => {
    const carts = await cartManager.getCarts();
    res.json({ carts });
});

export default router;