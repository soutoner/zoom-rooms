import { useState } from 'react';
import './Room.scss';

export interface Props {
  name: string;
  busy?: boolean;
}

export function Room(props: Props) {
  const [busy, setBusy] = useState(props.busy ?? false);

  function className() {
    const suffix = busy ? 'busy' : 'free';
    return `Room__status--${suffix}`;
  }

  return (
    //TODO: set unique as data-testid ID
    <div className="Room" data-testid={'Room'}>
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
