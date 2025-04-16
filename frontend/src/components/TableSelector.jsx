export default function TableSelector({
  tables,
  selectedTables,
  setSelectedTables,
}) {
  function toggleTable(table) {
    if (selectedTables.includes(table)) {
      setSelectedTables(selectedTables.filter((t) => t !== table));
    } else {
      setSelectedTables([...selectedTables, table]);
    }
  }

  return (
    <div>
      <h4>Select Table(s)</h4>
      {tables.map((table) => (
        <label key={table} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selectedTables.includes(table)}
            onChange={() => toggleTable(table)}
          />
          {table}
        </label>
      ))}
    </div>
  );
}
