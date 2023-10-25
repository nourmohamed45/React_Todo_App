import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from '@mui/material/Alert';

// React
import PropTypes from "prop-types";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export default function MySnackBar({openToast, toastMessage}) {

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div style={{direction: "ltr"}}>
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        message="Note archived"
        action={action}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}



MySnackBar.propTypes = {
  openToast: PropTypes.bool,
  toastMessage: PropTypes.string,
};
