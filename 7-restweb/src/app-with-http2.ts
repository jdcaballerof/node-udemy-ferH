import fs from 'fs';
import http from 'http';
import http2 from 'http2';



//@ts-ignore
const content = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {

    console.log(req.url);
    try {
        const data = {msg: "Success", url: req.url}
        // res.write(  )
        res.end(JSON.stringify(data))
    } catch (error) {
        res.writeHead( 404 )
        res.end()
    }
}


// const server = http.createServer( content )

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
}, content as any)


server.listen(8080, () => {
    console.log('Server running on port 8080')
})