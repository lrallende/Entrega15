import { Cart } from "../class/classCart";
import { Product } from "../class/classProduct";
import { CartRoutes } from "../routes/cart.config";
import { CommonConfig } from "../routes/common.config";
import { ProductRoutes } from "../routes/product.config";
import endpoint from "./endpoint";
import Server from "./server";

const server = Server.init(endpoint.port)
const routes: Array<CommonConfig> = []

const isAdmin: boolean = true

let products: Product[] = []

routes.push(new ProductRoutes(server.app, products, isAdmin))
routes.push(new CartRoutes(server.app, new Cart("newCart", [])))
server.app.use((req, res) => {
    res.json({
        error: {
            'name':'Error',
            'status':404,
            'message':'Invalid Request',
            'statusCode':404,
            'stack':'http://localhost:8080/'
        },
        message: 'Path not found'
    })
})


server.start(() => console.log(`Running on port ${endpoint.port}`))