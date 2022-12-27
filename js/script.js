let todoArray = JSON.parse(localStorage.getItem("todoList"))
  ? JSON.parse(localStorage.getItem("todoList"))
  : [];

let input = document.querySelector(".input-item");
let addButton = document.querySelector(".btn-add");
let todoItem = document.querySelector(".content");

//Add Button
addButton.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo(input.value);
  duplicateItems(input.value);
  // console.log(e.currentTarget);
  // console.log([todoArray]);
  location.reload();
});
function addTodo(todoName) {
  if (todoName !== "") {
    let todoList = {
      id: Date.now(),
      name: todoName,
      completed: false,
    };
    console.log(todoList);
    todoArray.push(todoList);
    input.value = "";
    localStorage.setItem("todoList", JSON.stringify(todoArray));
  }
}

function appendItems() {
  todoArray.forEach((item) => {
    let checked = item.completed ? "checked" : null;

    todoItem.innerHTML += `
            <div class="form-check items d-flex justify-content-between">
                 <div data-key="${item.id}">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" class="checkbox" ${checked}>
                     <label class="form-check-label" for="flexCheckDefault" id="${item.id}">
                     ${item.name}
                     </label>
                     </div>
                     <button class="btn btn-success deleteBtn" id="${item.id}">X</button>
            </div>
                     `;
    let label = document.querySelectorAll("label");
    label.forEach((labels) => {
      if (item.completed == true) {
        labels.classList.add("line-through");
      }
    });
  });
}
appendItems();

let deleteBtn = document.querySelectorAll(".deleteBtn");
deleteBtn.forEach((del, index) => {
  del.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log(e.currentTarget);
    todoArray.splice([index], 1);
    localStorage.setItem("todoList", JSON.stringify(todoArray));
    location.reload();
    // console.log([todoArray]);
  });
});

todoItem.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target.parentElement.getAttribute("data-key"));

  if (e.target.type === "checkbox") {
    toggle(e.target.parentElement.getAttribute("data-key"));
    }       

  location.reload();
});

// let checkbox = document.querySelectorAll('.checkbox')
// checkbox.forEach((checkboxes)=>{
//     checkboxes.addEventListener('click', (e)=>{
//         e.preventDefault();
//         todoArray.forEach((id)=>{
//             if (checkboxes.checked == true){
//                 console.log('true');
//             }
//         })
//     })
// })

function toggle(id) {
  todoArray.forEach((item) => {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  localStorage.setItem("todoList", JSON.stringify(todoArray));
}

// let label = document.querySelector('label');
// // label.forEach((labels)=>{

//     label.addEventListener('click', (e)=>{
//         e.preventDefault();
//         console.log(e.currentTarget);
//         label.classList.toggle("line-trough-styling");
//     // })
// })

function duplicateItems(duplicate) {
  todoArray.forEach((item) => {
    if (item.name == duplicate) {
      alert(`${item.name} is already on your list`);
    }
  });
}
