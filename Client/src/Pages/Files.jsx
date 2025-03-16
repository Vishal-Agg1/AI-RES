import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import FileCard from "../Components/card";

export default function Files() {
  const [files, setFiles] = useState([]); // Initialize with an empty array
  const user_id = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user_id) return; // Avoid API call if user_id is undefined

    axios.post("http://localhost:8000/v1/fetch", { id: user_id })
      .then((response) => {
        if (response.data.success) {
          setFiles(response.data.files);
          console.log(response);
        } else {
          alert("Unable to fetch files");
        }
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
        alert("Failed to fetch files");
      });
  }, [user_id]); // Re-run when `user_id` changes

  if (!files.length) return <p>No files available</p>; // Prevent rendering an empty map

  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      {files.map((file, index) => (
        <FileCard 
          key={index} 
          fileName={file.name} 
          fileType={file._id} 
          downloadLink={file.fileurl} 
        />
      ))}
    </div>
  );
}
