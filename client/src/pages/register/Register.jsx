import "../../responsive.scss";
import { assets } from "../../assets/assets";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiRequest from "../../lib/apiRequest.js";

const Register = () => {
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form">
        <form onSubmit={onSubmitHandler}>
          <h1>Create an Account</h1>

          <input name="username" type="text" placeholder="Username" />

          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Register</button>
        </form>

        <p>
          Already have an
          <Link to={"/login"} className="link">
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

export default Register;
