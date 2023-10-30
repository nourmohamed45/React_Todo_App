import { useState, useContext, useEffect, useMemo, useReducer } from "react";
import { TodosContext } from "../contexts/todosContext";
import { useToast } from "./ToastHelpers";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Todo from "./Todo";
// import { v4 as uuidv4 } from "uuid";
import TodoReducer from "../reducers/TodoReducer";

// Import Dialog

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function TodoList() {
  // const { todos2, setTodos } = useContext(TodosContext);
  const [todos, dispatch] = useReducer(TodoReducer, []);
  const { showHideToast } = useToast();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [dialogTodo, setDialogTodo] = useState(null);
  

  useEffect(() => {
    dispatch({type: "get"})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // filteration Arrays
  const completedTodos = useMemo(() => {
    return todos.filter((todo) => {
      return todo.isCompleted;
    });
  }, [todos]);

  const nonCompletedTodos = useMemo(() => {
    return todos.filter((todo) => {
      return !todo.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = nonCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  // Modal

  function showDeleteDialog(todo) {
    setDialogTodo(todo)
    // alert(todo.id)
    setOpen(true)
  }

  const handleCloseDelete = () => {
    setOpen(false);
  };

  function handleDeleteConfirm() {
    dispatch({
      type: "delete",
      payload: dialogTodo
    })
    handleCloseDelete();
    showHideToast("تم الحذف بنجاح")
  }

  function handleInputField(event) {
    setInputValue(event.target.value);
  }

  function addTodo() {
    if (inputValue.trim() !== "") {
      dispatch({
        type: "add",
        payload: {
          title: inputValue,
        }
      })
      setInputValue("");
      showHideToast("تم إضافة مهمة جديدة")
    }
  }

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  const todoList = todosToBeRendered.map((todo) => {
    return <Todo key={todo.id} todo={todo} showDeleteDialog={showDeleteDialog} />;
  });

  return (
    <>
      {/* delete modal */}
      <Dialog
        dir="rtl"
        open={open}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من رغبتك في حذف المهمة ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>إغلاق</Button>
          <Button
            style={{ color: "#c62828" }}
            onClick={() => {
              handleDeleteConfirm();
            }}
            autoFocus
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== delete modal ===*/}
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 id="header" style={{ color: "#212121" }}>
          مهامي
        </h1>
        <ToggleButtonGroup
          style={{ margin: "20px", direction: "ltr" }}
          color="primary"
          value={displayedTodosType}
          exclusive
          onChange={changeDisplayedType}
          aria-label="Platform"
        >
          <ToggleButton value="non-completed">غير منجز</ToggleButton>
          <ToggleButton value="completed">منجز</ToggleButton>
          <ToggleButton value="all">الكل</ToggleButton>
        </ToggleButtonGroup>
        <div
          style={{
            maxHeight: "400px",
            overflowY: "scroll",
            overflowX: "hidden",
            width: "100%",
          }}
        >
          {todoList}
        </div>
        <Grid container style={{ marginTop: "10px" }}>
          <Grid item xs={8}>
            <TextField
              autoFocus
              onKeyDown={(e) => {
                e.key === "Enter" ? addTodo() : null;
              }}
              value={inputValue}
              onChange={handleInputField}
              style={{ width: "calc(100% - 10px)" }}
              id="outlined-basic"
              label="عنوان المهمة"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={() => {
                addTodo();
              }}
              variant="contained"
              style={{ width: "100%", height: "100%" }}
              disabled={inputValue.length === 0}
            >
              إضافة
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
