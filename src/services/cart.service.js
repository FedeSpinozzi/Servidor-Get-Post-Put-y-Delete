import fs from 'fs';

export default class CartManager {
    constructor(path) {
        this.path = path
    }

    async getProductsCartById(cid) {
        if (fs.existsSync(this.path)) {
            const carts = await fs.promises.readFile(this.path, 'utf-8');
            const cartParsed = JSON.parse(carts);
            const cart = cartParsed.find((c) => {
                return parseInt(cid) === c.id;
            });
            if (!cart) {
                throw new Error('cart not found');
            }
            return cart.products;
        }
    }

    async getCarts() {
        if (fs.existsSync(this.path)) {
            const carts = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(carts);
        } else {
            return [];
        }
    }

  
    async createCart(obj) {
        const cartsFile = await this.getCarts();
        const id = this.createId(cartsFile);
        const newCart = { id, ...obj };
        cartsFile.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
        return newCart;
    }

    createId(carts) {
        let id
        if (carts.length === 0) {
            id = 1;
        } else {
            id = carts[carts.length - 1].id + 1;
        }
        return id;
    }

    async createProductByCart(cid, pid) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(item => item.id === cid);
        if (cartIndex !== -1) {
            const product = carts[cartIndex].products
                .filter(product => product.id === pid)
                .map(product => {
                    product.quantity++;
                    return product;
                });
            if (product.length === 0) {
                carts[cartIndex].products.push({ id: pid, quantity: 1 });
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return carts[cartIndex];       
        } else {
            console.log(`Carrito no encontrado`);
        }
    } catch(error) {
        console.log(`Error agregando producto al carrito: ${error.message}`);
    }

}

