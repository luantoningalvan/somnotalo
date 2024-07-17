export const formatAudioDuration = (totalSec: number) => {
  const minutes = Math.trunc(totalSec / 60);
  const seconds = String(totalSec % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
};
