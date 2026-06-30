const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks when the page opens
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {

    const task = taskInput.value.trim();

    if(task === ""){
        alert("Please enter a task.");
        return;
    }

    createTask(task,false);

    saveTasks();

    taskInput.value="";
    taskInput.focus();
}

function createTask(task, completed){

    const li=document.createElement("li");

    if(completed){
        li.classList.add("completed");
    }

    const span=document.createElement("span");
    span.textContent=task;

    span.onclick=function(){

        li.classList.toggle("completed");
        saveTasks();

    };

    const deleteBtn=document.createElement("button");

    deleteBtn.textContent="Delete";
    deleteBtn.className="delete-btn";

    deleteBtn.onclick=function(){

        li.remove();
        saveTasks();

    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

}

function saveTasks(){

    const tasks=[];

    document.querySelectorAll("#taskList li").forEach(function(li){

        tasks.push({

            text:li.querySelector("span").textContent,

            completed:li.classList.contains("completed")

        });

    });

    localStorage.setItem("tasks",JSON.stringify(tasks));

}

function loadTasks(){

    const savedTasks=JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function(task){

        createTask(task.text,task.completed);

    });

}

taskInput.addEventListener("keypress",function(event){

    if(event.key==="Enter"){

        addTask();

    }

});
