import "./Login.scss";
import { assets } from "../../assets/assets";
import apiRequest from "../../lib/apiRequest.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        email,
        password,
      });
      console.log(res.data);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form">
        <form onSubmit={onSubmitHandler}>
          <h1>Welcome back,</h1>
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>

        <p>
          Don't you have any
          <Link to="/register" className="link">
            Account?
          </Link>
        </p>
      </div>
      <div className="imageContainer">
        <img src={assets.bg} alt="" />
      </div>
    </div>
  );
};

export default Login;
