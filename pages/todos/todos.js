Page({
    data: {
        //文本框数据模型
        input: '',
        //任务清单数据模型
        todos: [
            { name: 'learning weapp', completed: false },
            { name: 'learning javascript', completed: false },
            { name: 'learning vue', completed: false }
        ],
        leftCount: 3,
        allCompleted: false
    },

    inputChangeHandle(e) { //wxml到js通过e.detail.value获取数据
        this.setData({ input: e.detail.value })
    },
    
    addTodoHandle(){
        if (!this.data.input) return
        var todos = this.data.todos
        todos.push({
            name: this.data.input,
            completed: false
        }),
        //js到wxml用this.setdata进行数据绑定 传回界面显示
        this.setData({ 
            todos: todos, 
            input:'', 
            leftCount: this.data.leftCount + 1 
        })  
    },

    toggleTodoHandle(e) {
        var item = this.data.todos[e.currentTarget.dataset.index]
        item.completed = !item.completed
        this.setData({ todos: this.data.todos})
        if(item.completed) {
            this.setData({leftCount: this.data.leftCount - 1})
        } else {
            this.setData({leftCount: this.data.leftCount + 1})
        }
    },

    removeTodoHandle(e) {
        var todos = this.data.todos
        //移除数组元素用splice(index) 
        //item为函数返回的移除掉的元素 是一个数组
        var item = todos.splice(e.currentTarget.dataset.index, 1)[0]
        // if(!todos[e.currentTarget.dataset.index].completed) {
        //     this.setData({leftCount: this.data.leftCount - 1})
        // }
        if(!item.completed) {
            this.setData({leftCount: this.data.leftCount - 1})
        } 
        this.setData({ todos: todos, leftCount: this.data.leftCount})
    },

    toggleAllHandle() {
        var todos = this.data.todos
        var allCompleted = this.data.allCompleted
        var leftCount = this.data.leftCount
        if(!allCompleted) {
            for( let t of todos) {
            t.completed = true
            }
            allCompleted = true
            leftCount = 0
        } else {
            for( let t of todos) {
                t.completed = false
            }
            allCompleted = false
            leftCount = todos.length
        }       
        this.setData({ 
            todos: todos, 
            leftCount: leftCount, 
            allCompleted: allCompleted //最后传参后才能反复改变值
        })
    },

    clearHandle() {
        var todos = this.data.todos
        todos.splice(0)
        this.setData({ todos: todos, leftCount: 0 })
    }


})