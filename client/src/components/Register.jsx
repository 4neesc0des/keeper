import React, { useState } from "react";
import Axios from "axios";
const Register = ({ handleActive }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post("/users/register", {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      setErr(res.data.msg);
      // handleActive();
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };
  return (
    <>
      <div className="register">
        <h2>Register</h2>
        <form onSubmit={registerSubmit}>
          <h3>{err}</h3>

          <div className="form-input">
            <input
              type="text"
              name="name"
              id="register-name"
              placeholder="Name"
              autoComplete="off"
              className="input-item"
              value={user.name}
              onChange={onChangeInput}
            />
          </div>
          <div className="form-input">
            <input
              type="email"
              name="email"
              id="register-email"
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
              id="register-password"
              placeholder="Password"
              autoComplete="off"
              className="input-item"
              value={user.password}
              onChange={onChangeInput}
            />
          </div>

          <button type="submit" className="form-btn">
            Register
          </button>
          <p>
            Already have an account?
            <span onClick={handleActive}> Login Now</span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
