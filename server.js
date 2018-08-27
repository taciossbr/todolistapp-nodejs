const express = require('express');
const bodyParser = require('body-parser');

const app = express()
let todos = [
    {
        id: 1,
        task: 'Comprar Leite',
        done: false
    }, {
        id: 2,
        task: 'Comprar Pao',
        done: false
    }, {
        id: 3,
        task: 'Comprar Agua',
        done: false
    }
];

let n = 3
app.use(bodyParser.json());

// app.get('/todo/new', (req, res) => {

// })

app.get('/todo/list', (req, res) => {
    res.json(todos);
});

app.post('/todo/new', (req, res) => {
    let task = {
        id : ++n,
        task: req.body.task,
        done: false
    };
    todos.push(task);
    res.json(task);
});

app.get('/todo/done/:id', (req, res) => {
    let r = {
        'error': 'not found'
    }
    for(let i = 0; i < todos.length; i++) {
        if(todos[i].id == req.params.id) {
            todos[i].done = (todos[i].done) ? false: true ;
            r = todos[i];
            break;
        }
    }
    res.json(r);
});

app.post('/todo/task/', (req, res) => {
    let r = {
        error: 'not found'
    }
    console.log(req.body.id);
    for(let i = 0; i < todos.length; i++) {
        if(todos[i].id == req.body.id) {
            todos[i].task = req.body.task ;
            r = todos[i];
            break;
        }
    }
    res.json(r);
});

app.get('/todo/del/:id', (req, res) => {
    let r = {
        'error': 'not found'
    };
    let i = todos.findIndex((el) => el.id == req.params.id);
    if (i) {
        r = todos.splice(i, 1)[0];
    }
    res.json(r);
});

app.listen(3000, () => {
    console.log("rodando");
});