import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const LoginSignContainer = ({ setIsLogin }) => {
  const [active, setActive] = useState(true);

  const handleActive = () => {
    setActive(!active);
  };

  return (
    <section className="container">
      {active ? (
        <Login setIsLogin={setIsLogin} handleActive={handleActive} />
      ) : (
        <Register handleActive={handleActive} />
      )}
    </section>
  );
};

export default LoginSignContainer;
