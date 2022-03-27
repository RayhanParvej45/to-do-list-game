
    const todoInput = document.querySelector(".todo-input");
    const todoButton = document.querySelector(".todo-btn");
    const todoList = document.querySelector(".todo-list");
    const filterOption = document.querySelector(".filter-todo");


    //EVENT LISTENER
    document.addEventListener('DOMContentLoaded', getTodos);


    todoButton.addEventListener('click', function(){
        event.preventDefault()

        //Todo DIV
        const todoDIV = document.createElement('div');
        todoDIV.classList.add("todo");

        // create LI
        const newTodo = document.createElement('li');
        newTodo.classList.add("todo-item");
        newTodo.innerText = todoInput.value;
        todoDIV.appendChild(newTodo);

        //ADD TODO TO LOCALHOST
        saveLocalTodo(todoInput.value);

        //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check"> </i>';
        completedButton.classList.add("complete-btn");
        todoDIV.appendChild(completedButton);

        //check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash"> </i>';
        trashButton.classList.add("trash-btn");
        todoDIV.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDIV);
        //clear todo input value
        todoInput.value = "";

    })


    // DELETE AND CHECKED TODO
    todoList.addEventListener('click', function(e){
        const item = e.target;

        // DELETE TODO
        if(item.classList[0] === "trash-btn") {
            const todo = item.parentElement;
            //ANIMATION
            todo.classList.add('fall');
            removeLocalTodos(todo);
            todo.addEventListener('transitionend', function(){
                todo.remove();
            });
        }

        // CHECK TODO
        if(item.classList[0] === "complete-btn") {
            const todo = item.parentElement;
            todo.classList.add('completed');
        }
    });


    // FILTER TODO
    filterOption.addEventListener('click', function(e){
        const todos = todoList.childNodes;

        todos.forEach(function(todo){
            switch (e.target.value){
                case "all":
                    todo.style.display = "flex";
                    break;

                case "completed":
                    if (todo.classList.contains('completed')){
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains('completed')){
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        });
    });


    //SAVE TODO IN LOCAL STORAGE
    function saveLocalTodo(todo){
        //CHECK IF TODO ALREADY EXIST
        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function getTodos(todo){

        //CHECK IF TODO ALREADY EXIST
        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.forEach(function(todo){
            //Todo DIV
            const todoDIV = document.createElement('div');
            todoDIV.classList.add("todo");

            // create LI
            const newTodo = document.createElement('li');
            newTodo.classList.add("todo-item");
            newTodo.innerText = todo;
            todoDIV.appendChild(newTodo);

            //check mark button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class = "fas fa-check"> </i>';
            completedButton.classList.add("complete-btn");
            todoDIV.appendChild(completedButton);

            //check trash button
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class = "fas fa-trash"> </i>';
            trashButton.classList.add("trash-btn");
            todoDIV.appendChild(trashButton);

            //append to list
            todoList.appendChild(todoDIV);
        });
    }

    function removeLocalTodos(todo){
        //CHECK IF TODO ALREADY EXIST
        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);

        localStorage.setItem('todos', JSON.stringify(todos));
    }


