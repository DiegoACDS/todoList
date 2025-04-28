function createList(
    title,
    description,
    dueDate,
    priority = "Low",
    tag = null,
    complete = false,

) {
    const createDate = new Date().toString(); // pega a data de criação e mostra de forma legivel
    const markComplete = () => { // altera o valor da variavel complete de false pra true
        complete = true;
    };

    const getComplete = () => complete // retorna o estado atual de complete
    return {
        title,
        description,
        dueDate,
        priority,
        tag,
        complete,
        markComplete,
        getComplete,
        createDate, 
    }
}

export default createList; // essa parte eu não entendi muito bem, o que é isso?
