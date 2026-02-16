// pages/ErrorPage.jsx
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  console.error(error);

  let message = "Something went wrong";

  if (isRouteErrorResponse(error)) {
    message = error.statusText || error.data?.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <>
      <div style={styles.container}>
        <h1>Oops 😢</h1>
        <p style={{ "font-weight": "800", "font-size": "25px" }}>
          Something went wrong, this time...!
        </p>
        <button
          style={{
            padding: "12px 24px",
            "background-color": "black",
            color: "white",
            "border-radius": "5px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => window.history.back()}>
          Back
        </button>
      </div>
    </>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
};

export default ErrorPage;
