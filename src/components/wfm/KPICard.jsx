const KPICard = ({ title, value, variant = "default" }) => {
  const styles = {
    default: "bg-white border-slate-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    danger: "bg-red-50 border-red-200",
  };

  return (
    <div className={`rounded-2xl border p-2 shadow-sm ${styles[variant]}`}>
      <p className="text-xs text-slate-500 ml-3">{title}</p>
      <p className="text-2xl font-semibold text-slate-800 mt-2 ml-3">
        {value}
      </p>
    </div>
  );
};

export default KPICard;