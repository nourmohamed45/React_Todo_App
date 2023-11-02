import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import MySnackBar from "../components/MySnackBar";

export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [openToast, setopenToast] = useState(false);
  const [toastMessage, settoastMessage] = useState("");

  const showHideToast = (toastMessage) => {
    settoastMessage(toastMessage);
    setopenToast(true);
    setTimeout(() => {
      setopenToast(false);
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <MySnackBar openToast={openToast} toastMessage={toastMessage} />
      {children}
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired, // Use PropTypes.node for the children prop
};
