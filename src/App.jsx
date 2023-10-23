import "./App.css";
import TodoList from "./components/TodoList";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodosContext } from "./contexts/todosContext";
import { useState } from "react";
// npm dependencies
import { v4 as uuidv4 } from "uuid";


const theme = createTheme({
  typography: {
    fontFamily: ["CairoFont"],
  },
  palette: {
    primary: {
      main: "#3f51b5"
    }
  }
});


const intialTodo = [
  {
    id: uuidv4(),
    title: "قراءة 3 كتب",
    details: "الإنجاز قبل نهاية الشهر",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: " اللعب مع الاصدقاء",
    details: "لعب كرة القدم في نادي الشونة",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "الجلوس مع الاهل",
    details: "مشاهدة مسلسل بابا المجال مع عائلتي",
    isCompleted: false,
  },
];



function App() {
  const [todos, setTodos] = useState(intialTodo);
  return (
    <ThemeProvider theme={theme}>
      <TodosContext.Provider value={{todos: todos, setTodos: setTodos}}>
        <div
          style={{
            fontFamily: "CairoFont",
            direction: "rtl",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container maxWidth="sm">
            <TodoList />
          </Container>
        </div>
      </TodosContext.Provider>
    </ThemeProvider>
  );
}

export default App;
