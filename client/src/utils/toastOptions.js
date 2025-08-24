import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const baseOptions = {
  position: "bottom-right",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  closeButton: true,
};

// Toast de información
export const toastInfo = (message) => {
  toast.info(message, baseOptions);
};

// Toast de éxito
export const toastSuccess = (message) => {
  toast.success(message, baseOptions);
};

// Toast de error
export const toastError = (message) => {
  toast.error(message, baseOptions);
};
