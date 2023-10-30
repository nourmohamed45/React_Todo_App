import { v4 as uuidv4 } from "uuid";


export default function TodoReducer(currentTodo, action) {
  switch(action.type) {
    case "add": {
        const newTodo = {
          id: uuidv4(),
          title: action.payload.title,
          details: "",
          isCompleted: false,
        };

        const updatedTodos = [...currentTodo, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
    }

    case "delete": {
      const updatedTodos = [...currentTodo].filter((todo) => todo.id != action.payload.id);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      if (storageTodos) {
        return storageTodos;
      }
    }
  }
}