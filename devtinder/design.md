**Features Discussion**
- create a account
- login
- update your profile
- feature page - explore
- send connection request
- see our matches
- see the request we have sent/received
- update your profile

***High level tech plannning***
- 2 microservice
    - frontend microservice
        - react
    - backend microservice
        - nodejs
        - mongodb (db)

**DB Design (MongoDB)**
- User Collection (store user info)
    - first name
    - last name
    - email id
    - password
    - age
    - gender

- Connection requestion Collection (store connection req)
    - from userid
    - to userid
    - status = pending 
        - states =>
        - intially set to pending
        - can be accepted
        - can be rejected
        - can be ignored (when left swipe)


**API Design [Rest API]**

- POST /signup
- POST /login

- GET  /profile
- POST /profile
- PATCH /profile
- DELETE /profile

- POST /sendRequest - 1.ignore or 2.interested
- POST /review - accept or reject

- GET  /requests
- GET  /connections




