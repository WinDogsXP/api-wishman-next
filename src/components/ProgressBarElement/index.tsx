import { green, yellow } from "@mui/material/colors";

export default function ProgressBarElement({
  start,
  stop,
  interval,
  status,
  height,
}: {
  start: any;
  stop: any;
  interval: any;
  status: "Stable" | "Unstable" | "Down" | "Start";
  height: any;
}) {
  function compute_progress() {
    if (stop < start) {
      [stop, start] = [start, stop];
    }
    return (
      Math.round(((stop - start) / (1000 * interval * 100)) * 1000000) / 1000000
    );
  }

  const progress = compute_progress();

  const colors = {
    Stable: "green",
    Unstable: "yellow",
    Down: "red",
    Start: "grey",
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: colors[status],
    borderRadius: 40,
    textAlign: "right",
  };

  return <div style={Childdiv}>{String(progress)}</div>;
}
