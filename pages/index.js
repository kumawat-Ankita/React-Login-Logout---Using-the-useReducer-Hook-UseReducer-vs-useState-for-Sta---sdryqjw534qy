import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
  isLoggedIn: false,
  isError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        [action.field]: action.value,
        isError: false,
      };
    case "LOGIN":
      if (action.username && action.password) {
        return {
          ...state,
          isLoggedIn: true,
          isError: false,
        };
      } else {
        return {
          ...state,
          isError: true,
        };
      }
    case "LOGOUT":
      return {
        ...state,
        username: "",
        password: "",
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (event) => {
    const { className, value } = event.target;
    dispatch({ type: "INPUT_CHANGE", field: className, value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = state;
    dispatch({ type: "LOGIN", username, password });
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {state.isLoggedIn ? (
            <div id="main">
              <section className="logout-section">
                <h2>Logged in successfully!</h2>
                <p>Welcome {state.username}!</p>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </section>
            </div>
          ) : (
            <div id="main">
              <form className="login-form" onSubmit={handleSubmit}>
                {state.isError && (
                  <p className="invalid-error">Invalid username or password!</p>
                )}
                <section className="username-input">
                  <label>Username: </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="username"
                    value={state.username}
                    onChange={handleInputChange}
                  />
                </section>
                <section className="password-input">
                  <label>Password: </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="password"
                    value={state.password}
                    onChange={handleInputChange}
                  />
                </section>
                <button type="submit" className="login-btn">
                  Login
                </button>
              </form>
            </div>
          )}
        </Route>
      </Switch>
    </Router>
  );
}
