import axios from "axios";
import React, { useState } from "react";

const FileCard = ({ fileName, fileType, downloadLink }) => {
  const [showShareForm, setShowShareForm] = useState(false);
  const [reciever, setreciever] = useState("");
  const handleShare = () => {
    setShowShareForm(true);
  };

  const handleClose = () => {
    axios.post("http://localhost:8000/v1/share", { reciever: reciever, file_id: fileType })
      .then((response) => {
        if (response.data.success) {
          alert("Shared successfully");
        } else {
          alert("Share failed");
        }
      })
      .catch((error) => {
        console.error("Error sharing file:", error);
        alert("Share failed");
      });
    setShowShareForm(false);
  };

  return (
    <div style={{
      backgroundColor: "#fff",
      borderRadius: "12px",
      width: "280px",
      padding: "16px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
      border: "1px solid #e0e0e0",
      position: "relative",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
      }
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "12px"
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          backgroundColor: "#E8F0FE",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "12px"
        }}>
          <span style={{ fontSize: "20px" }}>📄</span>
        </div>
        <h3 style={{
          margin: 0,
          fontSize: "16px",
          fontWeight: "500",
          color: "#1a73e8",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>{fileName}</h3>
      </div>

      <div style={{
        display: "flex",
        gap: "8px",
        justifyContent: "flex-end"
      }}>
        <button
          onClick={() => window.location.href = downloadLink}
          style={{
            backgroundColor: "#F8F9FA",
            color: "#1a73e8",
            padding: "8px 16px",
            border: "1px solid #1a73e8",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "#E8F0FE"
            }
          }}
        >
          Download
        </button>
        <button
          onClick={handleShare}
          style={{
            backgroundColor: "#1a73e8",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "#1557b0"
            }
          }}
        >
          Share
        </button>
      </div>

      {showShareForm && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
          zIndex: 1000,
          width: "400px"
        }}>
          <h3 style={{
            margin: "0 0 8px 0",
            color: "#1a73e8",
            fontSize: "20px"
          }}>Share File</h3>
          <p style={{
            margin: "0 0 16px 0",
            color: "#5f6368",
            fontSize: "14px"
          }}>File Name: {fileName}</p>
          <input 
            type="text" 
            placeholder="Enter email to share" 
            style={{ 
              padding: "12px",
              width: "100%",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "14px",
              marginBottom: "16px",
              "&:focus": {
                outline: "none",
                borderColor: "#1a73e8"
              }
            }} 
            onChange={(e) => {
              setreciever(e.target.value);
            }}
          />
          <div style={{ 
            display: "flex", 
            gap: "12px", 
            justifyContent: "flex-end",
            
          }}>
            <button 
              onClick={() => { setShowShareForm(false); }}
              style={{ 
                padding: "10px 20px",
                backgroundColor: "#F8F9FA",
                color: "#5f6368",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "#E8F0FE"
                }
              }}
            >
              Cancel
            </button>
            <button 
              onClick={handleClose}
              style={{ 
                padding: "10px 20px",
                backgroundColor: "#1a73e8",
                color: "white", 
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "#1557b0"
                }
              }}
            >
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileCard;
