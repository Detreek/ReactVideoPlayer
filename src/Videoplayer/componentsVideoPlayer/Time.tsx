import { useMemo } from "react";
export default function Time(props: { sec: number; duration: number }) {
  if (props.sec === 0 || isNaN(props.sec))
    return <span>{`${"0:00"}/${props.duration}`}</span>;

  const hours = Math.floor(props.sec / 3600);
  const minutes = Math.floor((props.sec % 3600) / 60);
  const secs = Math.floor(props.sec % 60);

  useMemo(() => {
    math;
  }, [props.duration]);
  const math = () => {
    const duration_hours = Math.floor(props.duration / 3600);
    const duration_minutes = Math.floor((props.duration % 3600) / 60);
    const duration_secs = Math.floor(props.duration % 60);
    return [duration_hours, duration_minutes, duration_secs];
  };

  if (hours > 0) {
    return (
      <span>{`${hours}:${minutes}:${secs} / ${math()[0]}:${math()[1]}:${math()[2]}`}</span>
    );
  }
  return <span>{`${minutes}:${secs} / ${math()[1]}:${math()[2]}`}</span>;
}
