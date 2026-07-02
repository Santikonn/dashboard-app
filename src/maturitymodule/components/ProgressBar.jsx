export default function ProgressBar({ progress }) {

  let color = "#ef4444"; // rojo
  if (progress >= 70) color = "#22c55e"; // verde
  else if (progress >= 40) color = "#facc15"; // amarillo

  return (
    <div className="w-24 h-2 bg-gray-300 rounded-full overflow-hidden">
      <div
        className="h-full transition-all duration-500"
        style={{
          width: `${progress}%`,
          backgroundColor: color
        }}
      />
    </div>
  );
}