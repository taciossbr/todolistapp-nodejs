const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const assert = require('assert');
const helpers = require('./helpers.js');
const path = require('path');

const url = 'mongodb://localhost:27017/test';

const app = express()

app.use(bodyParser.json());
app.use(express.static('static'))

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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(3000, () => {
    console.log("rodando");
});