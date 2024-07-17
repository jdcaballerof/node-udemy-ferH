import express, { Router } from 'express';
import path from 'path';



interface Options {
    port?: number,
    publicPath?: string,
    routes: Router
}

export class Server {

    private server = express()
    private readonly port: number
    private readonly publicPath: string
    private readonly routes: Router
    // port = 3000

    constructor( options: Options){
        this.port = options.port || 3000
        this.publicPath = options.publicPath || 'public'
        this.routes = options.routes
    }

    async start(){
        //& Middleware (funciones que se ejecutan al pasar por una ruta/path)
        this.server.use( express.json() )

        //& Public folder
        this.server.use( express.static(this.publicPath) )

        //& Routes
        this.server.use( this.routes )

        // todas las consultas redireccionen al index de public, para app's SPA
        this.server.get('*', (req, res) => {
            const indexPublicPath = path.join( __dirname, `../../${this.publicPath}/index.html` )
            res.sendFile(indexPublicPath)
        })

        
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
}