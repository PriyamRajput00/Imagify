import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    // Get token directly from header key 'token'
    const token = req.headers.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized, Missing Token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Token" });
    }

    // Attach user ID to request for further use
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized, Invalid Token" });
  }
};

export default userAuth;
