export interface Product {
    id: string,
    timestamp: number,
    name: string,
    desc: string,
    code: string,
    img: string,
    price: number,
    stock: number
}

export class Product {
    constructor (id: string, timestamp: number, name: string, desc: string, code: string, img: string, price: number, stock: number){
        this.id = id
        this.timestamp = timestamp
        this.name = name
        this.desc = desc
        this.code = code
        this.img = img
        this.price = price
        this.stock = stock
    }
}