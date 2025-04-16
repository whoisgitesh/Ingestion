export default function SourceTargetSelector({
  source,
  setSource,
  target,
  setTarget,
}) {
  return (
    <div>
      <h3>Select Source and Target</h3>
      <label>
        Source:
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">--Select Source--</option>
          <option value="clickhouse">ClickHouse</option>
          <option value="flatfile">Flat File</option>
        </select>
      </label>
      <label style={{ marginLeft: 20 }}>
        Target:
        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          <option value="">--Select Target--</option>
          <option value="clickhouse">ClickHouse</option>
          <option value="flatfile">Flat File</option>
        </select>
      </label>
    </div>
  );
}
