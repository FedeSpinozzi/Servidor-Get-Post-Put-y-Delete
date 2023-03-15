import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path
    }
    async getProducts() {
        if (fs.existsSync(this.path)) {
            const products = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(products)
        } else {
            return []
        }
    }
    async createProduct(obj) {
        const productsFile = await this.getProducts()
        const id = this.#createId(productsFile)
        const newProduct = { id, ...obj }
        productsFile.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
        return newProduct
    }
    #createId(products) {
        let id
        if (products.length === 0) {
            id = 1
        } else {
            id = products[products.length - 1].id + 1
        }
        return id
    }

    async getProductById(idProduct) {
        const productsFile = await this.getProducts()
        const product = productsFile.find(p => p.id === idProduct)
        if (product) {
            return product
        } else {
            return 'No se encontró el producto'
        }
    }
    async deleteProductById(idProduct) {
        const productsFile = await this.getProducts()
        const productIndex = productsFile.findIndex(p => p.id === idProduct)

        if (productIndex === -1) {
            return 'Producto Inexistente'
        } else {
            productsFile.splice(productIndex, 1)
            await fs.promises.writeFile(this.path,JSON.stringify(productsFile))
            
            return 'Producto eliminado'
        }

    }
    async updateProduct(idProduct,obj){
        const productsFile = await this.getProducts()
        const product = productsFile.find(p=>p.id === idProduct)
        if(!product){
            return'El producto no existe'
        }else{
            const updateProduct = {...product,...obj}
            const productIndex = productsFile.findIndex(p => p.id === idProduct)
            productsFile.splice(productIndex,1,updateProduct)
            await fs.promises.writeFile(this.path,JSON.stringify(productsFile))
            return'Producto actualizado'
        }
    }
    //async createCart(arr){
       // const cartFile =//
    //}//





    async createProduct(obj) {
        const productsFile = await this.getProducts()
        const id = this.#createId(productsFile)
        const newProduct = { id, ...obj }
        productsFile.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
        return newProduct
    }
    //#createId(cart) {
        //let id
       // if (cart.length === 0) {
       //     id = 1
      //  } else {
       //     id = cart[products.length - 1].id + 1
      //  }
      //  return id
   // }
}


