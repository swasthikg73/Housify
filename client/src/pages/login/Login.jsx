import "./Login.scss";
import { assets } from "../../assets/assets";
import { useState } from "react";

const Login = () => {
  const [register, setRegister] = useState(true);

  const form = {
    name: "",
    email: "",
    password: "",
  };

  const onSubmit = () => {
    e.target.preventDefault();
    console.log("Clicked");

    console.log(form);
  };

  return (
    <div className="form-wrapper">
      <div className="form">
        <form>
          {register ? <h1>Create an Account</h1> : <h1>Welcome back,</h1>}
          {register && (
            <input
              name="username"
              type="text"
              value={form.name}
              placeholder="Username"
            />
          )}
          <input
            name="email"
            type="text"
            value={form.email}
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            placeholder="Password"
          />
          <button onClick={(e) => onSubmit(e)} type="submit">
            {register ? "Register" : "Login"}
          </button>
        </form>

        {register ? (
          <p>
            Already have an
            <span className="link" onClick={() => setRegister(!register)}>
              Account?
            </span>
          </p>
        ) : (
          <p>
            Don't you have any
            <span className="link" onClick={() => setRegister(!register)}>
              Account?
            </span>
          </p>
        )}
      </div>
      <div className="imageContainer">
        <img src={assets.bg} alt="" />
      </div>
    </div>
  );
};

export default Login;
