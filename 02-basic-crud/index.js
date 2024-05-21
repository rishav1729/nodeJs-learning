import express from 'express'

const app = express()

const port = 5000
app.use(express.json())

let teaData = []
let nextId = 1

app.post('/teas', (req,res) => {
    
    const {name,price} = req.body
    const newTea = {id: nextId++ , name, price}
    teaData.push(newTea)
    res.status(200).send(newTea)

})

app.get('/teas', (req,res) => {

    res.status(200).send(teaData)

})

app.get('/teas/:id', (req,res) => {
    
    teaData.find(t => t.id === parseInt(req.params.id))

})

app.listen(port, () => {
    console.log(`server is running at port: ${port}...`);
})