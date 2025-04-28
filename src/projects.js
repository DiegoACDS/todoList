function createProject(name) {
    let todos = [];
    const addNewTodo = (todo) => {
        todos.push(todo);
    } 
    const getTodos = () => {
        return todos;
    };

    const getTodoByName = (name) => {
        return todos[name];
    };

    const setTodoByIndex = (index, todo) => {
        todos[index] = todo;
    };

    return {
        name,
        addNewTodo,
        getTodos,
        getTodoByName,
        setTodoByIndex,
    };
}

export default createProject;