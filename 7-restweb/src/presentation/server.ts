import express from 'express';
import path from 'path';



interface Options {
    port?: number,
    publicPath?: string,
}

export class Server {

    private server = express()
    private readonly port: number
    private readonly publicPath: string
    // port = 3000

    constructor( options?: Options){
        this.port = options?.port || 3000
        this.publicPath = options?.publicPath || 'public'
    }

    async start(){
        //& Middleware (funciones que se ejecutan al pasar por una ruta/path)

        //& Public folder
        this.server.use( express.static(this.publicPath) )

        this.server.get('/api/*', (req, res) => {
            const path = req.path
            res.send({path, date: new Date()})
        })

        // todas las consultas redireccionen al index de public 
        this.server.get('*', (req, res) => {
            const indexPublicPath = path.join( __dirname, `../../${this.publicPath}/index.html` )
            res.sendFile(indexPublicPath)
        })

        
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
}