import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

const useToast = () => {
  return useContext(ToastContext);
};

const ToastProvider = ({ children }) => {
  const onSuccessToast = (text) => {
    toast.success(`${text}`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <ToastContext.Provider value={{ onSuccessToast }}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, useToast };
