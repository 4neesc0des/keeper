import React, { useState } from "react";
import Axios from "axios";
const Login = ({ setIsLogin, handleActive }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      setIsLogin(true);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };
  return (
    <>
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={loginSubmit}>
          <h3>{err}</h3>

          <div className="form-input">
            <input
              type="email"
              name="email"
              id="login-email"
              placeholder="Email"
              autoComplete="off"
              className="input-item"
              value={user.email}
              onChange={onChangeInput}
            />
          </div>
          <div className="form-input">
            <input
              type="password"
              name="password"
              id="login-password"
              placeholder="Password"
              autoComplete="off"
              className="input-item"
              value={user.password}
              onChange={onChangeInput}
            />
          </div>

          <button type="submit" className="form-btn">
            Login
          </button>
          <p>
            You don't have an account?
            <span onClick={handleActive}> Register Now</span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
