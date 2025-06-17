- when you create a server, you will listen on the server, then you will accpeting the incoming request outside the world [server-client](https://excalidraw.com/#json=yYHaeHT7hSA_2GC1PU_Ur,xki97Lsejz2Q_Dhepxt_Qg)

- basic server creatiion code [basic-server](/devtinder/assests/basic-server.png)
    - we are not handling any incoming request here

- to handle incoming request we have to use app.use (app.use can handle all method, here we can have app.post, app.get ....) and then pass a function inside it and this function takes request and response as a parameter,
    - and we have to send a response back, normally using app.send() , and this whole function is called request handler, only the func. not app.use (if we are not sending and respose back then the client will continusly sends the request in hope of response)
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

- dynamic route => /user/:id/:name/:password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;          localhost:3000/user/101/rishav/rishavpassword
    - in req.params we will get {id:'101', name:'rishav', password:'rishavpassword'}
    - used to make route dynamic, Use route params for resource identity.

- query params => /user&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                       localhost:3000/user?id=101&name=rishav&password=rishavpassword 
    - in req.query we get {id:'101', name:'rishav', password:'rishavpassword'}
    - Use query params for search, filter, options, pagination.

### Route handler and middelware
- one route can have multiple route handlers
- You can attach multiple middleware or handlers to a route. They execute in order. But once you send a response (res.send(), res.json(), etc.), the connection is closed—further handlers won't run unless you're just logging (not responding).
- 1. Once res.send() is called, the response ends
    - No further route handlers will run after that, even if next() is called.
- 2. Use next() only if you’re not sending a response yet
    - Only middleware (not final handlers) should call next() to pass control.
- 3. If you call next() but don’t send any response later, the request will hang or give "Cannot GET" error
    - Always ensure the last handler sends a response.
- we can also have route handlers inside array also ( app.get(/route,[rh1,rh2,rh3,rh4,rh5]), app.get(/route,rh1,[rh2,rh3],rh4,rh5))
- [for detail explanation](/devtinder/detail-explanation/multiple-route-handler.md)
- Middlewares => 
    - Middleware are not but way to do some processing that happens between the request (coming from the client) and the final response (sent by your server). The next() that we are talking about is the key that is doing all the thing.
    - general purposes middlewares are used for : log requests, authenticate users, parse json data, validate i/p, catch errors etc.
    - Middleware functions must call next() to move to the next stage. If not, the request will hang.
    - lets, discuss authorize case => let' say we have two route /admin/getalldata and /admin/deleteuser but I want to run the logic and sent the res. but here we want to getalldata or deleteuser only when the user is authorize logic passes otherwise send error res.
        - this can be done in two ways either write the same authorize logic in both route or in the only /admin route (2nd way is the good practice) here come main middleware part, call next() only when user is authorize.
        - [without-middleware](/devtinder/assests/without-middleware.png)
        - [with-middleware](/devtinder/assests/with-middleware.png)
        - [with-middleware-folder](/devtinder/assests/with-middleware-folder.png)


###  Database, Schema & Models  Mongoose
- connect to the mongodb atlas cluster using connection string followed by the dadabase name
- we need to connect to db before listening to the requests. see blelow -
- ```js
    connectDB().then(() => {
    console.log("successfully connected to db"); 
    app.listen(3000, () => {
    console.log("server is up and runnring...");
    })
    }).catch((err) => {
    console.error("db connection failed");   
    console.log("error :: ", err);
    })```
- for models best practices refer mongoose docs. [mongoose-docs](https://mongoosejs.com/docs/models.html)

- model vs schema
    | Concept | Purpose                            | Used For                                   |
    | ------- | ---------------------------------- | ------------------------------------------ |
    | Schema  | Defines the shape of the documents | Structure, validation, default values      |
    | Model   | Represents a MongoDB collection    | Create/read/update/delete documents (CRUD) |


- model
    - there aare two ways to use/export model
        - 1st=>
       ```js
        const User = mongoose.model("User", userSchema);
        module.exports = User;
        ```

        - There are **two things** you’re referring to:
        1. `"User"` — This is the **model name string**
        - It's the **name of the collection** Mongoose will create (automatically pluralized and lowercased to `users`).
        - Think of this as the **label** or **collection identifier** inside MongoDB.
        > For example, `"User"` becomes `users` collection in MongoDB.

        2. `User` — This is the **variable (Model instance)** in your JavaScript code
        - This is what you'll use in your code to **interact with the database**.
        - You use this `User` variable to run commands like:
        ```js
        const users = await User.find();
        const newUser = new User({ name: 'Alice' });
        ```
        🧠 Summary:

        | Term       | Meaning                                                                 |
        |------------|-------------------------------------------------------------------------|
        | `"User"`   | String name of the model (used internally by Mongoose/MongoDB)          |
        | `User`     | JavaScript variable to interact with the model in code                  |
        
        - 2nd => 
        ```js
        module.exports = mongoose.model("User", userSchema);
        ```
    - for more details [click-here](/devtinder/detail-explanation/model-name-vs-model-instance.md)
    
- schema vs model vs instance of model
    - Schema defines structure, model represents data, and an instance is a specific populated example of that model.
    - Schema: Blueprint that defines the structure and rules of a document in a MongoDB collection.
    - Model: A constructor compiled from the schema, used to create and manage documents.
    - Instance: A single document (object) created using the model, representing one record in the database.


- authentication
    - basic -> flow :
        1. validation of data (using helper function)
        2. encryt the password
        3. store the data 
    - jwt

** bad practice - directly passing whole req.body /n 
    ex : const user = new User(req.body) /n**

** good practice - explicitly pass only the required parameter /n
    ex : const user = new User({
        firstName, 
        lastName, 
        emailId, 
        password:passeordHash})**

- so if any other field is passed in the postman it will be ignored , acts as an additional layer of security. 

- Cookie theory in short  : 
    - Whenever a user is logging in, server will create a token attach it into a cookie and send back, now the cookie will be stored by the browser, any request which is coming up next cookie will be sent along and when the cookie will be sent along we will validate it once again and then do anything that i want to do in the application.
    - to read/use the cookies we need to use middleware cookie-parser and use it globally like express.json

- JWT :
    - 
    - 
    - 
    - create JWT : const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
    - verify JWT : const decoded = jwt.verify(token, process.env.JWT_SECRET)
