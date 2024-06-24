import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);

  // Testing the context
  const context = useContext(AuthContext);
  console.log("my context", context);

  // If the user is not logged in ❌
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If the authentication is still loading ⏳
  else if (isLoading || !user) {
    return <p>Loading ...</p>;
  }

  // If the user is logged in, allow to see the page ✅
  else {
    return children;
  }
}

export default IsPrivate;
