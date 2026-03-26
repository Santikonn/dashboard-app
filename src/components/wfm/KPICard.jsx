const KPICard = ({ title, value, variant = "default" }) => {
  const styles = {
    default: "bg-white border-slate-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    danger: "bg-red-50 border-red-200",
  };

  const textStyles = {
    default: "text-slate-800",
    success: "text-green-700",
    warning: "text-yellow-700",
    danger: "text-red-700",
  };

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
      <p className="text-[10px] sm:text-xs text-slate-500 mb-1">
        {title}
      </p>

      {/* VALUE */}
      <p
        className={`
          font-semibold 
          ${textStyles[variant]}
          text-sm sm:text-lg md:text-xl lg:text-2xl
        `}
      >
        {value}
      </p>
    </div>
  );
};

export default KPICard;