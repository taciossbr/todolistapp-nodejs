const ObjectID = require('mongodb').ObjectID;

exports.addTodo = function(db, todo, callback) {
    const collection = db.collection('todos');
    collection.insertOne(todo, (err, result) => {
        callback(result);
    });
    
};

exports.getTodos = function(db, callback) {
    const collection = db.collection('todos');
    collection.find().toArray((err, result) => {
        callback(result);
    });
}
exports.doneTodo = function(db, id, callback) {
    const collection = db.collection('todos');
    console.log(id)
    collection.findOne({_id:new ObjectID(id)}, 
        (err, result) => {
            if (err) {
                console.log(err)
                callback({
                    "error": "not found"
                });
            }
            let todo = result;
            collection.updateOne({_id:new ObjectID(id)},
            {$set:{done: !todo.done}}, (err, result) => {
                todo.done = !todo.done;
                callback(todo)
            });
        })


}

exports.taskTodo = function(db, todo, callback) {
    const collection = db.collection('todos');
    collection.updateOne({_id:new ObjectID(todo._id)},
            {$set:{task: todo.task}}, (err, result) => {
                if (err) {
                    console.log(err)
                    callback({
                        "error": "not found"
                    });
                }
                callback(todo)
            });
}

exports.delTodo = function(db, id, callback) {
    const collection = db.collection('todos');
    collection.deleteOne({_id:new ObjectID(id)},
        (err, result) => {
                if (err) {
                    console.log(err)
                    callback({
                        "error": "not found"
                    });
                }
                callback({"sucess": "removed"})
            });
}