import handleAddProject from "./function/addProject";
import handleTask from "./function/addTask";
import { loadProjectsFromStorage } from "./utils/storage";
import { showProjectTodos } from "./main";
import { deleteProject } from "./utils/storage";

const sidebar = () => {
    const sidebar = document.getElementById("sidebar");

    const items = document.createElement("ul");

    const item1 = document.createElement("li");
    const addTaskButton = document.createElement("button");
    addTaskButton.innerText = "Add Task";
    item1.appendChild(addTaskButton);

    const item2 = document.createElement("li");
    const addProjectButton = document.createElement("button");
    addProjectButton.innerText = "Add New Project";
    item2.appendChild(addProjectButton);

    items.appendChild(item1);
    items.appendChild(item2);

    sidebar.appendChild(items);

    loadProjectsFromStorage();
    loadProjectsToSidebar();
    addTaskButton.addEventListener("click", handleAddTask);
    addProjectButton.addEventListener("click", handleAddProject);
};

const loadProjectsToSidebar = () => {
    const sidebar = document.getElementById("sidebar");

    const existingProjectSection = document.getElementById("project-section");
    if (existingProjectSection){
        sidebar.removeChild(existingProjectSection);
    }
    const projectSection = document.createElement("div");
    projectSection.id = "project-section";

    const projectTitle = document.createElement("h2");
    projectTitle.classList.add("project-title");
    projectTitle.textContent = "Projects";
    projectSection.appendChild(projectTitle);

    let projects = loadProjectsFromStorage();

    const projectItems = document.createElement("ul");

    for(const projectName in projects) {
        const projectItem = document.createElement(li);
        const projectElement = document.createElement("button");

        // eu digo para escrever o projectName que seria o nome
        // e depois escrevo o valor do projectName? não entendi!
        projectElement.textContent = projectName;
        projectElement.value = projectName;

        projectItems.appendChild(projectItem);
        projectItem.appendChild(projectElement);

        projectElement.addEventListener("click", (e) => 
            showProjectTodos(e.target.value),
        );

        const deleteProjectButton = document.createElement("button");
        deleteProjectButton.textContent = "X";
        deleteProjectButton.style.display = "none";
        deleteProjectButton.classList.add("inner-delete-button");

        deleteProjectButton.addEventListener("click", () => {
            if(
                confirm(`Are You Sure You Want To Delete The Project ${projectName}?`)
            ) {
                deleteProject(projectName);
                
            }
        });
        projectElement.appendChild(deleteProjectButton);
        projectElement.addEventListener("mouseover", () => {
            if (projectName != "Home")
            deleteProjectButton.style.display = "inline-block";
        });

        projectElement.addEventListener("mouseleave", () => {
            deleteProjectButton.style.display = "none";
        });
    }
    projectSection.appendChild(projectItems);
    sidebar.appendChild(projectSection);
}

export { loadProjectsFromStorage, sidebar};