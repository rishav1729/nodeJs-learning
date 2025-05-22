- when you create a server, you will listen on the server, then you will accpeting the incoming request outside the world [server-client](https://excalidraw.com/#json=yYHaeHT7hSA_2GC1PU_Ur,xki97Lsejz2Q_Dhepxt_Qg)

- basic server creatiion code [basic-server](/devtinder/assests/basic-server.png)
    - we are not handling any incoming request here

- to handle incoming request we have to use app.use and then pass a function inside it and this function takes request and response as a parameter,
    - and we have to send a response back, normally using app.send() , and this whole function is called request handler, only the func. not app.use
    - when we run the server now it will respond and we can see the response in the browser at localhost:3000, only when the server is running
    - [reponse-from-server-code](/devtinder/assests/response-from-server-cdoe.png)  [reponse-from-server-browser](/devtinder/assests/response-from-server-browser.png)
    - so here for every/any route or you can say any request (http://localhost:3000/     http://localhost:3000/test    http://localhost:3000/hello) it will responsd the same => Response from the server, because we have not route in app.use, we have to provide a route and its appropriate response => app.use("/test,(req,res)=>{}) => now we have a req.  handler to route /test now this(http://localhost:3000/test) will responde according to the code

- routes => 
    - lets take three routes "/" "/test" and "/test"  
        case1: order "/" "/test" and "/test" => if we hit either "/test" or "/hello" response will come from "/" request handler only  
        case2: order "/test" "/" and "/test" => if we hit "/" first and then "/test" it will return the "/test" response as it is defined befor "/" but for "/test" it will return the response of "/" only, why because anything after "/" will be considered as "/"only it can be "/////afdsf/sdggfgf" also
    - order of the routes matter
    - Q. "/test/bkhvhv/sdgfsd" retuns? => "/test" response
    - try this [routes](/devtinder/assests/routes.png)

- http methods =>
    - whenever you going to a url you are basically hitting that url you are basically hitting an get(by default) api call to that route on our server
    - we will use postman for testing post api testing (not only post) because post request is difficut to test in browser we have to write fetch method everyime for that.
    
- app.get vs app.post
    - app.get => client/browser request data/info from server and server will give/serve/send the data to client (server respond with data)
    - app.post => client/browser send data to the server (e.g., to create something like Submitting a form, creating a new user) and (Server receives and process data)
    - [detail-explanation](/devtinder/detail-explanation/app.get-vs-app.post.md)

- advanced routing pattern
    - /abc  
    - /ab?c => /ac => works
    - /ab+c => /abbbbbbbbbbbbbbbc => works
    - /ab*c => /absfgdfjgkhfjsgdc => works
    - /a(bc)+d => /abcbcbcbcbcbcbcbd => works
    - /a(bc)?d => /ad => works but /acd or /abd will throw error
    - we can include complex regex also in routes

- dynamic route => /user/:id/:name/:password   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;          localhost:3000/user/101/rishav/rishavpassword
    - in req.params we will get {id:'101', name:'rishav', password:'rishavpassword'}
    - used to make route dynamic, Use route params for resource identity.

- query params => /user           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                       localhost:3000/user?id=101&name=rishav&password=rishavpassword 
    - in req.query we get {id:'101', name:'rishav', password:'rishavpassword'}
    - Use query params for search, filter, options, pagination.