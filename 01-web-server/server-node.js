const http = require("http")

const hostname = "127.0.0.1"
const PORT = 6000

const server = http.createServer((req,res) => {
    if (req.url === '/') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end("Hello ice Tea")
    }
    else if (req.url === '/ice-tea') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end("Enjoy your ice Tea")
    }
    else{
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end("404 not found")
    }
})

server.listen(PORT, hostname, () => {
    console.log(`server is listening at http://${hostname}:${PORT}`);
})