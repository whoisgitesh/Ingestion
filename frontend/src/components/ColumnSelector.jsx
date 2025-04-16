export default function ColumnSelector({
  columns,
  selectedColumns,
  setSelectedColumns,
}) {
  function toggleColumn(col) {
    if (selectedColumns.includes(col)) {
      setSelectedColumns(selectedColumns.filter((c) => c !== col));
    } else {
      setSelectedColumns([...selectedColumns, col]);
    }
  }

  return (
    <div>
      <h4>Select Columns</h4>
      {columns.map((col) => (
        <label key={col} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selectedColumns.includes(col)}
            onChange={() => toggleColumn(col)}
          />
          {col}
        </label>
      ))}
    </div>
  );
}
