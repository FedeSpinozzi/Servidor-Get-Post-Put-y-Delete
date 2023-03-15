import fs from 'fs';

export default class CartManager {
    constructor(path) {
        this.path = path
    }
    async getCarts() {
        if (fs.existsSync(this.path)) {
            const carts = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(carts)
        } else {
            return []
        }
    }
    //async createCarts(arr) {
    //    const cartsFile = await this.getCarts()
    //    const id = this.createId(cartsFile)
    //    const newCart = { id, ...arr }
    //    cartsFile.push(newCart)
    //    await fs.promises.writeFile(this.path, JSON.stringify(cartsFile))
    //    return newCart
    //}
    
    //async createId(carts) {
    //    let id
    //    if (carts.length === 0) {
    //        id = 1
    //    } else {
    //        id = carts[carts.length - 1].id + 1
    //    }
    //    return id
    //}
}