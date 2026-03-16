export function Progress({ value = 0, className = "", indicatorClassName = "" }) {
  return (
    <div className={className} style={{ background: "#e5e7eb", borderRadius: 9999, overflow: "hidden" }}>
      <div
        className={indicatorClassName}
        style={{
          width: `${value}%`,
          height: "100%",
          background: "#10b981",
          borderRadius: 9999,
        }}
      />
    </div>
  );
}
