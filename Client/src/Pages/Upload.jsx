import { useState } from "react";
import { DropzoneButton } from "../Components/Dropzone/DropzoneButton";
import GeminiAnalysis from "../Components/GeminiAnalysis";

export default function Upload() {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [prompt, setPrompt] = useState("");

  const handleFileUploadComplete = (file) => {
    setUploadedFile(file);
    setShowAnalysis(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "80%",
          height: "75%",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        <h2 style={{ color: "#333" }}>Upload Your File</h2>
        
        <div style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          textAlign: "left"
        }}>
          <label 
            htmlFor="prompt" 
            style={{ 
              display: "block", 
              marginBottom: "10px",
              color: "#666",
              fontWeight: "500"
            }}
          >
            Enter your prompt for Gemini Analysis:
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Extract key skills and experience from this resume..."
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              marginBottom: "10px",
              fontSize: "14px",
              resize: "vertical"
            }}
          />
        </div>

        <DropzoneButton onUploadComplete={handleFileUploadComplete} />
      </div>

      {showAnalysis && uploadedFile && (
        <GeminiAnalysis
          file={uploadedFile}
          initialPrompt={prompt}
          onClose={() => setShowAnalysis(false)}
        />
      )}
    </div>
  );
}
