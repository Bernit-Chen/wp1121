/* global axios */

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  try {
    printdiary();
    // todos.forEach((todo) => renderTodo(todo));
  } catch (error) {
    alert("Failed to load todos!");
  }
}

async function printdiary(){
  const diaryId = sessionStorage.getItem ( "id" );
  const todos = await getTodos();
  todos.forEach((todo) => {
    if(todo.id === diaryId) {
      const title = document.querySelector("p.todo-title");  //date
      const label = document.querySelector("p.todo-label");
      const mood = document.querySelector("p.todo-mood");
      const description = document.querySelector(  //content
       "p.todo-description",
      );
      title.innerText = todo.title;
      label.innerText = todo.label;
      mood.innerText = todo.mood;
      description.innerText = todo.description;

      }
  });
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
