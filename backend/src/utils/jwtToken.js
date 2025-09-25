import jwt from "jsonwebtoken";


const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};


export default generateToken;