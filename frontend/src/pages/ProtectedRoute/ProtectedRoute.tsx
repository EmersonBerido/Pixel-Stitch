import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// ProtectedRoute component to wrap around protected pages
export default function ProtectedRoute({ children }: any) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function verify() {
      if (!token) {
        setIsValid(false);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}verify-token`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        localStorage.removeItem("token");
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }

    verify();
  }, [token]);

  // Verify Token
  if (isValid === null) return null;  // TODO: Change to loading spinner
  if (isValid === false) return <Navigate to="/" replace />;

  // If valid, render children
  return children;
}