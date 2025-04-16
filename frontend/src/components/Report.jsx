import React from "react";

export default function Report({ message }) {
  return (
    <div
      style={{
        marginTop: 20,
        padding: 10,
        border: "1px solid green",
        color: "green",
      }}
    >
      <strong>{message}</strong>
    </div>
  );
}
