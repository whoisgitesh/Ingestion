export default function ResultDisplay({ result }) {
  if (!result) return null;
  return (
    <div style={{ marginTop: 10, padding: 10, border: "1px solid #ccc" }}>
      <strong>Result:</strong>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
