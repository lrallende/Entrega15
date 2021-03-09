import { Product } from "./classProduct";

export interface Cart {
    id: string,
    timestamp: number,
    products: Product []
}

export class Cart {
    constructor(id: string, products: Product []) {
        this.id = id
        this.timestamp = Date.now()
        this.products = products
    }
}