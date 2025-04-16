import React, { useState } from "react";

export default function JoinConditionInput({
  joinConditions,
  setJoinConditions,
}) {
  const [localInput, setLocalInput] = useState("");

  function addCondition() {
    if (localInput.trim()) {
      setJoinConditions([...joinConditions, localInput.trim()]);
      setLocalInput("");
    }
  }

  return (
    <div>
      <h4>Join Conditions (e.g., table1.id = table2.id)</h4>
      <input
        type="text"
        value={localInput}
        onChange={(e) => setLocalInput(e.target.value)}
        placeholder="Enter join condition"
      />
      <button onClick={addCondition}>Add</button>
      <ul>
        {joinConditions.map((cond, idx) => (
          <li key={idx}>{cond}</li>
        ))}
      </ul>
    </div>
  );
}
