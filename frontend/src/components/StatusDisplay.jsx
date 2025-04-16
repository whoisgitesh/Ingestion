export default function StatusDisplay({ status }) {
  const colorMap = {
    Connecting: "blue",
    Fetching: "orange",
    Ingesting: "purple",
    Completed: "green",
    Error: "red",
  };
  return (
    <div style={{ color: colorMap[status] || "black", marginTop: 10 }}>
      <strong>Status:</strong> {status}
    </div>
  );
}
