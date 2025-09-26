import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: "Not Authorized, No Token" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {
        res.status(403).json({ msg: "Invalid Token" });
    }
};


export const isAdmin = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ msg: "Not Autorized, Admins Only" });
    }
    next();
}

export const isOwner = (req, res, next) => {
    if (req.user.role !== "OWNER") {
        return res.status(403).json({ msg: "Not Autorized, Store Owners Only" });
    }
}