import { useState } from "react";
import "./Room.scss";

interface Props {
  name: string;
}

export function Room(props: Props) {
  const [busy, setBusy] = useState(false);

  function className() {
    const suffix = busy ? "busy" : "free";
    return `Room__status--${suffix}`;
  }

  return (
    <div className="Room">
      <h3>{props.name}</h3>
      <div
        className={className()}
        onClick={() => setBusy((busyState) => (busyState = !busyState))}
      >
        Status
      </div>
    </div>
  );
}
