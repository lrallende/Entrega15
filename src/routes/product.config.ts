import { Request, Response, Application} from 'express'
import bodyParser from 'body-parser'
import { CommonConfig } from './common.config'
import { Product } from '../class/classProduct'

let jsonParser = bodyParser.json()

export class ProductRoutes extends CommonConfig {
    products: Product[]
    isAdmin: boolean

    constructor(app: Application, products: Product[], isAdmin: boolean){
        super(app, 'ProductRoutes')
        this.products = products
        this.isAdmin = isAdmin
    }

    routesConfig() {
        this.app.route('/product/:id?')
            .get((req, res) => {
                let productId = req.params.id
                if(this.products.length === 0) {
                    res.status(404). send(`{error: 'no products'}`)
                    return
                }
                if(!productId) {
                    res.status(200).json(this.products)
                    return
                } else {
                    const id = req.params.id
                    const prod = this.products.find( prod => prod.id === id)
                    if (!prod){
                        res.send(`{error: 'Product not found'}`)
                        return
                    }
                    res.status(200).json(prod)
                }
            })
            .post(jsonParser, (req: Request, res: Response) => {
                if(this.isAdmin) {
                    let id = (this.products.length + 1).toString()
                    let timestamp = Date.now()
                    const { name, desc, code, img, price, stock } = req.body
                    const prod = {
                        id,
                        timestamp,
                        name,
                        desc,
                        code,
                        img,
                        price: parseInt(price),
                        stock: parseInt(stock)
                    }
                    this.products.push(prod)
                    res.status(200).json(prod)
                }
                res.send(`{ error : -2, description: path 'x' method 'y' not implemented }`)
            })
            .put(jsonParser, (req: Request, res: Response) => {
                if (this.isAdmin) {
                    const productId = req.params.id
                    let prod = this.products.find( prod => prod.id === productId)
                    if(!prod){
                        res.send(`{ error: 'product not found'}`)
                        return
                    }
                    this.products = this.products.filter( prod => prod.id !== productId)
                    let timestamp = Date.now()
                    const { name, desc, code, img, price, stock } = req.body
                    prod = {
                        id: productId,
                        timestamp,
                        name,
                        desc,
                        code,
                        img,
                        price: parseInt(price),
                        stock: parseInt(stock)
                    }
                    this.products.push(prod)
                    res.status(200).json(prod)
                }
                res.send(`{ error : -2, description: path 'x' method 'y' not implemented }`)
            })
            .delete((req: Request, res: Response) =>{
                if (this.isAdmin) {
                        const id = req.params.id
                        const prod = this.products.find( prod => prod.id === id)
                        if(!prod){
                            res.sendStatus(404)
                            return
                        }
                        this.products = this.products.filter( prod => prod.id !== id)
                        res.send(prod)
                } 
                res.send(`{ error : -1, description: path '/products', 'delete' unauthorized method }`)
            })
            return this.app
    }
}