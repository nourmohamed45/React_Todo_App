import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Hooks
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContext";

// Modal
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

// Icons
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

// React
import PropTypes from "prop-types";

export default function Todo({ todo, showDeleteDialog }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [editValue, setEditValue] = useState({ title: todo.title, details: todo.details });
  // Event handlers
  function handleCheckout() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }



  function handleEditConfirm(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id == id) {
        return { ...todo, title: editValue.title, details: editValue.details };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setOpenEdit(false);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  //======== Modals  =========

  // Delete Modal
  const handleClickOpenDelete = () => {
    showDeleteDialog(todo);
  };



  // Edit Modal
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  //=== Event handlers ===

  return (
    <>
      {/* Edit modal */}
      <Dialog
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleEditConfirm(todo.id);
            }
          }}
          dir="rtl" open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleEditConfirm(todo.id);
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
            value={editValue.title}
            onChange={(event) =>
              setEditValue({ ...editValue, title: event.target.value })
            }
          />
          <TextField
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleEditConfirm(todo.id);
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
            value={editValue.details}
            onChange={(event) =>
              setEditValue({ ...editValue, details: event.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>إلغاء</Button>
          <Button
            style={{ color: "#8bc34a" }}
            onClick={() => {
              handleEditConfirm(todo.id);
            }}
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== Edit modal ===*/}
      
      <Card
        className="card-container"
        sx={{ width: "100%", minWidth: 275 }}
        style={{ margin: "10px", backgroundColor: "#3f51b5", boxShadow: "" }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="card-content"
        >
          <div>
            <Typography
              variant="div"
              sx={{ color: "white", fontSize: "20px", fontWeight: "bold", textDecoration: todo.isCompleted? "line-through": "none" }}
              color="text.secondary"
              gutterBottom
            >
              {todo.title}
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: "whitesmoke",
                fontSize: "16px",
                fontWeight: "medium",
              }}
              component="div"
            >
              {todo.details}
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Checkout Icon */}
            <IconButton
              onClick={() => {
                handleCheckout();
              }}
              className="iconButton"
              style={{
                color: todo.isCompleted ? "white" : "#8bc34a",
                backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                border: "solid #8bc34a 3px ",
              }}
              aria-label="delete"
            >
              <CheckOutlinedIcon />
            </IconButton>
            {/*=== Checkout Icon ===*/}

            {/* Edit Icon */}
            <IconButton
              onClick={() => {
                handleClickOpenEdit();
              }}
              className="iconButton"
              style={{
                margin: "0px 5px",
                backgroundColor: "white",
                color: "#0277bd",
                border: "solid #0277bd 3px ",
              }}
              aria-label="delete"
            >
              <CreateOutlinedIcon />
            </IconButton>
            {/*=== Edit Icon ===*/}

            {/* Delete Icon */}
            <IconButton
              onClick={() => {
                handleClickOpenDelete();
              }}
              className="iconButton"
              style={{
                backgroundColor: "white",
                color: "#c62828",
                border: "solid #c62828 3px ",
              }}
              aria-label="delete"
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
            {/*=== Delete Icon ===*/}
          </div>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </>
  );
}

Todo.propTypes = {
  todo: PropTypes.object,
  handleCheck: PropTypes.func,
  showDeleteDialog: PropTypes.func,
};
