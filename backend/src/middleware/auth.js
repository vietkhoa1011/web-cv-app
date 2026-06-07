import jwt from "jsonwebtoken";

/**
 * Middleware xác thực JWT token.
 * Yêu cầu header: Authorization: Bearer <token>
 * Gắn decoded user info vào req.user
 */
export function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, username, email, role, iat, exp }
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please login again." });
        }
        return res.status(401).json({ message: "Invalid token." });
    }
}
