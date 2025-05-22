- when you create a server, you will listen on the server, then you will accpeting the incoming request outside the world [server-client](https://excalidraw.com/#json=yYHaeHT7hSA_2GC1PU_Ur,xki97Lsejz2Q_Dhepxt_Qg)

- basic server creatiion code [basic-server](/devtinder/assests/basic-server.png)
    - we are not handling any incoming request here

- to handle incoming request we have to use app.use and then pass a function inside it and this function takes request and response as a parameter,
    - and we have to send a response back, normally using app.send() , and this whole function is called request handler, only the func. not app.use
    - when we run the server now it will respond and we can see the response in the browser at localhost:3000, only when the server is running
    - [reponse-from-server-code](/devtinder/assests/response-from-server-cdoe.png)  [reponse-from-server-browser](/devtinder/assests/response-from-server-browser.png)
    - so here for every/any route or you can say any request (http://localhost:3000/     http://localhost:3000/test    http://localhost:3000/hello) it will responsd the same => Response from the server, because we have not route in app.use, we have to provide a route and its appropriate response => app.use("/test,(req,res)=>{}) => now we have a req.  handler to route /test now this(http://localhost:3000/test) will responde according to the code