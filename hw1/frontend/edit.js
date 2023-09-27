/* global axios */

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  //setdefault
  setupEventListeners();
  
}



function formatedDate(date) {
  const d = new Date(date);
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
        console.log(todo);
        sessionStorage.setItem( "id" , todo.id );
      }else{
        const todo = await createTodo({ title:updated, description,label,mood });
        console.log(todo);
        sessionStorage.setItem( "id"  , todo.id );
      }
      location.assign("view.html");
    } catch (error) {
      alert("Failed to create todo!");
      return;
    }
  });
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

main();
