import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized User" });
    }
    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ status: false, message: "Invalid Token" });
    }
    req.userId = verified.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default isAuthenticated;
