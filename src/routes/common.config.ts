import { Application } from 'express'

export abstract class CommonConfig {
    app: Application
    name: string

    constructor(app: Application, name: string) {
        this.app = app
        this.name = name
        this.routesConfig()
    }
    getRoute() {
        return this.name
    }
    abstract routesConfig(): Application
}