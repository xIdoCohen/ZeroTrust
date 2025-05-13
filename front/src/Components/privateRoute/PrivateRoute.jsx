import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Connections from "../../common/Connections";

function PrivateRoute({ children, requiredRole }) {
  const [authorized, setAuthorized] = useState(null); // null = loading
  const [user, setUser] = useState(null);

  useEffect(() => {
    Connections.getData("https://localhost:3000/auth/validateToken")
      .then(res => {
        const user = res.user;
        setUser(user);

        if (!requiredRole || user.role?.includes(requiredRole)) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      })
      .catch(() => {
        setAuthorized(false)
        console.error("Failed to validate token");
      });
  }, []);


  if (authorized === null) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/login" replace />;
  return children;
}

export default PrivateRoute;
