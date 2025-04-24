const express = require("express");
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const {
    registerUser,
    loginUser,
    getUserInfo
} = require('../controllers/authController');

console.log("registerUser:", registerUser);
console.log("loginUser:", loginUser);
console.log("getUserInfo:", getUserInfo);

router.post('/register' , registerUser);

router.post('/login' , loginUser);

router.get('/getUser', protect , getUserInfo);

router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file Uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});



module.exports = router; 





