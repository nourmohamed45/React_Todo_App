import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Icons
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

// React
import PropTypes from "prop-types";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";
import { ToastContext } from "../contexts/ToastContext";

export default function Todo({ todo, showDeleteDialog, showEditDialog }) {
  const { todos, dispatch } = useContext(TodosContext);
  const { showHideToast } = useContext(ToastContext);

  // Event handlers
  function handleCheckout() {
    if (!todo.isCompleted) {
      showHideToast("تم الإضافة إلي المنجز");
    } else {
      showHideToast("تم الإضافة الي غير المنجز");
    }
    dispatch({
      type: "check",
      payload: {
        id: todo.id,
      },
    });
  }

  //======== Modals  =========

  // Delete Modal
  const handleClickOpenDelete = () => {
    showDeleteDialog(todo);
  };

  // Edit Modal
  const handleClickOpenEdit = () => {
    showEditDialog(todo);
  };

  //=== Event handlers ===

  return (
    <>
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
              sx={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
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
  showEditDialog: PropTypes.func,
};
