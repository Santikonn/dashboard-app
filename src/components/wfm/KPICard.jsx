const KPICard = ({ title, value, delta, variant = "default" }) => {
  const styles = {
    default: "bg-white border-slate-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    orange: "bg-orange-50 border-orange-200",
    danger: "bg-red-50 border-red-200",
  };

  const textStyles = {
    default: "text-slate-800",
    success: "text-green-700",
    warning: "text-yellow-700",
    orange: "text-orange-700",
    danger: "text-red-700",
  };

  const invertedTitles = ["Absent"];

  const isInverted = invertedTitles.includes(title);

  const deltaColor =
    delta === 0
      ? "text-slate-800"
      : isInverted
      ? delta > 0
        ? "text-red-700"
        : "text-green-700"
      : delta > 0
      ? "text-green-700"
      : "text-red-700";

  return (
    <div
      className={`
        rounded-2xl 
        border 
        shadow-sm 
        p-2 sm:p-3
        transition
        hover:shadow-md
        ${styles[variant]}
      `}
    >
      {/* TITLE */}
      <p className={`
        text-[10px] text-center sm:text-xs text-slate-500 mb-1
        ${["Delta Scheduled"].includes(title) ? "font-bold" : ""}
      `}>
        {title}
      </p>

      {/* VALUE */}
      <p
        className={`
          font-semibold
          ${textStyles[variant]}
          text-sm sm:text-lg md:text-xl lg:text-2xl
          flex items-center justify-center gap-2  
        `}
      >
        <span>{value}</span>
        {delta !== undefined && (
          <span className={`
            text-xs sm:text-sm font-medium 
            ${["Productive", "Absent", "Without Schedule"].includes(title) ? deltaColor : "text-slate-800"}
          `}>
            {delta > 0 ? "▲" : delta < 0 ? "▼" : "•"}{Math.abs(delta)}
          </span>
        )}
      </p>
    </div>
  );
};

export default KPICard;