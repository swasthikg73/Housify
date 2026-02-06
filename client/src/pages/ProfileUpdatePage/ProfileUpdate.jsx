import "./ProfileUpdate.scss";
import apiRequest from "../../lib/apiRequest";
import { assets } from "../../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import UploadWidget from "../../components/UploadWidget/UploadWidget";

const ProfileUpdate = () => {
  const { CurrentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.put(`/user/update/${CurrentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });

      if (res.data.success) {
        updateUser(res.data.updatedUser);
        toast.success(res.data.message);
        navigate(`/profile/${CurrentUser.id}`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="form-wrapper">
        <Link to={`/profile/${CurrentUser.id}`}>
          <img className="back-btn" src={assets.back} alt="back" title="Back" />
        </Link>
        <div className="form">
          <form onSubmit={onSubmitHandler}>
            <h1>Update Profile</h1>

            <input
              name="username"
              type="text"
              placeholder="Username"
              defaultValue={CurrentUser.username}
            />

            <input
              name="email"
              type="text"
              placeholder="Email"
              defaultValue={CurrentUser.email}
            />
            <input name="password" type="password" placeholder="Password" />
            <button className="update-btn" type="submit">
              Update
            </button>
          </form>
        </div>
        <div className="image-container">
          <img src={avatar[0] || CurrentUser.avatar || assets.user} alt="" />
          <UploadWidget
            uwConfig={{
              cloudName: "dgxcdda6c",
              uploadPreset: "Housify",
              multiple: false,
              maxImageFileSize: 2000000,
              folder: "avatars",
            }}
            setState={setAvatar}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
