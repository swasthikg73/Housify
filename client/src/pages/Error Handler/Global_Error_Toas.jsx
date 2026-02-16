// components/GlobalError.jsx
import { useEffect, useState } from "react";

function GlobalError() {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      setError(event.detail);
      setTimeout(() => setError(null), 4000);
    };

    window.addEventListener("api-error", handler);
    return () => window.removeEventListener("api-error", handler);
  }, []);

  if (!error) return null;

  return <div style={styles.toast}>{error}</div>;
}

const styles = {
  toast: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#ff4d4f",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    zIndex: 9999,
  },
};

export default GlobalError;
