const todoInput=document.querySelector('.todo-input')
const todoButton=document.querySelector('.todo-button')
const todoList=document.querySelector('.todo-list')
const filterOption=document.querySelector('.filter-todo')

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click',addTodo)
todoList.addEventListener('click',deleteTodo)
filterOption.addEventListener('click',filterTodo)

function filterTodo(event){
    const todos=todoList.childNodes
    
    todos.forEach(function(todo){
        switch(event.target.value){
            case "All":
                todo.style.display="flex"
                break;
            case "completed":
                if(todo.classList.contains('completed'))
                {
                    todo.style.display="flex";
                }
                else
                    todo.style.display="none";
                break;
            case "Incomplete":
                if(!todo.classList.contains("completed"))
                    todo.style.display="flex";
                else
                    todo.style.display="none";
                break;
        }
    })
}
function addTodo(event){
    event.preventDefault();
    if(todoInput.value!=="")
    {
    const todoDiv=document.createElement("div")
    todoDiv.classList.add("todo")
    const newTodo=document.createElement("li")
    newTodo.innerText=todoInput.value;
    saveLocalTodos(todoInput.value)
    todoInput.value=""
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    const completedButton=document.createElement("button")
    completedButton.innerHTML=`<i class="fas fa-check"></i>`
    completedButton.classList.add("complete-btn");
    const trashButton=document.createElement("button")
    trashButton.innerHTML=`<i class="fas fa-trash"></i>`
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(completedButton)
    todoDiv.appendChild(trashButton)
    todoList.appendChild(todoDiv)
    }
    else{
        alert("Can't Insert Empty String")
    }
    
}

function deleteTodo(event){
    const item=event.target;
    if(item.classList[0]==="trash-btn")
    {
        const todo=item.parentElement
        if(todo.classList.contains("completed"))
            removeCompTodos(todo)
        else
            removeLocalTodos(todo)
        todo.remove();
        
    }
    if(item.classList[0]==="complete-btn")
    {   
        const todo=item.parentElement
        completedTodos(todo)
        todo.classList.toggle("completed")
        console.log(todo.childNodes[0].innerText)
        if(!todo.classList.contains("completed"))
        {
            removeCompTodos(todo)
            saveLocalTodos(todo.childNodes[0].innerText)
        }
    }
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')==null)
        todos=[];
    else
        todos=JSON.parse(localStorage.getItem('todos'))
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos)) 
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos')==null)
        todos=[];
    else
        todos=JSON.parse(localStorage.getItem('todos'))
    todos.forEach(function(todo){
    const todoDiv=document.createElement("div")
    todoDiv.classList.add("todo")
    const newTodo=document.createElement("li")
    newTodo.innerText=todo
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    const completedButton=document.createElement("button")
    completedButton.innerHTML=`<i class="fas fa-check"></i>`
    completedButton.classList.add("complete-btn");
    const trashButton=document.createElement("button")
    trashButton.innerHTML=`<i class="fas fa-trash"></i>`
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(completedButton)
    todoDiv.appendChild(trashButton)
    todoList.appendChild(todoDiv)
    })
    getCompletedTodos()
}

function getCompletedTodos(){
    let comp;
    if(localStorage.getItem('comp')==null)
        comp=[];
    else
        comp=JSON.parse(localStorage.getItem('comp'))
    comp.forEach(function(todo){
        const todoDiv=document.createElement("div")
        todoDiv.classList.add("todo")
        const newTodo=document.createElement("li")
        newTodo.innerText=todo
        newTodo.classList.add("todo-item")
        todoDiv.classList.add('completed')
        todoDiv.appendChild(newTodo)
        const completedButton=document.createElement("button")
        completedButton.innerHTML=`<i class="fas fa-check"></i>`
        completedButton.classList.add("complete-btn");
        const trashButton=document.createElement("button")
        trashButton.innerHTML=`<i class="fas fa-trash"></i>`
        trashButton.classList.add("trash-btn")
        todoDiv.appendChild(completedButton)
        todoDiv.appendChild(trashButton)
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')==null)
        todos=[];
    else
        todos=JSON.parse(localStorage.getItem('todos'))
    const index=todo.childNodes[0].innerText;
    todos.splice(todos.indexOf(index),1)
    localStorage.setItem('todos',JSON.stringify(todos))
}

function removeCompTodos(todo){
    let comp;
    if(localStorage.getItem('comp')==null)
        comp=[];
    else
        comp=JSON.parse(localStorage.getItem('comp'))
    const index=todo.childNodes[0].innerText
    comp.splice(comp.indexOf(index),1)
    localStorage.setItem('comp',JSON.stringify(comp))
}

function completedTodos(todo){
    let comp;
    if(localStorage.getItem('comp')==null)
        comp=[];
    else
        comp=JSON.parse(localStorage.getItem('comp'))
    if(comp.indexOf(todo.childNodes[0].innerText)==-1)
    comp.push(todo.childNodes[0].innerText)
    localStorage.setItem('comp',JSON.stringify(comp))
    removeLocalTodos(todo)
}