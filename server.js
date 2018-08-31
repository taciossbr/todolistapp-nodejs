const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const assert = require('assert');
const helpers = require('./helpers.js');

const url = 'mongodb://localhost:27017';

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


app.get('/todo/list', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        assert.equal(err, null);
        console.log('conected to mongo');

        const db = client.db('todos');
        helpers.getTodos(db, (result) => {
            res.json(result)
        })
    });
});

app.post('/todo/new', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        assert.equal(err, null);
        console.log('conected to mongo');

        const db = client.db('todos');
        const todo = req.body;
        console.log(helpers);
        helpers.addTodo(db, todo, (result) => {
            res.json(todo)
        })
        client.close();
    });
});

app.get('/todo/done/:id', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        assert.equal(err, null);
        console.log('connected to mongo');

        const db = client.db('todos');
        helpers.doneTodo(db, req.params.id, (result) => {
            res.json(result);
        })
    })
    
    
});

app.post('/todo/task/', (req, res) => {

    MongoClient.connect(url, (err, client) => {
        assert.equal(err, null);
        console.log('connected to mongo');

        const db = client.db('todos');
        helpers.taskTodo(db, req.body, (result) => {
            res.json(result);
        })
    })
    
});

app.get('/todo/del/:id', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        assert.equal(err, null);
        console.log('connected to mongo');

        const db = client.db('todos');
        helpers.delTodo(db, req.params.id, (result) => {
            res.json(result);
        })
    })
});

app.listen(3000, () => {
    console.log("rodando");
});