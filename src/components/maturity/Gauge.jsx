export default function Gauge({ label, value, color }) {
  const radius = 35;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = Math.PI * normalizedRadius;
  const strokeDashoffset = circumference * (1 - value / 100);

  return (
    <div className="w-32 flex flex-col items-center text-center shrink-0">
      <svg width="90" height="55" viewBox="0 0 90 55">
        <path
          d={`M 10 45 A ${normalizedRadius} ${normalizedRadius} 0 0 1 80 45`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />

        <path
          d={`M 10 45 A ${normalizedRadius} ${normalizedRadius} 0 0 1 80 45`}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      <div className="text-sm font-medium mt-2">{label} Score</div>
      <div className="text-lg font-semibold">{value.toFixed(2)} %</div>
    </div>
  );
}