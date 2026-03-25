
const StatusBadge = ({ status, isLeader = false }) => {
  const map = {
    CRITICAL: "bg-red-100 text-red-600",
    WARNING: "bg-yellow-100 text-yellow-600",
    HEALTHY: "bg-green-100 text-green-600",
  };

  return (
    <span
      className={`
        ${isLeader ? "px-2 py-1 text-xs rounded" : "px-1.5 py-0.5 text-[9px] rounded"}
        ${map[status]}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;