import createTodo from "./lista";
import createProject from "./projects";
import { sidebar } from "./sidebar";    
import "./styles/style.css";
import "./styles/form.css";
import { showProjectTodos } from "./main";


sidebar();
showProjectTodos();