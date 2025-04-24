
// const jwt = require("jsonwebtoken")
// const User = require("../models/User");

// exports.protect = async(req, res, next) => {
//     let token = req.headers.authorization?.split(" ")[1];
//     if(!token) {
//         return res.status(401).json({ message: "Not authorized , no token" });
//     }

//     try{
//         const decode = jwt.verify(token , process.env.JWT_SECRET);
//         req.user = await User.findById(decode.id).select('-password');
//         next();
//     } catch(err) {
//         return res.status(401).json({ message: "Not authorized , no token" });
//     }
// };  


const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user ID to request
            req.user = { id: decoded.id }; // ✅

            next();
        } catch (error) {
            console.error("JWT verification error:", error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { protect };
