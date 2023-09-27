/* global axios */
const itemTemplate = document.querySelector("#todo-item-template");
const todoList = document.querySelector("#todos");

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  
  const selectLabel = document.querySelector('#selectlabel');
  const selectMood = document.querySelector('#selectmood');
  let activeLabel, activeMood;
  selectLabel.addEventListener("change",()=>{
    activeLabel = selectLabel.value;
    activeMood = selectMood.value;
    filter(activeLabel, activeMood);
  })
  selectMood.addEventListener("change",()=>{
    activeLabel = selectLabel.value;
    activeMood = selectMood.value;
    filter(activeLabel, activeMood);
  })
  try {
    const todos = await getTodos();
    todos.forEach((todo) => {
      renderTodo(todo);
      if(todos.label !== activeLabel) {
        todo.style.display = "none";
      }
      if(todos.mood !== activeMood) {
        todo.style.display = "none";
      }
    });
  } catch (error) {
    alert("Failed to load todos!");
  }
}
async function filter(label, mood) {
  const todos = document.querySelectorAll(".todo-item");
  todos.forEach((todo) => {
    if(label === 'all' && mood === 'all') {
      todo.style.display = "block";
    }
    else if(label === 'all') {
      if(todo.querySelector("p.todo-mood").innerHTML === mood) {
        todo.style.display = "block";
      }
      else {
        todo.style.display = "none";
      }
    }
    else if(mood === 'all') {
      if(todo.querySelector("p.todo-label").innerHTML === label) {
        todo.style.display = "block";
      }
      else {
        todo.style.display = "none";
      }
    }
    else {
      if(todo.querySelector("p.todo-label").innerHTML === label && todo.querySelector("p.todo-mood").innerHTML === mood) {
        todo.style.display = "block";
      }
      else {
        todo.style.display = "none";
      }
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
    sessionStorage.setItem( "id" , todo.id );
    location.assign("view.html");
  })
  return item;
}

async function getTodos() {
  const response = await instance.get("/todos");
  return response.data;
}


// eslint-disable-next-line no-unused-vars
async function updateTodoStatus(id, todo) {
  const response = await instance.put(`/todos/${id}`, todo);
  return response.data;
}

main();
