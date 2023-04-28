const express = require('express')
const mongoose = require('mongoose');
const app = express();
const Register = require('./models/register')

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

let student = {
    age: 15,
    name: "alex"
}

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/players', (req, res) => {
    res.send("I'mmm " + student.age + " and my name is " + student.name)
})

app.get('/register', async(req, res) => {
    try {
        const registers = await Register.find({});
        res.status(200).json(registers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.get('/register/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const register = await Register.findById(id);
        res.status(200).json(register);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.post('/register', async(req, res) => {
    try {
        const product = await Register.create(req.body)
        res.status(200).json()
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

app.put('/register/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const register = await Register.findByIdAndUpdate(id, req.body)
        if (!register)
            return res.status(404).json({ message: 'cannot find' });
        const Updateregister = await Register.findByIdAndUpdate(id, req.body)
        return res.status(200).json(Updateregister);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://admin:Jujualex1.@dugotapi.fro1tji.mongodb.net/Node-API?retryWrites=true&w=majority')
    .then(() => {
        app.listen(3000, () => {
            console.log("API is running on port 3000");
        })
        console.log('connected to database')
    }).catch((error) => {
        console.log(error)
    })