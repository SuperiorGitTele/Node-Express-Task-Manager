import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_TOKEN;

export const generateToken = (payload) => {
  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

export const validateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid token.", error: error.message });
  }
};

// Check Token Validity
export const checkToken = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Token missing' });
  
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid or expired token' });
    
    res.json({ valid: true });
  });
};

// Token Refresh
export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  jwt.verify(refreshToken, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid refresh token' });

    const newToken = jwt.sign({ userId: decoded.userId }, secretKey, { expiresIn: '1h' });
    res.json({ token: newToken, expiresIn: 3600 });
  });
};

// export const validateToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(" ")[1];

//     jwt.verify(token, secretKey, (err, payload) => {
//       if (err) {
//         return res.status(403).json({
//           success: false,
//           message: "Invalid token",
//         });
//       } else {
//         req.user = payload;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({
//       success: false,
//       message: "Token is not provided",
//     });
//   }
// };