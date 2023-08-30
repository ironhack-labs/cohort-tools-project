import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="CohortCreatePage p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto">
      <div className="flex justify-center bg-white items-center mb-4 pt-8 absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-b border-gray-300 shadow-sm"></div>

      <form
        onSubmit={handleLoginSubmit}
        className="grid grid-cols-1 gap-4 overflow-y-auto mt-12 px-4"
      >
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 sticky left-0">
          Login
        </h3>

        <label
          htmlFor="email"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
          className="border rounded p-2 w-full mb-6"
          autoComplete="off"
        />

        <label
          htmlFor="password"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
          className="border rounded p-2 w-full mb-6"
          autoComplete="off"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out"
        >
          Log In
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="mt-10 mb-2">Don&apos;t have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
