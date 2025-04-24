const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require('./routes/expenseRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const path = require('path');
const chatBotRoutes = require('./routes/chatBotRoutes');

const multer = require('multer');
const Tesseract = require('tesseract.js');


dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

connectDB();

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


app.use("/api/v1/auth", authRoutes); //  Use authRoutes
app.use("/api/v1/income", incomeRoutes) // use incomeRoutes
app.use("/api/v1/expense", expenseRoutes) // use expenseRoutes
app.use("/api/v1/dashboard", dashboardRoutes) // use dashboardRoutes
app.use('/api/chatbot', chatBotRoutes);  // chatbot Route


// server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Setup multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');  // Define upload folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Unique file name
    }
});
const upload = multer({ storage: storage });

// OCR API Route using Tesseract.js
app.post('/api/v1/ocr/scan-receipt', upload.single('receipt'), async (req, res) => {
    try {
        // File path after upload
        const filePath = req.file.path;

        // Use Tesseract.js to process the image
        const { data: { text } } = await Tesseract.recognize(
            filePath,
            'eng', // Use English language for OCR
            {
                logger: (m) => console.log(m),  // Log progress
            }
        );

        // Send back the recognized text
        res.json({ fullText: text });

    } catch (error) {
        console.error("OCR Error:", error);
        res.status(500).json({ message: 'OCR failed', error: error.message });
    }
});



const _dirname = path.dirname("")
const buildpath = path.join(_dirname, "../expense-tracker/dist")
app.use(express.static(buildpath));

app.get("/", (req, res) => {
    res.send("Server is live 🚀");
  });
  


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server is running on Port ${PORT}`));
