import { DropzoneButton } from "../Components/Dropzone/DropzoneButton";

export default function Upload() {
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
          height:"75%"
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Upload Your File</h2>
        <DropzoneButton />
      </div>
    </div>
  );
}
