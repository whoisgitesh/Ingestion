import React from "react";

export default function FileUpload({ onFileChange }) {
  function handleFile(e) {
    if (e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
    }
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <input type="file" accept=".csv,.txt" onChange={handleFile} />
    </div>
  );
}
