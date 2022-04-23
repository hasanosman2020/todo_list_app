//Get access to required html elements using their id
const text = document.getElementById('text')
const addTaskButton = document.getElementById('add-task-btn')
const saveTaskButton = document.getElementById('save-todo-btn')
const listBox = document.getElementById('listBox')
const saveIndex = document.getElementById('saveIndex')

//Initialise an empty array in order to store the todo tasks entered by the  user
let todoArray = []

//Event listener when user clicks on add task  button
addTaskButton.addEventListener('click', e => {
  e.preventDefault()
  let todo = localStorage.getItem('todo')
  if (todo === null) {
    todoArray = []
  } else {
    todoArray = JSON.parse(todo)
  }
  todoArray.push(text.value)
  text.value = ''
  localStorage.setItem('todo', JSON.stringify(todoArray))
  displayTodo()
})
//Adding an item/task to the todo list: the user will type in the task and then click on the 'save task' button. First we add an event listener to the save button, we then push the user data to the todo array and we store it in local storage.
//We have to store the todoArray to the localStorage on every change, i.e. whenever a task is added, updated or deleted. In the above code we fetch the array from the localStorage, if no array exists we create a blank one. Then we push the newly-added task to the todoArray and store the whole array again in localStorage.

//Displaying the todo list changes
//After appending the value to the todoArray we need to display it on the web page and we do that  by  using 'innerHTML'.
//We put the html code for the todo list inside a variable named, for example, htmlCode.Then we loop through the todoArray using forEach and add each item to the htmlCode variable.
//Once we are done looping trough all the elements of the todoArray , we assign the variable htmlCode  to the html element 'listBox'' using the innerHTML.
//All of this is handled by the function 'displayTodo()'.Note that here we have also added an edit button and a todo button.

function displayTodo () {
  let todo = localStorage.getItem('todo')
  if (todo === null) {
    todoArray = []
  } else {
    todoArray = JSON.parse(todo)
  }
  let htmlCode = ''
  todoArray.forEach((list, ind) => {
    htmlCode += `<div class="flex mb-4 items-center">
        <p class="w-full text-grey-darkest">${list}</p>
        <button onclick="edit(${ind})" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white text-grey bg-green-600">Edit</button>
        <button onclick="deleteTodo(${ind})" class="flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-red-500">Delete</button>
        
        </div>`
  })

  listBox.innerHTML = htmlCode
}

function deleteTodo (ind) {
  let todo = localStorage.getItem('todo')
  todoArray = JSON.parse(todo)
  todoArray.splice(ind, 1)
  localStorage.setItem('todo', JSON.stringify(todoArraay))
  displayTodo()
}

//Deleting items from the todo list. The delete button has an attribute method onclick() that passes the todo index as the parameter. On clicking the delete button, the deleteTodo() method will be executed.
//Here we apply the splice() array method on the todoArray. The splice() method helps to delete the item at the specified index. After deleting the item we store the vhasnges to the localStorage and call the displayTodo() function to reflect changes on the web page.
function deleteTodo (ind) {
  let todo = localStorage.getItem('todo')
  todoArray == JSON.parse(todo)

  todoArray.splice(ind, 1)
  localStorage.setItem('todo', JSON.stringify(todoArray))

  displayTodo()
}

//Updating items: The edit button, like the delete buitton, has an attribute method onclick(). On clicking the button, the edit method gets executed and passes the index as the parameter.
//There are two html elements whose display properties are set to none -  input elements with id saveIndex and id save-task-btn.
//As soon as user clicks on the edit button the input will have the text value that you want to update with. The saveTaskButton will be displayed instead of addTaskButton.
//The element with id saveIndex is set to display as none so that when the edit method is called we set the value attribute of it to the id so we can reference it later when saving the updated task.
function edit (ind) {
  saveIndex.value = ind
  let todo = localStorage.getItem('todo')
  todoArray = JSON.parse(todo)
  text.value = todoArray[ind]
  addTaskButton.style.display = 'none'
  saveTaskButton.style.display = 'block'
}

//Once we are done editing the text, we click on the saveTaskButton. On clicking the button you retrieve the id of the text using the saveInd input. After retrieving the id, you can update the todoArray at that index and push the changes to the localStorage. Finally, we call the displayTodo() function to reflect changes on the web page.

saveTaskButton.addEventListener('click', () => {
  let todo = localStorage.getItem('todo')
  todoArray = JSON.parse(todo)
  let id = saveInd.value
  todoArray[id] = text.value

  addTaskButton.style.display = 'block'
  saveTaskButton.style.display = 'none'
  text.value = ''
  localStorage.setItem('todo', JSON.stringify(todoArray))
  displayTodo()
})
