import { loadProjectsFromStorage, updateTodoToStorage } from "./utils/storage.js";
import { format, isPast, isToday } from "date-fns";
import { deleteProject } from "./utils/storage.js";

const clearMain = () => {
    document.getElementById("main").innerHTML = "";
};

const showProjectTodos = (projectName) => {
    if (!projectName.getItem(projectName)) {
        return;
    } 
    const projects = loadProjectsFromStorage();

    const main = document.getElementById("main");
    main.innerHTML = ""; // Clear the main content
    const div = document.createElement("div");
    div.classList.add("project-container");

    const header = document.createElement("h2");
    header.classList.add("main-header");
    header.textContent = projects[projectName].name;

    div.appendChild(header);

    const todoList = projects[projectName].getTodos();
    const incompleteTodos = [];
    const completeTodos = [];

    // Sort todos into complete and incomplete
    for (const TodoIndex in todoList) {
        const todo = todoList[TodoIndex];
        if (todo.complete) {
            completeTodos.push(todo);
        } else {
            incompleteTodos.push(todo);
        }
    } 

    incompleteTodos.sort((a, b) => {
        const priorityOrder = { hight: 0, medium: 1, low: 2 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    if (incompleteTodos.length > 0) {
        const pendingHeader = document.createElement("h3");
        pendingHeader.textContent = "Pending Tasks";
        pendingHeader.classList.add("section-header");
        div.appendChild(pendingHeader)

        incompleteTodos.forEach(({todo, TodoIndex}) => {
            const todoElement = createTodoElement(todo, projectName, TodoIndex);
            div.appendChild(todoElement);
        });
    } else {
        const noTasks = document.createElement("p");
        noTasks.textContent = "No pending tasks"
        noTasks.classList.add("no-tasks-message");
        div.appendChild(noTasks);
    }

    // Render completed todos if there are any
    if (completeTodos.length > 0) {
        const completedHeader = document.createElement("h3");
        completedHeader.textContent = "Completed Tasks";
        completedHeader.classList.add("section-header", "completed-header");
        div.appendChild(completedHeader)

        const completedContainer = document.createElement("div");
        completedContainer.classList.add("completed-container");

        completeTodos.forEach(({todo, TodoIndex}) => {
            const todoElement = createTodoElement(todo, projectName, TodoIndex, true);
            completedContainer.appendChild(todoElement);
        });
        div.appendChild(completedContainer);

    }

    const actionButtons = document.createElement("div");
    actionButtons.classList.add("action-buttons");

    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.textContent = "Delete Project";
    deleteProjectButton.classList.add("delete-project-btn");

    deleteProjectButton.addEventListener("click", () => {
        if (projectName === "Home") {
            alert("You Cannot Delete the Home Project!");
            return;
        }
        if (
            confirm(`Are you sure you want to delete the project ${projectName}?`) 
        )
        {
            deleteProject(projectName);
        }
    });

    // Only add delete Button if it's not the Home Project!
    if (projectName !== "Home") {
        actionButtons.appendChild(deleteProjectButton);
    }

    div.appendChild(actionButtons);
    main.appendChild(div);
};

const createTodoElement = (todo, projectName, todoIndex, completed = false) => {
    const todoContainer = document.createElement("div");

    const todoElement = document.createElement("div");
    todoElement.classList.add("todo-group");

    // add priority class
    todoElement.classList.add(`priority-${todo.priority.toLowerCase()}`);

    // check if past due
    const isDueDate = new Date(todo.dueDate);
    if (isPast(isDueDate) && !isToday(isDueDate) && !completed) {
        todoElement.classList.add("past-due");

    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `todo-${todoIndex}`;
    checkbox.checked = completed;

    const todoContent = document.createElement("div");
    todoContent.classList.add("todo-content");

    todoTitle = document.createElement("div");
    todoTitle.classList.add("todo-title");
    todoTitle.textContent = todo.title;

    todoContent.appendChild(todoTitle);

    if (todo.description){
    const todoDescription = document.createElement("div");
    todoDescription.textContent= todo.description;
    todoDescription.classList.add("todo-description");
    todoContent.appendChild(todoDescription);
    }
    todoElement.appendChild(checkbox);
    todoElement.appendChild(todoContent);

    todoContainer.appendChild(todoElement);

    // Create Meta information
    const meta = document.createElement("div");
    meta.classList.add("todo-meta");

    const dueDate = document.createElement("span");
    dueDate.classList.add("due-date");
    dueDate.textContent = format(new Date(todo.dueDate), "MMM dd");

    if (
        isPast(new Date(todo.dueDate)) &&
        !isPast(new Date(todo.dueDate)) &&
        !completed
    ) {
        dueDate.classList.add("overdue");
    }

    meta.appendChild(dueDate);

    if (todo.tag) {
        const tag = document.createElement("span");
        tag.classList.add("tag");
        tag.textContent = `#${todo.tag}`;
        meta.appendChild(tag);
    }

    const priority = document.createElement("span");
    priority.classList.add(`priority-${todo.priority.toLowerCase()}`);
    priority.textContent = todo.priority;
    meta.appendChild(priority);

    todoContainer.appendChild(meta);


    // add event listener for checkbox
    checkbox.addEventListener("change", () => {
        todo.complete = checkbox.checked;
        updateTodoToStorage(projectName, todoIndex, todo);
        showProjectTodos(projectName);
    });

    return todoContainer;
    
};

export { showProjectTodos, clearMain };
