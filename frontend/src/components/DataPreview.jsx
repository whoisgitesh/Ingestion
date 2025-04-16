export default function DataPreview({ data }) {
  if (!data || data.length === 0) return <div>No preview data available.</div>;

  const columns = Object.keys(data[0]);

  return (
    <div style={{ overflowX: "auto", maxHeight: 300, marginTop: 10 }}>
      <table
        border="1"
        cellPadding="5"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
