import { Request, Response, Application } from 'express'
import { Cart } from '../class/classCart'
import { Product } from '../class/classProduct'
import { CommonConfig } from './common.config'
import bodyParser from 'body-parser'

let jsonParser = bodyParser.json()

let products: Product[] = [
    {"id": "1", "timestamp": 12, "code": "Code01", "name":"Product 1", "price":1, "desc":"Desc 1", "img":"url", "stock":7},
    {"id": "3", "timestamp": 12, "code": "Code02", "name":"Product 2", "price":2, "desc":"Desc 2", "img":"url", "stock":45},
    {"id": "4", "timestamp": 12, "code": "Code03", "name":"Product 3", "price":3, "desc":"Desc 3", "img":"url", "stock":23},
    {"id": "2", "timestamp": 12, "code": "Code04", "name":"Product 4", "price":4, "desc":"Desc 4", "img":"url", "stock":26},
    {"id": "5", "timestamp": 12, "code": "Code05", "name":"Product 5", "price":5, "desc":"Desc 5", "img":"iurl", "stock":41},
    {"id": "6", "timestamp": 12, "code": "Code06", "name":"Product 6", "price":6, "desc":"Desc 6", "img":"url", "stock":9}
]

export class CartRoutes extends CommonConfig {
    cart: Cart
    constructor(app: Application, cart: Cart) {
        super(app, 'cartRoutes')
        this.cart = cart
    }
    routesConfig() {
        this.app.route('/cart/:id?')
            .get((req, res) => {
                let productId = req.params.id
                if (!productId) {
                    res.status(200).json(this.cart.products)
                    return
                } else {
                    const prod = this.cart.products.find(prod => prod.id === productId)
                    if(!prod){
                        res.sendStatus(404).send(`The product is not in the cart`)
                        return
                    } else {
                        res.status(200).json(prod)
                    }
                }
            })
            .post(jsonParser, (req, res) => {
                let productId = req.params.id;
                if (!productId) {
                    res.send(`You must provide a product ID`)
                    return;
                } else {
                    const prod = products.find(prod => prod.id === productId)
                    if(!prod){
                        res.sendStatus(404).send(`Product not found in database`)
                        return
                    } else {
                        this.cart.products.push(prod)
                        res.status(200).json(prod)
                    }
                }    
            })
            .delete((req, res) =>{
                    const productId = req.params.id
                    if (!productId) {
                        res.send(`You must provide a product ID`)
                        return
                    } else {
                        const prod = this.cart.products.find( prod => prod.id === productId)
                        if(!prod){
                            res.sendStatus(404)
                            return
                        }
                        this.cart.products = this.cart.products.filter( prod => prod.id !== productId)
                        res.send(prod)
                    }    
            })
            return this.app
    }
}