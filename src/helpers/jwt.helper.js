import jwt from "jsonwebtoken";
export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      first_name: user.profile.first_name,
      last_name: user.profile.last_name,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};
