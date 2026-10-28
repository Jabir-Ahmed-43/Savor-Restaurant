// components/admin/OrderColumn.jsx
export default function OrderColumn({
  title,
  count,
  color,
  dotColor,
  badgeColor,
  children,
}) {
  return (
    <div
      className={`rounded-xl border border-zinc-200 p-4 ${color} flex flex-col h-[calc(100vh-140px)]`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-zinc-900 flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></span>
          {title}
        </h2>
        <span
          className={`${badgeColor} bg-white px-2.5 py-0.5 rounded-full text-xs font-bold border border-zinc-200`}
        >
          {count}
        </span>
      </div>
      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
        {children}
        {count === 0 && (
          <p className="text-zinc-400 text-sm text-center mt-10">
            No orders in this stage
          </p>
        )}
      </div>
    </div>
  );
}
