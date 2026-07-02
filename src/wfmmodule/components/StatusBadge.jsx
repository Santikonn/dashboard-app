const StatusBadge = ({ status, isLeader = false }) => {
  const map = {
    CRITICAL: "bg-red-100 text-red-700 border border-red-200",
    WARNING: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    HEALTHY: "bg-green-100 text-green-700 border border-green-200",
  };

  return (
    <span
      className={`
        inline-flex 
        items-center 
        justify-center
        font-medium
        whitespace-nowrap
        transition

        ${
          isLeader
            ? "px-2.5 py-1 text-[10px] sm:text-xs rounded-lg"
            : "px-2 py-0.5 text-[9px] sm:text-[10px] rounded-md"
        }

        ${map[status] || "bg-slate-100 text-slate-600 border border-slate-200"}
      `}
    >
      {status || "UNKNOWN"}
    </span>
  );
};

export default StatusBadge;