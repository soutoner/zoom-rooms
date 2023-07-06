import { useContext, useEffect, useState } from 'react';
import { ChannelContext } from 'src/contexts/channel/ChannelProvider';
import 'src/components/room/Room.scss';

export interface Props {
  id: number;
  name: string;
  busy?: boolean;
}

export function Room(props: Props) {
  const [busy, setBusy] = useState(props.busy ?? false);
  const channel = useContext(ChannelContext);

  useEffect(() => {
    channel?.on('is_free', (response) => {
      if (response.index === props.id) {
        console.log("It's free!!!");
        toggleState();
      }
    });

    channel?.on('is_busy', (response) => {
      if (response.index === props.id) {
        toggleState();
      }
    });
  }, []);

  function toggleState() {
    setBusy((busyState) => (busyState = !busyState));
  }

  function onClick() {
    if (busy) {
      channel?.push('set_free', { index: props.id });
    } else {
      channel?.push('set_busy', { index: props.id });
    }
  }

  function className() {
    const suffix = busy ? 'busy' : 'free';
    return `Room__status--${suffix}`;
  }

  return (
    //TODO: set unique as data-testid ID
    <div className="Room" data-testid={'Room'}>
      <h3>{props.name}</h3>
      <div className={className()} onClick={onClick}>
        Status
      </div>
    </div>
  );
}
