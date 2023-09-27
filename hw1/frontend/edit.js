/* global axios */
const itemTemplate = document.querySelector("#todo-item-template");
const todoList = document.querySelector("#todos");

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  //setdefault
  setupEventListeners();
  try {
    const todos = await getTodos();
    // todos.forEach((todo) => renderTodo(todo));
  } catch (error) {
    alert("Failed to load todos!");
  }
}
function checkdate(){
  const todoInput = document.querySelector("#todo-input");
  // const origindate = todoInput.valuestr.split('.');
  try {
    const inputDate = new Date(todoInput.value.split(' ')[0]);
    // console.log(todoInput.value.split(' ')[0]);
    inputDate.getDate();
    inputDate.getMonth();
    inputDate.getFullYear();
  }
  catch(e) {
    alert("wrong format");
  }


  // const dateObj = new Date(origindate);
  // if(1){
  //   return true;
  // }else{
  //   return false;
  // }
}
async function setupEventListeners() {
  const saveStatus = sessionStorage.getItem ( "save-status" ) ;
  if(saveStatus !== "new") {
    const diaryId = sessionStorage.getItem ( "id" );
    const todos = await getTodos();
    todos.forEach((todo) => {
      if(todo.id === diaryId) {
        const todoInput = document.querySelector("#todo-input");  //date
        const labelInput = document.querySelector("#todo-label");
        const moodInput = document.querySelector("#todo-mood");
        const todoDescriptionInput = document.querySelector(  //content
          "#todo-description-input",
        );
        todoInput.value = todo.title;
        labelInput.value = todo.label;
        moodInput.value = todo.mood;
        todoDescriptionInput.value = todo.description;
        }
    });
  }
  const addTodoButton = document.querySelector("#todo-add");
  const todo_Input = document.querySelector("#todo-input");  //date
  const label_Input = document.querySelector("#todo-label");
  const mood_Input = document.querySelector("#todo-mood");
  const todo_DescriptionInput = document.querySelector(  //content
    "#todo-description-input",
  );
  addTodoButton.addEventListener("click", async () => {
    const title = todo_Input.value;
    const label =label_Input.value;
    const mood = mood_Input.value;
    const description = todo_DescriptionInput.value;
    if (!title) {
      alert("Please enter a todo title!");
      return;
    }
    if (!description) {
      alert("Please enter a todo description!");
      return;
    }
    checkdate();
    try {
      if(saveStatus !== "new") {
        const diary_Id = sessionStorage.getItem ( "id" );
        const todo = await updateTodoStatus(diary_Id, { title, description,label,mood });
      }else{
        const todo = await createTodo({ title, description,label,mood });
      }
      // location.assign("index.html");
    } catch (error) {
      alert("Failed to create todo!");
      return;
    }
  });
}

function renderTodo(todo) {
  const item = createTodoElement(todo);
  todoList.appendChild(item);
}

function createTodoElement(todo) {
  const item = itemTemplate.content.cloneNode(true);
  const container = item.querySelector(".todo-item");
  container.id = todo.id;
  console.log(todo);
  const title = item.querySelector("p.todo-title");
  title.innerText = todo.title;
  const label = item.querySelector("p.todo-label");
  label.innerText = todo.label;
  const mood = item.querySelector("p.todo-mood");
  mood.innerText = todo.mood;
  container.addEventListener("click",()=>{
    location.assign("view.html");
  })
  return item;
}

async function deleteTodoElement(id) {
  try {
    await deleteTodoById(id);
  } catch (error) {
    alert("Failed to delete todo!");
  } finally {
    const todo = document.getElementById(id);
    todo.remove();
  }
}

async function getTodos() {
  const response = await instance.get("/todos");
  return response.data;
}

async function createTodo(todo) {
  const response = await instance.post("/todos", todo);
  return response.data;
}

// eslint-disable-next-line no-unused-vars
async function updateTodoStatus(id, todo) {
  const response = await instance.put(`/todos/${id}`, todo);
  return response.data;
}

async function deleteTodoById(id) {
  const response = await instance.delete(`/todos/${id}`);
  return response.data;
}

main();
