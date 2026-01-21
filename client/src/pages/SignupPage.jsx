import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import zxcvbn from "zxcvbn";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [validationErrors, setValidationErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(null);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword) {
      const result = zxcvbn(newPassword);
      setPasswordStrength(result);
    } else {
      setPasswordStrength(null);
    }
  };
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, username };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error response:", error.response?.data);
        if (error.response?.data?.errors) {
          // Handle validation errors
          const errors = {};
          error.response.data.errors.forEach((err) => {
            errors[err.path] = err.msg;
          });
          console.log("Setting validation errors:", errors);
          setValidationErrors(errors);
          setErrorMessage(undefined);
        } else {
          const errorDescription =
            error.response?.data?.message ||
            error.response?.data?.errorMessage ||
            "Signup failed";
          setErrorMessage(errorDescription);
          setValidationErrors({});
        }
      });
  };

  return (
    <div className="CohortCreatePage p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto">
      <div className="flex justify-center bg-white items-center mb-4 pt-8 absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-b border-gray-300 shadow-sm"></div>

      <form
        onSubmit={handleSignupSubmit}
        className="grid grid-cols-1 gap-4 overflow-y-auto mt-12 px-4"
      >
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 sticky left-0">
          Sign Up
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
        {validationErrors.email && (
          <p className="text-red-500 text-sm mb-4">{validationErrors.email}</p>
        )}

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
          className="border rounded p-2 w-full mb-2"
          autoComplete="off"
        />
        {passwordStrength && (
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <span className="text-sm text-gray-600 mr-2">Password Strength:</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    passwordStrength.score === 0 ? 'bg-red-500' :
                    passwordStrength.score === 1 ? 'bg-orange-500' :
                    passwordStrength.score === 2 ? 'bg-yellow-500' :
                    passwordStrength.score === 3 ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                ></div>
              </div>
              <span className={`text-sm ml-2 ${
                passwordStrength.score === 0 ? 'text-red-500' :
                passwordStrength.score === 1 ? 'text-orange-500' :
                passwordStrength.score === 2 ? 'text-yellow-500' :
                passwordStrength.score === 3 ? 'text-blue-500' :
                'text-green-500'
              }`}>
                {passwordStrength.score === 0 ? 'Very Weak' :
                 passwordStrength.score === 1 ? 'Weak' :
                 passwordStrength.score === 2 ? 'Fair' :
                 passwordStrength.score === 3 ? 'Good' :
                 'Strong'}
              </span>
            </div>
            {passwordStrength.score < 3 && passwordStrength.feedback.suggestions.length > 0 && (
              <p className="text-sm text-gray-600">
                Suggestions: {passwordStrength.feedback.suggestions.join(', ')}
              </p>
            )}
          </div>
        )}
        {validationErrors.password && (
          <p className="text-red-500 text-sm mb-4">
            {validationErrors.password}
          </p>
        )}

        <label
          htmlFor="username"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleUsername}
          className="border rounded p-2 w-full mb-6"
          autoComplete="off"
        />
        {validationErrors.username && (
          <p className="text-red-500 text-sm mb-4">
            {validationErrors.username}
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out"
        >
          Create Account
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="mt-10 mb-2">Already have an account?</p>
      <Link to={"/login"}> Log in</Link>
    </div>
  );
}

export default SignupPage;
