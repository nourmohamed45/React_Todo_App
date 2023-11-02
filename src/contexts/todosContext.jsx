import { createContext, useReducer } from "react";
import TodoReducer from "../reducers/TodoReducer";

// React
import PropTypes from "prop-types";

export const TodosContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(TodoReducer, []);

  return (
    <TodosContext.Provider value={{ todos: todos, dispatch: dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;

TodosProvider.propTypes = {
  children: PropTypes.node.isRequired, // Use PropTypes.node for the children prop
};
