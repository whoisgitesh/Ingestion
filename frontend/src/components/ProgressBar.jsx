export default function ProgressBar({ progress }) {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#eee",
        height: 20,
        borderRadius: 5,
        marginTop: 10,
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "#4caf50",
          borderRadius: 5,
          transition: "width 0.3s ease-in-out",
        }}
      />
    </div>
  );
}
