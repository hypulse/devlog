import jwt from "jsonwebtoken";

const verifyUser = (token?: string) => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    throw new Error("Invalid token");
  }
};

export default verifyUser;
