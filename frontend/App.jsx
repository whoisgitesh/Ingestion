import React, { useState } from "react";
import SourceSelector from "./components/SourceSelector";
import AuthForm from "./components/AuthForm";
import ColumnSelector from "./components/ColumnSelector";
import FileUpload from "./components/FileUpload";
import Report from "./components/Report";
import apiClient from "./api/apiClient";

export default function App() {
  const [source, setSource] = useState(null); // 'clickhouse' or 'flatfile'
  const [authConfig, setAuthConfig] = useState(null);
  const [columns, setColumns] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([]);
  const [file, setFile] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [delimiter, setDelimiter] = useState(",");

  // Fetch schema from backend based on source and authConfig / file
  async function fetchSchema() {
    setLoading(true);
    try {
      if (source === "clickhouse") {
        const resp = await apiClient.get("/schema/clickhouse", {
          params: authConfig,
        });
        setAvailableColumns(resp.data.columns || []);
      } else if (source === "flatfile" && file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("delimiter", delimiter);
        const resp = await apiClient.get("/schema/flatfile", {
          params: { delimiter },
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        setAvailableColumns(resp.data.columns || []);
      }
    } catch (err) {
      alert("Failed to fetch schema: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Handle ingestion process
  async function handleIngest() {
    setLoading(true);
    try {
      if (source === "clickhouse") {
        const resp = await apiClient.post(
          "/ingest/clickhouse-to-file",
          { ...authConfig, columns },
          { headers: { Authorization: `Bearer ${authConfig.jwt_token}` } }
        );
        setReport(
          `Ingested ${resp.data.records_processed} records from ClickHouse to file.`
        );
      } else if (source === "flatfile" && file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("columns", JSON.stringify(columns));
        const resp = await apiClient.post(
          "/ingest/file-to-clickhouse",
          formData,
          {
            headers: {
              Authorization: `Bearer ${authConfig.jwt_token}`,
              "Content-Type": "multipart/form-data",
            },
            params: authConfig,
          }
        );
        setReport(
          `Ingested ${resp.data.records_processed} records from file to ClickHouse.`
        );
      }
    } catch (err) {
      alert("Ingestion failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>Data Ingestion App</h1>
      <SourceSelector onSourceChange={setSource} />
      {source && (
        <>
          <AuthForm onChange={setAuthConfig} />
          {source === "flatfile" && (
            <>
              <FileUpload onFileChange={setFile} />
              <label>
                Delimiter:
                <input
                  type="text"
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  style={{ width: 50, marginLeft: 5 }}
                />
              </label>
            </>
          )}
          <button onClick={fetchSchema} disabled={loading || !authConfig}>
            Fetch Schema
          </button>
          {availableColumns.length > 0 && (
            <ColumnSelector
              columns={availableColumns}
              selectedColumns={columns}
              onChange={setColumns}
            />
          )}
          <button
            onClick={handleIngest}
            disabled={loading || columns.length === 0}
          >
            Start Ingestion
          </button>
          {loading && <p>Processing...</p>}
          {report && <Report message={report} />}
        </>
      )}
    </div>
  );
}
