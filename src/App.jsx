import "./App.css";
import TodoList from "./components/TodoList";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material";
import TodosProvider from "./contexts/todosContext";
import { ToastProvider } from "./contexts/ToastContext";

const theme = createTheme({
  typography: {
    fontFamily: ["CairoFont"],
  },
  palette: {
    primary: {
      main: "#3f51b5",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
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
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
