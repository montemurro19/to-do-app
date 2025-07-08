interface TimerDisplayProps {
  time: number;
  minimized?: boolean;
}

export default function TimerDisplay({
  time,
  minimized = false,
}: TimerDisplayProps) {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");

  const textSizeClass = minimized ? "text-xl sm:text-2xl" : "text-4xl sm:text-5xl lg:text-6xl";
  const fixedHeightClass = minimized ? "h-8 sm:h-10" : "h-20 sm:h-24";

  return (
    <div
      className={`font-mono text-center ${textSizeClass} ${fixedHeightClass} flex items-center justify-center`}
      style={{ color: 'var(--text-primary)' }}
    >
      {minutes}:{seconds}
    </div>
  );
}
