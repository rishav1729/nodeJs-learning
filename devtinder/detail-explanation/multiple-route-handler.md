## ✅ Concept: Multiple Route Handlers

You can attach **multiple middleware or handlers** to a route. They execute **in order**. But once you send a **response** (`res.send()`, `res.json()`, etc.), the connection is closed—further handlers won't run unless you're just logging (not responding).

---

## 🔍 CASE 1: Multiple Handlers — First One Sends a Response

```js
app.use('/route', 
  (req, res) => {
    console.log("1st handler");
    res.send("1st response");
  }, 
  (req, res) => {
    console.log("2nd handler");
    res.send("2nd response");
  }
);
```

### ✅ Output:

* Console: `1st handler`, `2nd handler`
* Client: receives `"1st response"`

### ❗ Why?

* Even though both handlers run (because `.use()` is a stack), `res.send()` closes the response in the **1st handler**, so the 2nd `.send()` is **ignored silently**.

---

## 🔍 CASE 2: First Handler Uses `next()` But Also Sends a Response

```js
app.use('/route', 
  (req, res, next) => {
    console.log("1st handler");
    res.send("1st response");
    next();
  }, 
  (req, res) => {
    console.log("2nd handler");
    res.send("2nd response");
  }
);
```

### ✅ Output:

* Console: `1st handler`, `2nd handler`
* Client: receives `"1st response"`

### ❗ Problem:

* Calling `next()` **after** sending a response is wrong. Express lets you do it, but the response is already sent, so the second `.send()` is **useless and potentially risky** (can lead to errors like "Can't set headers after they are sent").

---

## 🔍 CASE 3: Handlers Chain Properly With `next()`, But Response Is Sent Only at the End

```js
app.use('/route', 
  (req, res, next) => {
    console.log("1st handler");
    next();
  }, 
  (req, res) => {
    console.log("2nd handler");
    res.send("2nd response");
  }
);
```

### ✅ Output:

* Console: `1st handler`, `2nd handler`
* Client: `"2nd response"`

### ✅ Correct Usage:

* This is the **correct pattern**. Middlewares log or modify the `req/res` object, then pass control to the final handler that sends the response.

---

## ❌ CASE 4: `next()` Called at End, But No More Handlers Left

```js
app.use('/route', 
  (req, res, next) => {
    console.log("1st handler");
    next();
  }, 
  (req, res, next) => {
    console.log("2nd handler");
    next(); // ⚠️ no handler after this!
  }
);
```

### ❌ Result:

* Console: `1st handler`, `2nd handler`
* Client: `Cannot GET /route` or **request hangs until timeout**

### ❗ Why?

* You called `next()` in the **last handler**, but there's **no next middleware**. Since no response is sent, Express keeps the request open.

---

## ✅ Best Practice Summary

| Situation              | Should You Use `next()`?                | Should You Use `res.send()`?                  |
| ---------------------- | --------------------------------------- | --------------------------------------------- |
| Middleware             | ✅ Yes, to pass control                  | ❌ No, unless it's an error or auth middleware |
| Final Handler          | ❌ No                                    | ✅ Yes, to send response                       |
| Sending Response Early | ❌ Don't use `next()` after `res.send()` | ✅ Send and return immediately                 |

