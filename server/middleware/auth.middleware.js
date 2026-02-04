import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.cookies["access-token"];

  if (!token) {
    return res.status(401).json({ success: false, message: "Token not found" });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
      if (error)
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      req.userId = payload.id;
      next();
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const CheckIsAdmin = async (req, res) => {
  try {
    const token = req.cookies["access-token"];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
      if (error)
        return res
          .status(401)
          .json({ success: false, message: "Not authenticated" });
      if (!payload.isAdmin)
        return res
          .status(403)
          .json({ success: false, message: "You are not authorized" });

      return res.status(200).json({ success: true, message: "You are admin" });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { verifyToken, CheckIsAdmin };
