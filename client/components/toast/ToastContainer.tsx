"use client";

import {
  cssTransition,
  ToastContainer as ToastifyContainer,
} from "react-toastify";

const ToastContainer = () => {
  return (
    <ToastifyContainer
      hideProgressBar={true}
      autoClose={3000}
      closeOnClick={true}
      pauseOnHover={true}
      limit={3}
      position="top-center"
    />
  );
};

export default ToastContainer;
