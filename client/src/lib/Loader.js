import apiRequest from "./apiRequest.js";

import { toast } from "react-toastify";

export const singlePageLoader = async ({ request, params }) => {
  try {
    const res = await apiRequest.get("/post/" + params.id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const listPageLoader = async ({ request, params }) => {
  try {
    // http://localhost:5173/list/?location=&minPrice=&maxPrice=

    const query = request.url.split("?")[1];
    const res = await apiRequest.get("/post/?" + query);

    if (!res.data.success) {
      return toast.error(res.data.message);
    }
    return res.data.posts;
  } catch (error) {
    console.log(error);
  }
};

export const profilePageLoader = async () => {
  try {
    const [profilePosts, chats] = await Promise.all([
      apiRequest.get("/user/profilePosts"),
      apiRequest.get("/chat/"),
    ]);

    if (!profilePosts.data.success) {
      return toast.error(profilePosts.data.message);
    }

    if (!chats.data.success) {
      return toast.error(chats.data.message);
    }
    return { profilePosts: profilePosts.data, chats: chats.data };
  } catch (error) {
    console.log(error);
  }
};
