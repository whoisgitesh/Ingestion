import React from "react";

export default function ConnectionForm({ config, setConfig, sourceOrTarget }) {
  // sourceOrTarget: "source" or "target", used to customize labels/placeholders

  function handleChange(e) {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  }

  if (config.type === "clickhouse") {
    return (
      <div>
        <h4>{sourceOrTarget} ClickHouse Connection</h4>
        <input
          name="host"
          placeholder="Host"
          value={config.host || ""}
          onChange={handleChange}
        />
        <input
          name="port"
          placeholder="Port"
          type="number"
          value={config.port || ""}
          onChange={handleChange}
        />
        <input
          name="user"
          placeholder="User"
          value={config.user || ""}
          onChange={handleChange}
        />
        <input
          name="jwt_token"
          placeholder="JWT Token"
          value={config.jwt_token || ""}
          onChange={handleChange}
        />
        <input
          name="database"
          placeholder="Database"
          value={config.database || ""}
          onChange={handleChange}
        />
      </div>
    );
  } else if (config.type === "flatfile") {
    return (
      <div>
        <h4>{sourceOrTarget} Flat File Details</h4>
        <input
          name="fileName"
          placeholder="File Name"
          value={config.fileName || ""}
          onChange={handleChange}
        />
        <input
          name="delimiter"
          placeholder="Delimiter"
          value={config.delimiter || ","}
          onChange={handleChange}
        />
      </div>
    );
  } else {
    return null;
  }
}
