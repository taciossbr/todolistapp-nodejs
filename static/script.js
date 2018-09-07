// window.onload = () => {


let vm = new Vue({
    el: "#app",
    data: {
        todos: [],
        novo: ""
    },
    mounted: function() {
        // console.log(3123423)
        this.getTodos();
    },
    computed: {
        noCheckeds: function() {
            // console.log(this.todos)
            return this.todos.filter(el => !el.done);
        },
        checkeds: function() {
            return this.todos.filter(el => el.done);
        },
    },
    methods: {
        getTodos: function() {
            const url = '/todo/list';
            // console.log('req')
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    res.forEach(element => {
                        this.$set(this.todos, this.todos.length, element);
                    });
                })
        },
        createNew: function() {
            console.log({
                task: this.novo,
                done: false
            })
            const url = '/todo/new';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    task: this.novo,
                    done: false
                })
            })
                .then(res => res.json())
                .then(res => {
                    this.todos.push(res)
                    this.novo = ''
                })
        },
        toggleTodo: function(id) {
            console.log(id);
            const url = `/todo/done/${id}`;
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                })
        },
        delTodo: function(id) {
            const url = `/todo/del/${id}`;
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.todos = this.todos.filter(todo => todo._id != id)
                })
        }
    }
})