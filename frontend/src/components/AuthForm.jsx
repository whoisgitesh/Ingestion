import React, { useState, useEffect } from "react";

export default function AuthForm({ onChange }) {
  const [form, setForm] = useState({
    host: "",
    port: 8443,
    user: "",
    jwt_token: "",
    database: "",
    table: "",
  });

  useEffect(() => {
    onChange(form);
  }, [form, onChange]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Connection Details</h3>
      <input
        name="host"
        placeholder="Host"
        value={form.host}
        onChange={handleChange}
      />
      <input
        name="port"
        type="number"
        placeholder="Port"
        value={form.port}
        onChange={handleChange}
        style={{ marginLeft: 10, width: 80 }}
      />
      <input
        name="user"
        placeholder="User"
        value={form.user}
        onChange={handleChange}
      />
      <input
        name="jwt_token"
        placeholder="JWT Token"
        value={form.jwt_token}
        onChange={handleChange}
        style={{ width: "300px", marginLeft: 10 }}
      />
      <input
        name="database"
        placeholder="Database"
        value={form.database}
        onChange={handleChange}
        style={{ marginLeft: 10 }}
      />
      <input
        name="table"
        placeholder="Table"
        value={form.table}
        onChange={handleChange}
        style={{ marginLeft: 10 }}
      />
    </div>
  );
}
