import axios from "axios";
import React, { useState } from "react";

const FileCard = ({ fileName, fileType, downloadLink }) => {
  const [showShareForm, setShowShareForm] = useState(false);
  const [reciever,setreciever] = useState("");
  const handleShare = () => {
    setShowShareForm(true);
  };

  const handleClose = () => {  // Remove ({ fileType }) - it’s unnecessary
    axios.post("http://localhost:8000/v1/share", { reciever: reciever, file_id: fileType })
      .then((response) => {
        if (response.data.success) {  // Use response.data.success directly
          alert("Shared successfully");
        } else {
          alert("Share failed");
        }
      })
      .catch((error) => {
        console.error("Error sharing file:", error);  // Log the actual error for debugging
        alert("Share failed");
      });
  
    setShowShareForm(false);
  };
  

  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "16px",
      borderRadius: "8px",
      width: "250px",
      boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    }}>
      <h3>{fileName}</h3>
      
      <button
        onClick={() => window.location.href = downloadLink}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "8px 16px",
          margin: "8px",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Download
      </button>
      <button
        onClick={handleShare}
        style={{
          backgroundColor: "#008CBA",
          color: "white",
          padding: "8px 16px",
          margin: "8px",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Share
      </button>

      {showShareForm && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          zIndex: 1000,
        }}>
          <h3>Share File</h3>
          <p>File Name: {fileName}</p>
          <input type="text" placeholder="Enter email to share" style={{ padding: "8px", width: "100%", marginBottom: "8px" }} onChange={(e)=>{
            setreciever(e.target.value);
          }}/>
          <div style={{display:"flex",gap:"10px",flxDirection:"row"}}>
          <button onClick={handleClose} style={{ padding: "8px", backgroundColor: "Green", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" }}>Send</button>
          <button onClick={()=>{setShowShareForm(false)}} style={{ padding: "8px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileCard;
