import createProject from "../projects";
import createTodo from "../lista";
import { loadProjectsToSidebar } from "../sidebar";
import { clearMain} from "../main";
import { javascript } from "webpack";

const loadProjectsFromStorage = () => {
    if (
        !localStorage.getItem("projects") ||
        JSON.parse(localStorage.getItem("projects")).length === 0
    ) {
        const homeProject = createProject("Home");
        const projectNames = [homeProject.name];
        localStorage.setItem("projects", JSON.stringify(projectNames));
        localStorage.setItem(homeProject.name, JSON.stringify([]));
        return homeProject;
    }

    const projectNames = JSON.parse(localStorage.getItem("projects"));
    const projects = [];
    projectNames.forEach((projectName) => {
        let project = createProject(projectName);
        project = loadTodosFromProject(project);
        projects[projectName] = project;
    });
    return projects;
};

const loadTodosFromProject = (project) => {
    if (!localStorage.getItem(project.name)) {
        return project;
    }
    const todos = JSON.parse(localStorage.getItem(project.name));

    todos.forEach((todoList) => {
        const todo = createTodo(
            todoList.title,
            todoList.description,
            todoList.dueDate,
            todoList.priority,
            todoList.tag,
            todoList.complete,
        );
        project.addNewTodo(todo)
    });
    return project;
};


const addProjectToStorage = (project) => {
    if (!project) {
        console.log("This shouldn't be happening");
    }

    const projectNames = new Set(JSON.parse(localStorage.getItem("projects")));
    if (projectNames.has(project.name)) {
        localStorage.setItem(project.name, JSON.stringify(project.getTodos()));
        return;
    }
    projectNames.add(project.name);

    localStorage.setItem("projects", JSON.stringify(Array.from(projectNames)));    
    localStorage.setItem(project.name, JSON.stringify(project.getTodos()));

    loadProjectsToSidebar();
}

const updateTodoToStorage = (projectName, todoIndex, todo) => {
    let project = createProject(projectName)
    project = loadTodosFromProject(project);

    project.setTodoByIndex(todoIndex, todo);
    localStorage.setItem(projectName, JSON.stringify(project.getTodos()));
};

const deleteProject = (projectName) => {
    if (!localStorage.getItem(projectName)) {
        return;
    }

    const projectNames = JSON.parse(localStorage.getItem("projects"));

    const index = projectNames.indexOf(projectName);
    if (index !== -1) {
        projectNames.splice(index, 1);
        localStorage.removeItem(projectName);
        localStorage.setItem("projects", JSON.stringify(projectNames));
    }
    console.log(projectNames);
    loadProjectsToSidebar();
    clearMain();
}

export {
    loadProjectsFromStorage,
    addProjectToStorage,
    updateTodoToStorage,
    deleteProject,
};











