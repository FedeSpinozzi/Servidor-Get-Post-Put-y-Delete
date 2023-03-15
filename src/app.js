import express from 'express';
import ProductRoute from './router/products.router.js';
import CartRoute from './router/carts.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', ProductRoute);
app.use('/api/carts', CartRoute);

app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
});
