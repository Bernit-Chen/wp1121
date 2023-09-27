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
  const origindate = todoInput.value;
  if(checkformat(origindate)!=true){
    return false;
  }
  const year = get_Year(origindate);
  const month = get_Month(origindate);
  const date = get_Date(origindate);
  //const week = get_Week(origindate);
  const newdate = year+'-'+month+'-'+date;
  console.log(newdate)
  const dateObj = Date.parse(newdate);
  if(!isNaN(dateObj)!=true){
    return false;
  }
  return true;
}

function checkformat(x){
  if(x.length===14 && x[4]==='.' && x[7]==='.' && x[10]===' ' && x[11]==='(' && x[13]===')'){
    return true;
  }else{
    return false;
  }
}
function get_Year(x){
  return x[0]+x[1]+x[2]+x[3];
}
function get_Month(x){
  return x[5]+x[6];
}
function get_Date(x){
  return x[8]+x[9];
}
function get_Week(x){
  return x[12];
}

function formatedDate(date) {
  const d = new Date("2021-03-25");
  const chi = ['日','一','二','三','四','五','六'];
  const dateDay = chi[d.getDay()];
  return date.split('-').join('.')+" ("+dateDay+")";
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
        const dateD = document.querySelector("#dateD");
        const todoDescriptionInput = document.querySelector(  //content
          "#todo-description-input",
        );
        todoInput.value = todo.title.split(' ')[0].split('.').join('-');
        labelInput.value = todo.label;
        moodInput.value = todo.mood;
        todoDescriptionInput.value = todo.description;
        dateD.innerHTML = todo.title;
        }
    });
  }
  else {
    const currentDate = new Date();
    const dateD = document.querySelector("#dateD");
    let year = String(currentDate.getFullYear()).padStart(4,"0");
    let month = String(currentDate.getMonth()+1).padStart(2,"0");
    let day = String(currentDate.getDate()).padStart(2,"0");
    // console.log(year+"-"+month+"-"+day);
    dateD.innerHTML = formatedDate(year+"-"+month+"-"+day);
    const todoInput = document.querySelector("#todo-input");
    todoInput.value = formatedDate(year+"-"+month+"-"+day).split(' ')[0].split('.').join('-');
  }
  const addTodoButton = document.querySelector("#todo-add");
  const todo_Input = document.querySelector("#todo-input");  //date
  const label_Input = document.querySelector("#todo-label");
  const mood_Input = document.querySelector("#todo-mood");
  const todo_DescriptionInput = document.querySelector(  //content
    "#todo-description-input",
  );
  const dateD = document.querySelector("#dateD");
  todo_Input.addEventListener("change",()=>{
    dateD.innerHTML = formatedDate(todo_Input.value);
  })
  addTodoButton.addEventListener("click", async () => {
    const title = todo_Input.value;
    const label =label_Input.value;
    const mood = mood_Input.value;
    const description = todo_DescriptionInput.value;
    if (!title) { //date
      alert("Please enter a todo title!");
      return;
    }
    const updated = dateD.innerHTML;
    // const chkDate = checkdate();
    // if(chkDate==false){
    //   alert("Please enter a correct date!");
    //   return;
    // }
    // console.log(date);
    if (!description) {
      alert("Please enter a todo description!");
      return;
    }
    try {
      if(saveStatus !== "new") {
        const diary_Id = sessionStorage.getItem ( "id" );
        const todo = await updateTodoStatus(diary_Id, { title:updated, description,label,mood });
      }else{
        const todo = await createTodo({ title:updated, description,label,mood });
      }
      location.assign("index.html");
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
