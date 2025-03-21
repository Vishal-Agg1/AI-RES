const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.analyzeFile = async (req, res) => {
    try {
        console.log("Analyze request received");
        
        // Check if file exists in request
        if (!req.files || !req.files.file) {
            console.log("No file in request:", req.files);
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const file = req.files.file;
        const prompt = req.body.prompt || "Analyze this document and provide key insights";
        
        console.log("Processing file:", file.name);
        console.log("Using prompt:", prompt);

        // Read and truncate the file content if too long
        const MAX_LENGTH = 5000;
        let fileContent = file.data.toString('utf8');
        if (fileContent.length > MAX_LENGTH) {
            console.warn("File too large, truncating...");
            fileContent = fileContent.substring(0, MAX_LENGTH);
        }

        // Initialize the model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        try {
            console.log("Sending request to Gemini API...");
            const result = await model.generateContent([prompt, fileContent]);
            
            // Get response text correctly
            const response = await result.getResponse();
            const text = response.text();
            console.log("Received response from Gemini API");

            res.status(200).json({
                success: true,
                analysis: text
            });
        } catch (genError) {
            console.error('Gemini Generation Error:', genError);
            res.status(500).json({
                success: false,
                message: "Error generating analysis",
                error: genError.message
            });
        }

    } catch (error) {
        console.error('File Processing Error:', error);
        res.status(500).json({
            success: false,
            message: "Error processing file",
            error: error.message
        });
    }
};
