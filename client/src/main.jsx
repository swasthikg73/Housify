import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketcontextProvier } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <AuthContextProvider>
      <SocketcontextProvier>
        <App />
      </SocketcontextProvier>
    </AuthContextProvider>
  </>
);
