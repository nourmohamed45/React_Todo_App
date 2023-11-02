import { useState, useEffect, useMemo, useContext } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Todo from "./Todo";

// Import Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TodosContext } from "../contexts/todosContext";
import { ToastContext } from "../contexts/ToastContext";

export default function TodoList() {
  const { todos, dispatch } = useContext(TodosContext);
  const { showHideToast } = useContext(ToastContext);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [dialogTodo, setDialogTodo] = useState(null);

  useEffect(() => {
    dispatch({ type: "get" });
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
    setDialogTodo(todo);
    setOpen(true);
  }

  function showEditDialog(todo) {
    setDialogTodo(todo);
    setOpenEdit(true);
  }

  const handleCloseDelete = () => {
    setOpen(false);
  };

  function handleDeleteConfirm() {
    dispatch({
      type: "delete",
      payload: dialogTodo,
    });
    handleCloseDelete();
    showHideToast("تم الحذف بنجاح");
  }

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  function handleEditConfirm(dialogTodo) {
    dispatch({
      type: "edit",
      payload: dialogTodo,
    });
    showHideToast("تم التعديل بنجاح");
    setOpenEdit(false);
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
        },
      });
      setInputValue("");
      showHideToast("تم إضافة مهمة جديدة");
    }
  }

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  const todoList = todosToBeRendered.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        showDeleteDialog={showDeleteDialog}
        showEditDialog={showEditDialog}
      />
    );
  });

  return (
    <>
      {/* Edit modal */}
      <Dialog
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleEditConfirm(dialogTodo);
          }
        }}
        dir="rtl"
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleEditConfirm(dialogTodo);
              }
            }}
            style={{ color: "red" }}
            autoFocus
            margin="dense"
            id="title"
            label="العنوان"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo?.title || ""} // Add a conditional check here
            onChange={(event) =>
              setDialogTodo({ ...dialogTodo, title: event.target.value })
            }
          />

          <TextField
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleEditConfirm(dialogTodo);
              }
            }}
            style={{ color: "red" }}
            autoFocus
            margin="dense"
            id="details"
            label="التفاصيل"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo?.details || ""} // Add a conditional check here
            onChange={(event) =>
              setDialogTodo({ ...dialogTodo, details: event.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>إلغاء</Button>
          <Button
            style={{ color: "#8bc34a" }}
            onClick={() => {
              handleEditConfirm(dialogTodo);
            }}
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== Edit modal ===*/}
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
