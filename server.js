const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

// Load .env file only for development
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}



app.use(cors({
    origin: "https://amit-rajput2007.github.io", // Correct origin
    methods: ["GET", "POST"], // Allow specific methods
    allowedHeaders: ["Content-Type"], // Allow specific headers
    credentials: true, // (Optional) Allow cookies and credentials if required
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const CLIENT_ID = process.env.client_id;
const CLIENT_SECRET = process.env.client_secret;

const REDIRECT_URI = "https://amit-rajput2007.github.io/WebServer"; // Your GitHub Pages URL
const TOKEN_URL = "https://login.salesforce.com/services/oauth2/token"; // Salesforce Token Endpoint

app.post("getAccessToken", async (req, res) => {
    const auth_code = req.body.code;
    try {
        const response = axios.post(TOKEN_URL, {
            params: {
                grant_type: 'authorization_code',
                code: auth_code,
                CLIENT_ID: CLIENT_ID,
                CLIENT_SECRET: CLIENT_SECRET,
                REDIRECT_URI: REDIRECT_URI
            }
        })
    }
    catch (error) {
        console.log('error ', error)
    }
    res.json({ accessToken: response.data });
    const PORT = Process.env.port || 3000;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
})