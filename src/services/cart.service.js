import fs from 'fs';

export default class CartManager {
    constructor(path) {
        this.path = path
    }

    async getProductsCartById(cid) {
        if (fs.existsSync(this.path)) {
            const carts = await fs.promises.readFile(this.path, 'utf-8');
            const cartParsed = JSON.parse(carts);
            const cart = cartParsed.find((c)=> {
                return parseInt(cid) === c.id;
            });
            if(!cart){
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

    async createProductByCart(cid , pid) {
        if (fs.existsSync(this.path)) {
            const carts = await fs.promises.readFile(this.path, 'utf-8');
            const cartParsed = JSON.parse(carts);
            let index;
            const cart = cartParsed.find((c, i)=> {
                if(parseInt(cid) === c.id){
                    index = i;
                    return c;
                }
            });
            if(!cart){
                throw new Error('cart not found');
            }
            let final = cartParsed.splice(index, 1);
            let products = cart.products;
            products.push({id: pid, quantity: 1})
            final.push({
                products,
                ...cart
            });
            await fs.promises.writeFile(this.path, JSON.stringify(final));
            return cart.products;
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

}