// function to add new tasks
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click",function(){
    var newTask = document.createElement("div");
    newTask.classList.add("task");

    let priority = document.createElement("div");
    priority.classList.add("priority");
    newTask.appendChild(priority);
    priority.style.backgroundColor=selectedPriority;
    
    let title = document.createElement("h4");
    title.classList.add("title");
    newTask.appendChild(title);
    let title_value = document.getElementById("title").value;
    if(title_value==""){
      return;
    }
    title.textContent = title_value;
    
    let desc = document.createElement("div");
    desc.classList.add("desc");
    let i1 = document.createElement("i"); 
    i1.classList.add("bi-arrow-return-right"); 
    let p1 = document.createElement("p");
    desc.appendChild(i1);
    desc.appendChild(p1);
    newTask.appendChild(desc);
    let desc_value = document.getElementById("desc").value;
    p1.textContent = desc_value;


    let date = document.createElement("div");
    date.classList.add("date");
    let i2 = document.createElement("i");
    i2.classList.add("bi-calendar-check"); 
    let p2 = document.createElement("p");
    date.appendChild(i2);
    date.appendChild(p2);
    newTask.appendChild(date);
    let date_value = document.getElementById("date").value;
    p2.textContent = date_value;
    

    let status = document.createElement("div");
    status.classList.add("status");
    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add("bi-trash-fill");
    let checkBtn = document.createElement("i");
    checkBtn.classList.add("bi-check-circle-fill");
    status.appendChild(deleteBtn);
    status.appendChild(checkBtn);
    newTask.appendChild(status);
    deleteBtn.addEventListener("click",function(){
      newTask.remove();
      let taskTitle = title.textContent;
      fetch(`/deleteTask?title=${taskTitle}`);
    });
    checkBtn.addEventListener("click",()=>{
      let taskTitle = title.textContent;
      fetch(`/completeTask?title=${taskTitle}`);
      newTask.classList.add("completed");
    });


    document.getElementById("task-container").appendChild(newTask);
});


//priority select
const priorityButtonsColor = document.querySelectorAll('.add-priority button');
const defaultPriority = "#ff6464";
let selectedPriority = defaultPriority;
priorityButtonsColor.forEach(button => {
  button.addEventListener('click', (event) => {
    selectedPriority = event.target.value;
  });
});


// priority select highlight 
const priorityButtons = document.querySelectorAll('.add-priority button');
priorityButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    // Remove highlight from all buttons
    priorityButtons.forEach(btn => btn.classList.remove('highlighted'));
    
    // Add highlight to clicked button
    event.target.classList.add('highlighted');
  });
});


// Clear input fields
const clearBtn = document.getElementById('clearBtn');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('desc');
const dateInput = document.getElementById('date');
clearBtn.addEventListener('click', () => {
  titleInput.value = '';
  descInput.value = '';
  dateInput.value = '';
});



// add task to db
document.getElementById('taskForm').addEventListener('submit', function(e) {
  e.preventDefault();

  let params = new URLSearchParams(new FormData(this));

  fetch('/tasks?' + params.toString())
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
});

// fetch data from backend
window.onload = function(){
  let navlink = window.location.pathname;
  let activeNav = document.querySelector(`a[href="${navlink}"]`);
  activeNav.classList.add('active');

  fetch(`/getTasks`)
  .then(response => response.json())
  .then(tasks => {
    tasks.forEach(task => {
      // Display each task
      displayTask(task);
    });
  })
  .catch(error => console.error('Error:', error));
}


// display task on reload
function displayTask(task) {
  var newTask = document.createElement("div");
  newTask.classList.add("task");

  let priority = document.createElement("div");
  priority.classList.add("priority");
  newTask.appendChild(priority);
  priority.style.backgroundColor=selectedPriority;
  
  let title = document.createElement("h4");
  title.classList.add("title");
  newTask.appendChild(title);
  let title_value = task.title;
  if(title_value==""){
      title_value = "Title";
  }
  title.textContent = title_value;
  
  let desc = document.createElement("div");
  desc.classList.add("desc");
  let i1 = document.createElement("i"); 
  i1.classList.add("bi-arrow-return-right"); 
  let p1 = document.createElement("p");
  desc.appendChild(i1);
  desc.appendChild(p1);
  newTask.appendChild(desc);
  let desc_value = task.description;
  p1.textContent = desc_value;


  let date = document.createElement("div");
  date.classList.add("date");
  let i2 = document.createElement("i");
  i2.classList.add("bi-calendar-check"); 
  let p2 = document.createElement("p");
  date.appendChild(i2);
  date.appendChild(p2);
  newTask.appendChild(date);
  let date_value = new Date(task.date).toLocaleDateString("en-GB");
  p2.textContent = date_value;
  

  let status = document.createElement("div");
  status.classList.add("status");
  let deleteBtn = document.createElement("i");
  deleteBtn.classList.add("bi-trash-fill");
  let checkBtn = document.createElement("i");
  checkBtn.classList.add("bi-check-circle-fill");
  status.appendChild(deleteBtn);
  status.appendChild(checkBtn);
  newTask.appendChild(status);
  deleteBtn.addEventListener("click",function(){
    newTask.remove();
    let taskTitle = title.textContent;
    fetch(`/deleteTask?title=${taskTitle}`);
  });
  checkBtn.addEventListener("click",()=>{
    let taskTitle = title.textContent;
    fetch(`/completeTask?title=${taskTitle}`);
    newTask.classList.add("completed")
  });
  if(task.isCompleted==true){
    newTask.classList.add("completed");
  }

  document.getElementById("task-container").appendChild(newTask);
}


//search task
const searchInput = document.getElementById('searchBox');
const noResultDiv = document.getElementById('noResults');
searchInput.addEventListener('input', filter);
function filter() {
  const tasks = document.querySelectorAll('.task');
  const query = searchInput.value.toLowerCase();
  let matching = false;
  tasks.forEach((task) => {
    const title = task.querySelector('.title').textContent.toLowerCase();
    if (title.includes(query)) {
      matching = true;
      task.style.display = 'block';
      } 
      else {
        task.style.display = 'none';
      }
    });
  if (matching) {
    noResultDiv.style.display = 'none';
  } else {
    noResultDiv.style.display = 'block';
  }
}