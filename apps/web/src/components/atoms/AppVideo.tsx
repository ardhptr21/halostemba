import clsx from "clsx";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ReactPlayer, { ReactPlayerProps } from "react-player";

interface Props extends Partial<ReactPlayerProps> {
  className?: string;
}

export default function AppVideo({ className, ...props }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const [pausedManual, setPausedManual] = useState(false);
  const [pausedByCode, setPausedByCode] = useState(false);

  const { ref } = useInView({
    threshold: 1,
    onChange(inView) {
      if (!inView && isPlaying) {
        setIsPlaying(false);
        setPausedByCode(true);
      } else if (
        inView &&
        !pausedManual &&
        videoPlayerRef.current &&
        videoPlayerRef.current.getCurrentTime() > 0 &&
        videoPlayerRef.current.getCurrentTime() <
          videoPlayerRef.current.getDuration() &&
        !isPlaying
      ) {
        setIsPlaying(true);
      }
    },
  });

  return (
    <div
      ref={ref}
      className={clsx("overflow-hidden", className)}
      onClick={() => setPausedManual(true)}
    >
      <ReactPlayer
        ref={videoPlayerRef}
        onPlay={() => setIsPlaying(true)}
        onEnded={() => setIsPlaying(false)}
        onPause={() => {
          setIsPlaying(false);
          if (pausedByCode) {
            setPausedManual(false);
            setPausedByCode(false);
          } else {
            setPausedManual(true);
          }
        }}
        playing={isPlaying}
        width="100%"
        height="100%"
        pip={false}
        controls
        playsinline
        {...props}
      />
    </div>
  );
}
